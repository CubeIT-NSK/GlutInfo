import math
from datetime import date, timedelta, datetime

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.record import Records
from app.crud.consultant import consultant_crud
from app.crud.schedule import schedule_crud
from app.core.constants import AVAILABLE_TIME_SLOTS_TO_RECORD
from app.models.user import User


class RecordsCRUD(CRUDBase):
    async def create(
        self,
        obj_in,
        session: AsyncSession,
        user: User
    ):
        obj_in_data = obj_in.model_dump()
        obj_in_data['patient_id'] = user.patient.id
        db_obj = self.model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def get_records_by_consultant_id(
        self,
        consultant_id: int,
        session: AsyncSession,
    ):
        consultant = await consultant_crud.get(obj_id=consultant_id,
                                               session=session)
        return consultant.records

    async def get_free_slots_on_date(
        self,
        date_to_record: date,
        consultant_id: int,
        service_duration: timedelta,
        session: AsyncSession,
    ):
        schedule = await schedule_crud.get_by_date(
            consultant_id=consultant_id,
            date_in=date_to_record,
            session=session
        )
        td_start = timedelta(hours=schedule.start_hour.hour,
                             minutes=schedule.start_hour.minute)
        td_end = timedelta(hours=schedule.end_hour.hour,
                           minutes=schedule.end_hour.minute)
        working_time = td_end - td_start

        result_slots = []
        for period in range(working_time.seconds
                            // (AVAILABLE_TIME_SLOTS_TO_RECORD*60)):
            slot = (td_start
                    + timedelta(minutes=AVAILABLE_TIME_SLOTS_TO_RECORD*period))
            slot = (datetime.min + slot).time()
            result_slots.append(slot)

        marked_slots = [[slot, False] for slot in result_slots]

        records = await session.execute(
            select(Records).where(
                and_(
                    Records.rec_date == date_to_record,
                    Records.consultant_id == consultant_id # noqa
                )
            )
        )
        records = records.scalars().unique().all()

        for rec in records:
            start = rec.rec_time
            end = datetime.combine(date.min, start) + rec.service.duration
            del_start, del_end = 0, 0

            for idx, slot in enumerate(result_slots):
                if idx != (len(result_slots)-1):
                    if result_slots[idx] < start <= result_slots[idx+1]:
                        del_start = idx + 1
                    if result_slots[idx] <= end.time() < result_slots[idx+1]:
                        del_end = idx

            for slot in marked_slots[del_start:del_end+1]:
                slot[1] = True

        skip_slots = math.floor(
            service_duration.seconds/(AVAILABLE_TIME_SLOTS_TO_RECORD*60)
        )
        for idx, slot in enumerate(marked_slots):
            if not slot[1]:
                for i in range(1, skip_slots+1):
                    if ((idx+i <= len(marked_slots)-1)
                       and marked_slots[idx+i][1]):
                        slot[1] = True

        return [slot[0] for slot in marked_slots if not slot[1]]


records_crud = RecordsCRUD(Records)
