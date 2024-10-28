from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.admin.events import (
    EventRead,
)
from app.crud.events import events_crud

router = APIRouter()


@router.get(
    '/',
    # response_model=EventRead,
    summary="Получение всех событий",
    description='Выводит всю информацию о событиях'
)
async def get_all_events(
    session: AsyncSession = Depends(get_async_session)
):
    return await events_crud.get_test(session)
