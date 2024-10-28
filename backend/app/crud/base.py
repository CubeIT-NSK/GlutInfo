import imghdr
from typing import Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User
from app.services.s3storage import s3_client
from app.services.base64 import file_encodebase64


class CRUDBase:

    def __init__(self, model):
        self.model = model

    async def get(
            self,
            obj_id: int,
            session: AsyncSession,
    ):
        db_obj = await session.execute(
            select(self.model).where(
                self.model.id == obj_id
            )
        )
        return db_obj.scalars().first()

    async def get_multi(
            self,
            session: AsyncSession
    ):
        db_objs = await session.execute(select(self.model))
        return db_objs.scalars().all()

    async def create(
            self,
            obj_in,
            session: AsyncSession,
            user: Optional[User] = None
    ):
        obj_in_data = obj_in.dict()
        if user is not None:
            obj_in_data['user_id'] = user.id
        db_obj = self.model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def update(
            self,
            db_obj,
            obj_in,
            session: AsyncSession,
    ):
        obj_data = jsonable_encoder(db_obj)
        update_data = obj_in.dict(exclude_unset=True)

        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def remove(
            self,
            db_obj,
            session: AsyncSession,
    ):
        await session.delete(db_obj)
        await session.commit()
        return db_obj

    async def save_to_s3(
        self,
        file_bytes,
        filepath,
    ):
        await s3_client.upload_file(file_bytes, filepath)
        print('file uploaded to s3')
    async def get_imagebase64_from_image_path(
        self,
        db_obj,
    ):
        if db_obj:
            file_bytes = await s3_client.get_file(db_obj.image)
            file_base64 = await file_encodebase64(file_bytes)
            return file_base64
        return None
    def create_filepath(
        self,
        user,
        filename,
        file_bytes,
        file_extencion: str = None
    ):
        if not file_extencion:
            file_extencion = imghdr.what(filename, file_bytes)
        return f'users/{user.id}/{filename}.{file_extencion}'