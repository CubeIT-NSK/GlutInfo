from datetime import date

from fastapi import APIRouter, Depends, BackgroundTasks, status
from fastapi.responses import StreamingResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users import BaseUserManager

from app.core.db import get_async_session
from app.core.user import (
    current_user,
    get_user_manager,
)
from app.schemas.consultant import (
    ConsultantCreate,
    ConsultantUpdate,
    ConsultantDB,
    ConsultantAvailableDates,
    ConsultantAvailableTimeSlots,
)
from app.schemas.schedule import (
    ScheduleCreate,
    ScheduleDB,
)
from app.schemas.service import (
    ServiceCreate,
    ServiceDB,
)
from app.models.user import User
from app.crud.consultant import consultant_crud
from app.crud.schedule import schedule_crud
from app.crud.service import services_crud
from app.crud.records import records_crud
from app.api.validators import (
    check_consultant_duplicate,
    check_consultant_exists,
    check_service_exists,
    check_consultant_schedule_exists,
    check_consultant_own_service,
    current_user_consultant,
    dayweek_consultant_unique_check,
    check_schedule_can_change,
)
from app.services.fastMail import (
    EmailSchema,
    send_email_to_notify_consultant_accept
)
from app.api.utils import append_unselected_days
from app.core.constants import EMAIL_TO_NOTIFY_CONSULTANT_ACCEPT


router = APIRouter()


@router.get(
    '/',
    response_model=list[ConsultantDB],
    summary='Получение всех подтвержденных консультантов',
    description='Выводятся все консультанты вместе с информацией '
                'по пользователю.',
    tags=['Make record', 'Consultants']
)
async def get_all_working_consultants(
    session: AsyncSession = Depends(get_async_session)
):
    consultants = await consultant_crud.get_all_confirmed_consultant(session)
    return consultants


@router.get(
    '/{id}',
    response_model=ConsultantDB,
    summary='Получение подтвержденного консультанта',
    description='Выводятся вся информация '
                'по консультанту.',
)
async def get_working_consultant(
    id: int,
    session: AsyncSession = Depends(get_async_session)
):
    consultant = await check_consultant_exists(
        consultant_id=id,
        session=session
    )
    return consultant


@router.post(
    '/',
    dependencies=[Depends(current_user_consultant)],
    response_model=ConsultantDB,
    summary='Создание консультанта.',
    description='Консультант будет создан, только если у пользователя, '
                'сделавшего запрос будет роль `consultant`.'
)
async def post_new_consultant(
    consultant: ConsultantCreate,
    background_tasks: BackgroundTasks,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    await check_consultant_duplicate(user.id, session)
    background_tasks.add_task(
        send_email_to_notify_consultant_accept,
        EmailSchema(
            email=EMAIL_TO_NOTIFY_CONSULTANT_ACCEPT,
            subject='От Глютен.ИНФО',
            body={
                'name': user.name,
                'surname': user.surname,
                'patronymic': user.patronymic,
                'born_date': user.born_date.strftime("%d/%m/%Y"),
                'email': user.email,
            }
        )
    )
    consultant = await consultant_crud.create(consultant, session, user)
    return consultant


@router.patch(
    '/me',
    dependencies=[Depends(current_user_consultant)],
    response_model=ConsultantDB,
    summary='Обновление консультанта.',
    description='Обновление пользователя, '
                'только если он является консультантом.'
)
async def update_consultant(
    obj_in: ConsultantUpdate,
    user_manager: BaseUserManager = Depends(get_user_manager),
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    current_consultant = await consultant_crud.get_consultant_by_userid(
        user.id,
        session
    )
    updated_consultant = await consultant_crud.update(
        db_obj=current_consultant,
        user=user,
        obj_in=obj_in,
        user_manager=user_manager,
        session=session
    )
    return updated_consultant


@router.post(
    '/me/schedule',
    dependencies=[Depends(current_user_consultant)],
    response_model=list[ScheduleDB],
    summary='Создание расписания консультантом.',
    description='Расписание на каждый день недели.',
    status_code=status.HTTP_201_CREATED,
)
async def post_schedule(
    list_schedule: list[ScheduleCreate],
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    await dayweek_consultant_unique_check(
        user=user,
        list_schedule=list_schedule,
        session=session,
    )
    append_unselected_days(list_schedule)
    schedule = await schedule_crud.create_multi(
        objs_in=list_schedule,
        consultant_id=user.consultant.id,
        session=session,
    )
    return schedule


@router.patch(
    '/me/schedule',
    dependencies=[Depends(current_user_consultant)],
    response_model=list[ScheduleDB],
    summary='Изменение расписания консультанта.',
    status_code=status.HTTP_201_CREATED,
)
async def patch_schedule(
    list_schedule: list[ScheduleCreate],
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    schedule = await check_consultant_schedule_exists(
        user=user
    )
    await check_schedule_can_change(
        user=user,
        future_schedule=list_schedule,
        session=session
    )
    new_schedule = await schedule_crud.update_multi(
        db_objs=schedule,
        objs_in=list_schedule,
        consultant_id=user.consultant.id,
        session=session
    )
    return new_schedule


@router.get(
    '/{id}/services',
    response_model=list[ServiceDB],
    summary='Получение всех услуг консультанта.',
    description='Услуги',
    tags=['Make record']
)
async def get_all_consultant_services(
    id: int,
    session: AsyncSession = Depends(get_async_session)
):
    consultant = await check_consultant_exists(
        consultant_id=id,
        session=session
    )
    services = consultant.services
    return services


@router.post(
    '/me/services',
    dependencies=[Depends(current_user_consultant)],
    response_model=ServiceDB,
    summary='Добавление услуги к консультанту.',
    description='Услуги',
    status_code=status.HTTP_201_CREATED,
)
async def post_service(
    service: ServiceCreate,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session)
):
    service = await services_crud.create(
        obj_in=service,
        consultant_id=user.consultant.id,
        session=session
    )
    return service


@router.get(
    '/{id}/available-dates',
    response_model=ConsultantAvailableDates,
    summary='Получение доступных дат, консультанта.',
    description='Даты для записи',
    tags=['Make record']
)
async def get_consultant_available_dates(
    id: int,
    session: AsyncSession = Depends(get_async_session),
):
    consultant = await check_consultant_exists(
        consultant_id=id,
        session=session
    )
    available_dates = await schedule_crud.get_working_days_for_consultant(
        consultant_id=id,
        session=session
    )
    return {
        'consultant': consultant,
        'dates': available_dates
    }


@router.get(
    '/{id}/available-time',
    response_model=ConsultantAvailableTimeSlots,
    summary='Получение доступных временных слотов, консультанта.',
    description='Время для записи',
    tags=['Make record']
)
async def get_all_consultant_available_time_slots(
    id: int,
    # info_params: Annotated[ConsultantParamsAvailableTimeSlots, Query()],
    service_id: int,
    date_to_record: date,
    session: AsyncSession = Depends(get_async_session),
):
    consultant = await check_consultant_exists(
        consultant_id=id,
        session=session
    )
    service = await check_service_exists(
        service_id=service_id,
        session=session
    )
    await check_consultant_own_service(
        consultant_id=id,
        service=service
    )
    free_slots = await records_crud.get_free_slots_on_date(
        date_to_record=date_to_record,
        consultant_id=id,
        service_duration=service.duration,
        session=session
    )
    return {
        'consultant': consultant,
        'time_slots': free_slots
    }


@router.get(
    '/{id}/video-presentation',
)
async def get_video_presentation(
    id: int,
    session: AsyncSession = Depends(get_async_session),
):
    current_consultant = await consultant_crud.get_consultant_by_userid(
        id,
        session
    )
    file_bytes = await consultant_crud.get_video_presentation_bytes(
        current_consultant
    )
    return Response(file_bytes, media_type='application/octet-stream')
    # def iterfile():
    #     with open('/Users/user/Work/GlutInfo/backend/app/api/endpoints/video.mp4', mode="rb") as file_like:
    #         yield from file_like

    # return StreamingResponse(iterfile(), media_type="video/mp4")
