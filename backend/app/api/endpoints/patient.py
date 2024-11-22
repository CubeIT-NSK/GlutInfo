from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users import BaseUserManager

from app.core.db import get_async_session
from app.core.user import (
    current_user,
    get_user_manager,
)
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientDB,
)
from app.schemas.record import (
    RecordCreate,
    RecordDB,
)
from app.models.user import User
from app.crud.patient import patient_crud
from app.crud.records import records_crud
from app.api.validators import (
    check_patient_duplicate,
    check_patient_exists_by_user,
    current_user_patient,
    check_consultant_exists,
    check_service_exists,
    check_record_date,
    check_record_time,
)


router = APIRouter()
templates = Jinja2Templates(
    directory="/Users/user/Work/GlutInfo/backend/app/templates/test"
)


@router.post(
    '/',
    dependencies=[Depends(current_user_patient)],
    response_model=PatientDB,
    summary='Создание пациента.',
    description='Пациент будет создан, только если у пользователя, '
                'сделавшего запрос будет роль `patient`.'
)
async def post_new_patient(
    patient: PatientCreate,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    await check_patient_duplicate(user.id, session)
    patient = await patient_crud.create(patient, session, user)
    return patient


@router.get(
    '/me',
    response_model=PatientDB,
    summary='Получение текущего пациента.',
    description='Выводятся вся информация '
                'по пациенту.',
)
async def get_me_patient(
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session)
):
    patient = await check_patient_exists_by_user(
        user=user,
        session=session
    )
    return patient


@router.patch(
    '/me',
    dependencies=[Depends(current_user_patient)],
    response_model=PatientDB,
    summary='Обновление пациента.',
    description='Обновление пользователя, '
                'только если он является пациентом.'
)
async def update_patient(
    obj_in: PatientUpdate,
    user_manager: BaseUserManager = Depends(get_user_manager),
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    current_patient = await patient_crud.get_patient_by_userid(
        user.id,
        session
    )
    updated_patient = await patient_crud.update(
        db_obj=current_patient,
        user=user,
        obj_in=obj_in,
        user_manager=user_manager,
        session=session
    )
    return updated_patient


@router.get(
    '/me',
    dependencies=[Depends(current_user_patient)],
    response_model=PatientDB,
    summary='Получение текущего пациента.',
    description='Получение данных пациента, по текущему токену.'
)
async def get_current_patient(
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    current_patient = await patient_crud.get_patient_by_userid(
        user.id,
        session
    )
    image = await patient_crud.get_imagebase64_from_image_path(current_patient)
    current_patient.image = image
    return current_patient


@router.post(
    '/record',
    dependencies=[Depends(current_user_patient)],
    response_model=RecordDB,
    summary='Создание записи.',
    description='Запись к консультанту по роли `patient`.'
)
async def post_new_record(
    record: RecordCreate,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    consultant = await check_consultant_exists(
        consultant_id=record.consultant_id,
        session=session
    )
    service = await check_service_exists(
        service_id=record.service_id,
        session=session
    )
    await check_record_date(
        consultant_id=consultant.id,
        date_to_record=record.rec_date,
        session=session
    )
    await check_record_time(
        date_to_record=record.rec_date,
        consultant_id=consultant.id,
        service=service,
        time_to_record=record.rec_time,
        session=session
    )
    record = await records_crud.create(
        obj_in=record,
        session=session,
        user=user
    )
    return record


@router.get(
    '/me/records',
    dependencies=[Depends(current_user_patient)],
    response_model=list[RecordDB],
    summary='Все записи текущего пациента.',
    description='Получить абсолютно все записи пациента.'
)
async def get_all_patient_records(
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session)
):
    records = await patient_crud.get_all_records(
        patient_id=user.patient.id,
        session=session
    )
    return records


# test_video
@router.get("/videotemplate")
async def read_root(request: Request):
    return templates.TemplateResponse("testvideo.html",
                                      context={"request": request})
