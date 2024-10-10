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
from app.models.user import User
from app.crud.patient import patient_crud
from app.api.validators import (
    check_patient_duplicate,
    current_user_patient
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
    print(image)
    current_patient.image = image
    return current_patient


# test_video
@router.get("/videotemplate")
async def read_root(request: Request):
    return templates.TemplateResponse("testvideo.html",
                                      context={"request": request})
