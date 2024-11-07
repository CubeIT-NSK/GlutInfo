from datetime import datetime, timedelta, date, time

from fastapi import HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.consultant import consultant_crud
from app.crud.patient import patient_crud
from app.crud.schedule import schedule_crud
from app.crud.service import services_crud
from app.crud.records import records_crud
from app.core.user import current_user
from app.models.user import User, Consultants
from app.models.record import Services, Schedule


async def check_consultant_exists(
    consultant_id,
    session: AsyncSession
) -> Consultants:
    consultant = await consultant_crud.get(
        obj_id=consultant_id,
        session=session,
    )
    if consultant is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Consultant dosen`t exist!'
        )
    return consultant


async def check_service_exists(
    service_id,
    session: AsyncSession
) -> Services:
    service = await services_crud.get(
        obj_id=service_id,
        session=session
    )
    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Service dosen`t exist!'
        )
    return service


async def check_consultant_schedule_exists(
    user: User,
) -> list[Schedule]:
    schedule = user.consultant.schedule
    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='This consultant doesen`t have any schedule!'
        )
    return schedule


async def check_consultant_own_service(
    consultant_id: int,
    service: Services,
) -> None:
    if service.consultant_id != consultant_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Consultant dosen`t own this service!'
        )


async def check_consultant_duplicate(
    user_id,
    session: AsyncSession,
) -> None:
    consultant = await consultant_crud.get_consultant_by_userid(
        user_id,
        session,
    )
    if consultant is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Consultant with user_id:{user_id} already exist!'
        )


async def check_patient_duplicate(
    user_id,
    session: AsyncSession,
) -> None:
    patient = await patient_crud.get_patient_by_userid(
        user_id,
        session,
    )
    if patient is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Patient with user_id:{user_id} already exist!'
        )


async def current_user_consultant(
    current_user: User = Depends(current_user)
):
    if current_user.role == 'consultant':
        return current_user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail='You haven`t consultant role'
    )


async def current_user_patient(
    current_user: User = Depends(current_user)
):
    if current_user.role == 'patient':
        return current_user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail='You haven`t patient role'
    )


async def dayweek_consultant_unique_check(
    user: User,
    list_schedule,
    session: AsyncSession,
):
    schedule = user.consultant.schedule
    schedulled_days = [sch.day_week for sch in schedule]

    for day_schedule in list_schedule:
        day = day_schedule.day_week
        if day in schedulled_days:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f'You already have schedule on {day} day!'
            )


async def check_schedule_can_change(
    user: User,
    future_schedule,
    session: AsyncSession
):
    for sch in future_schedule:
        day_records = await records_crud.get_all_records_by_day_week(
            day_week=sch.day_week,
            consultant_id=user.consultant.id,
            session=session
        )
        for record in day_records:
            start_time = record.rec_time
            end_time = (datetime.combine(date.min, start_time)
                        + record.service.duration).time()
            sch_start = sch.start_hour.replace(tzinfo=None)
            sch_end = sch.end_hour.replace(tzinfo=None)

            if (not (sch_start <= start_time < sch_end)
               or not (sch_start <= end_time < sch_end)):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=(f'You can`t change schedule on {sch.day_week} day '
                            f'because you have record on {start_time}')
                )


# old method
async def check_time_booked(
    timeranges: list[tuple],
    time_to_record: datetime,
    service_duration: timedelta
) -> None:
    for starttime, endtime in timeranges:
        starttime = datetime.strptime(starttime, '%H:%M')
        endtime = datetime.strptime(endtime, '%H:%M')

        time_to_record_end = time_to_record + service_duration

        if ((starttime <= time_to_record <= endtime)
           or (starttime <= time_to_record_end <= endtime)):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Consultant have record on this time.'
            )


async def check_record_date(
    consultant_id: int,
    date_to_record: date,
    session: AsyncSession
) -> None:
    availabale_days = await schedule_crud.get_working_days_for_consultant(
        consultant_id=consultant_id,
        session=session
    )
    if date_to_record not in availabale_days:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Date is not available for this consultant'
        )


async def check_record_time(
    date_to_record: date,
    consultant_id: int,
    service: Services,
    time_to_record: time,
    session: AsyncSession
) -> None:
    available_time_slots = await records_crud.get_free_slots_on_date(
        date_to_record=date_to_record,
        consultant_id=consultant_id,
        service_duration=service.duration,
        session=session
    )
    if time_to_record not in available_time_slots:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Time slot is not available for this consultant'
        )
