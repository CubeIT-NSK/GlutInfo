from fastapi import APIRouter, Depends, BackgroundTasks
from fastapi.responses import JSONResponse
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
    MailPatient,
)
from app.models.user import User
from app.crud.patient import patient_crud
from app.api.validators import (
    check_patient_duplicate,
    current_user_patient
)
from app.services.fastMail import EmailSchema, send_email_task


router = APIRouter()


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
async def update_consultant(
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


# Testing mail sending (temp method)
@router.post(
    '/send_me_message',
    dependencies=[Depends(current_user_patient)],
)
async def send_message_tomyself(
    body: MailPatient,
    background_tasks: BackgroundTasks,
    user: User = Depends(current_user),
):
    current_email = user.email

    background_tasks.add_task(
        send_email_task,
        EmailSchema(
            email=current_email,
            subject='От Глютен.ИНФО',
            body=body.model_dump()
        )
    )
    return JSONResponse(status_code=200,
                        content={"email": "Email has been sent."})
