from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.survey import (
    SurveysRead,
)
from app.crud.survey import survey_crud


router = APIRouter()


@router.get(
    '/',
    response_model=list[SurveysRead],
    summary='Получение названий всех опросов',
    description=''
)
async def get_all_surveys(
    session: AsyncSession = Depends(get_async_session)
):
    return await survey_crud.get_multi(session)
