from calendar import day_abbr
from datetime import date, timedelta

from sqlalchemy import insert, select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.record import Schedule
from app.core.constants import AVAILABLE_DAYS_RANGE_TO_RECORD


class ScheduleCRUD(CRUDBase):
    async def create_multi(
            self,
            objs_in,
            consultant_id: int,
            session: AsyncSession,
    ):
        objs_in_data = []
        for obj_in in objs_in:
            obj_in_data = obj_in.model_dump()
            obj_in_data['consultant_id'] = consultant_id
            objs_in_data.append(obj_in_data)
        db_objs = await session.scalars(
            insert(self.model).returning(self.model),
            objs_in_data,
        )
        await session.commit()
        db_objs = db_objs.unique().all()
        return db_objs

    async def get_working_days_for_consultant(
            self,
            consultant_id: int,
            session: AsyncSession,
    ):
        availibale_dates = [date.today() + timedelta(days=day)
                            for day in range(AVAILABLE_DAYS_RANGE_TO_RECORD)]
        days_off = await session.execute(
            select(Schedule).where(
                and_(
                    Schedule.consultant_id == consultant_id,
                    Schedule.working == False # noqa
                )
            )
        )
        days_off = days_off.scalars().unique().all()
        days_off = [x.day_week for x in days_off]
        for av_date in availibale_dates.copy():
            if list(day_abbr)[av_date.weekday()] in days_off:
                availibale_dates.remove(av_date)
        return availibale_dates

    async def get_by_date(
            self,
            consultant_id: int,
            date_in: date,
            session: AsyncSession,
    ):
        day = list(day_abbr)[date_in.weekday()]
        schedule = await session.execute(
            select(Schedule).where(
                and_(
                    Schedule.consultant_id == consultant_id,
                    Schedule.day_week == day
                )
            )
        )
        schedule = schedule.scalars().unique().first()
        return schedule


schedule_crud = ScheduleCRUD(Schedule)
