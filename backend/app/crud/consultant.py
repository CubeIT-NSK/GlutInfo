from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi_users import BaseUserManager
from fastapi_users.exceptions import (
    UserAlreadyExists,
    InvalidPasswordException
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


from app.crud.base import CRUDBase
from app.models.user import Consultants
from app.schemas.consultant import ConsultantDB
from app.schemas.user import UserRead, UserUpdate


class CRUDConsultant(CRUDBase):
    async def get_consultant_by_userid(
        self,
        user_id,
        session: AsyncSession,
    ) -> ConsultantDB:
        consultant = await session.execute(
            select(Consultants).where(
                Consultants.user_id == user_id
            )
        )
        consultant = consultant.scalars().first()
        return consultant

    async def update(
        self,
        db_obj,
        user,
        obj_in,
        user_manager: BaseUserManager,
        session: AsyncSession,
    ) -> UserRead:
        obj_data = jsonable_encoder(db_obj)
        update_data = obj_in.dict(exclude_unset=True)
        update_user_data = update_data.pop('user', None)

        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])

        if update_user_data:
            try:
                await user_manager.update(
                    user_update=UserUpdate(**update_user_data),
                    user=user
                )
            except UserAlreadyExists:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail='User email already exists'
                )
            except InvalidPasswordException:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail='Bad password validation'
                )

        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj


consultant_crud = CRUDConsultant(Consultants)
