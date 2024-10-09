from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

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
        project = await session.execute(
            select(Projects).where(
                Projects.id == project_id
            )
        )
        project = project.scalars().first()
        return project


project_crud = CRUDProjects(Projects)