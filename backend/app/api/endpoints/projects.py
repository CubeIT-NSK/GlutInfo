from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.admin.projects import (
    ProjectsRead,
)
from app.crud.projects import project_crud

router = APIRouter()


@router.get(
    '/{id}',
    # response_model=ProjectsRead,
    summary='Получение информации о проекте по id',
    description=''
)
async def get_all_surveys(
    id: int,
    session: AsyncSession = Depends(get_async_session)
):
    return await project_crud.get_project_by_id(id, session)


@router.get(
    '/',
    # response_model=ProjectsRead,
    summary='Получение информации о всех проектах',
    description=''
)
async def get_all_projects(
    session: AsyncSession = Depends(get_async_session)
):
    return await project_crud.get_all_projects(session)
