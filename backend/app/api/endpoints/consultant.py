from fastapi import APIRouter, Depends
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
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    await check_consultant_duplicate(user)
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
