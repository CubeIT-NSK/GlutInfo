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
from app.models.user import Patients, User
from app.models.record import Records
from app.schemas.patient import PatientDB
from app.schemas.user import UserRead, UserUpdate
from app.schemas.record import RecordDB
from app.services.base64 import filebase64_decode


class CRUDPatient(CRUDBase):
    async def get_patient_by_userid(
        self,
        user_id,
        session: AsyncSession,
    ) -> PatientDB:
        patient = await session.execute(
            select(Patients).where(
                Patients.user_id == user_id
            )
        )
        patient = patient.scalars().first()
        return patient

    async def get_all_records(
        self,
        patient_id,
        session: AsyncSession,
    ) -> list[RecordDB]:
        records = await session.execute(
            select(Records).where(
                Records.patient_id == patient_id
            )
        )
        records = records.scalars().unique().all()
        return records

    async def create(
        self,
        obj_in,
        session: AsyncSession,
        user: Optional[User] = None
    ):
        obj_in_data = obj_in.dict()
        if user is not None:
            obj_in_data['user_id'] = user.id
        image = obj_in_data.get('image', None)
        if image:
            file_bytes = await filebase64_decode(obj_in_data['image'])
            user_avatar_s3path = self.create_filepath(
                user,
                'user_avatar',
                file_bytes
            )
            await self.save_to_s3(file_bytes, user_avatar_s3path)
            obj_in_data['image'] = user_avatar_s3path
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
                if field == 'image':
                    file_bytes = await filebase64_decode(update_data['image'])
                    user_avatar_s3path = self.create_filepath(
                        user,
                        'user_avatar',
                        file_bytes
                    )
                    await self.save_to_s3(file_bytes, user_avatar_s3path)
                    update_data['image'] = user_avatar_s3path
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


patient_crud = CRUDPatient(Patients)
