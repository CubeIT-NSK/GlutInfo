from fastapi import APIRouter, Depends, BackgroundTasks
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
)
from app.models.user import User
from app.crud.consultant import consultant_crud
from app.api.validators import (
    check_consultant_duplicate,
    current_user_consultant,
)
from app.services.fastMail import (
    EmailSchema,
    send_email_to_notify_consultant_accept
)
from app.core.constants import EMAIL_TO_NOTIFY_CONSULTANT_ACCEPT


router = APIRouter()


@router.get(
    '/',
    response_model=list[ConsultantDB],
    summary='Получение всех консультантов',
    description='Выводятся все консультанты вместе с информацией '
                'по пользователю.'
)
async def get_all_consultants(
    session: AsyncSession = Depends(get_async_session)
):
    return await consultant_crud.get_multi(session)


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
    await check_consultant_duplicate(user)
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