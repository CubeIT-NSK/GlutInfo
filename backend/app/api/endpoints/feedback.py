from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.admin.feedback import (
    PhotoGalleryRead,
    PlacesRead,
    ReviewDB,
    HistorieDB,
    CooperationsRead
)
from app.crud.feedback import (
    photo_gallery_crud,
    places_crud,
    reviews_crud,
    histories_crud
)


router = APIRouter()


@router.get(
    '/places',
    response_model=list[PlacesRead],
    summary="Получение всех мест для 'Безглютеновая диета'",
    description='Выводит всю информацию о месте'
)
async def get_all_places(
    session: AsyncSession = Depends(get_async_session)
):
    return await places_crud.get_multi(session)


@router.get(
    '/reviews',
    response_model=list[ReviewDB],
    summary='Получение всех отзывов',
    description='Выводятся все отзывы'
)
async def get_all_reviews(
    session: AsyncSession = Depends(get_async_session)
):
    return await reviews_crud.get_multi(session)


@router.get(
    '/photogallery',
    response_model=list[PhotoGalleryRead],
    summary='Получение всех фото для галереии',
    description=''
)
async def get_all_photogallery(
    session: AsyncSession = Depends(get_async_session)
):
    return await photo_gallery_crud.get_multi(session)


@router.get(
    '/histories',
    response_model=list[HistorieDB],
    summary='Получение всех историй пациентов.',
    description=''
)
async def get_user_histories(
        session: AsyncSession = Depends(get_async_session)
):
    '''
    Get user's histories
    '''
    return await histories_crud.get_multi(session)


@router.get(
    '/cooperations',
    response_model=list[CooperationsRead],
    summary='',
    description=''
)
async def get_user_histories(
        session: AsyncSession = Depends(get_async_session)
):
    return await histories_crud.get_multi(session)
