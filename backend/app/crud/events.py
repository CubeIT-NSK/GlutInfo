from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.crud.base import CRUDBase
from app.models.admin.events import (
    Events,
    )


class CRUDEvents(CRUDBase):
    ''''''
    async def get_all_events(
            self,
            session: AsyncSession
    ):
        db_objs = await session.execute(select(Events).options(
            selectinload(Events.organizator)))
        return db_objs.unique().scalars().all()


events_crud = CRUDEvents(Events)
