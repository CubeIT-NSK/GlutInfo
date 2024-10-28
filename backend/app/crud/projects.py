from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from app.crud.base import CRUDBase
from app.models.admin.projects import (
    Projects
    )
from app.schemas.admin.projects import (
    ProjectsRead
)


class CRUDProjects(CRUDBase):
    async def get_project_by_id(
        self,
        project_id,
        session: AsyncSession,
    ) -> ProjectsRead:
        db_objs = await session.execute(
            select(Projects).where(
                Projects.id == project_id
            ).options(
                selectinload(Projects.organizator),
                selectinload(Projects.document)
            )
        )
        return db_objs.scalars().first()

    async def get_all_projects(
        self,
        session: AsyncSession,
    ):
        db_objs = await session.execute(
            select(Projects).options(
                selectinload(Projects.organizator),
                selectinload(Projects.document)
                )
            )
        return db_objs.unique().scalars().all()


project_crud = CRUDProjects(Projects)
