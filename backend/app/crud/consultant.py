from typing import Optional

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
from app.models.user import Consultants, User
from app.schemas.consultant import ConsultantDB
from app.schemas.user import UserRead, UserUpdate
from app.services.s3storage import s3_client
from app.services.base64 import filebase64_decode


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

    async def create(
            self,
            obj_in,
            session: AsyncSession,
            user: Optional[User] = None
    ):
        obj_in_data = obj_in.dict()
        if user is not None:
            obj_in_data['user_id'] = user.id
        video_presentation = obj_in_data.get('video_presentation', None)
        if video_presentation:
            file_bytes = await filebase64_decode(video_presentation)
            consultant_video_s3path = self.create_filepath(
                user,
                'consultant_video',
                file_bytes=file_bytes,
                file_extencion='mp4'
            )
            await self.save_to_s3(file_bytes, consultant_video_s3path)
            obj_in_data['video_presentation'] = consultant_video_s3path
        obj_in_data['is_send_resume'] = True
        db_obj = self.model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def update(
        self,
        db_obj,
        user,
        obj_in,
        user_manager: BaseUserManager,
        session: AsyncSession,
    ) -> UserRead:
        obj_data = jsonable_encoder(db_obj, exclude={'user'})
        update_data = obj_in.dict(exclude_unset=True)
        update_user_data = update_data.pop('user', None)

        for field in obj_data:
            if field in update_data:
                if field == 'video_presentation':
                    file_bytes = await filebase64_decode(
                        update_data['video_presentation']
                    )
                    consultant_video_s3path = self.create_filepath(
                        user,
                        'consultant_video',
                        file_bytes=file_bytes,
                        file_extencion='mp4'
                    )
                    await self.save_to_s3(file_bytes, consultant_video_s3path)
                    update_data['video_presentation'] = consultant_video_s3path
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
    
    async def get_video_presentation_bytes(
        self,
        db_obj
    ):
        if db_obj.video_presentation:
            file_bytes = await s3_client.get_file(db_obj.video_presentation)
            return file_bytes
        return None


consultant_crud = CRUDConsultant(Consultants)
