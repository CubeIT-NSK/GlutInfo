from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.record import Services


class ServicesCRUD(CRUDBase):
    async def create(
            self,
            obj_in,
            consultant_id: int,
            session: AsyncSession,
    ):
        obj_in_data = obj_in.model_dump()
        obj_in_data['consultant_id'] = consultant_id
        db_obj = self.model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def get_all_by_consultant_id(
        self,
        consultant_id: int,
        session: AsyncSession,
    ):
        services = await session.execute(
            select(Services).where(
                Services.consultant_id == consultant_id # noqa
            )
        )
        services = services.scalars().unique().all()


services_crud = ServicesCRUD(Services)
