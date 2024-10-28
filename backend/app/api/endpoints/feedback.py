from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.admin.feedback import (
    PhotoGalleryRead,
    PlacesRead,
    # ReviewDB,
    HistorieDB,
    CooperationsRead,
    NewslettersCreate,
    QuestionnaireCreate
)
from app.crud.feedback import (
    photo_gallery_crud,
    places_crud,
    reviews_crud,
    histories_crud,
    cooperations_crud,
    newsletters_crud,
    questionnaire_crud
)
from app.models.user import User
from app.core.user import (
    current_user
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
    '''
    Get all places
    '''
    return await places_crud.get_multi(session)


@router.get(
    '/places/{places_id}',
    response_model=list[PlacesRead],
    summary="Получение конкретных мест для 'Безглютеновая диета'",
    description='Выводит всю информацию о конкретных местах'
)
async def get_current_places(
    places_id: int,
    session: AsyncSession = Depends(get_async_session)
):
    '''
    Get places of current type
    '''
    return await places_crud.get_current_places(places_id, session)


@router.get(
    '/reviews',
    # response_model=list[ReviewDB],
    summary='Получение всех отзывов',
    description='Выводятся все отзывы'
)
async def get_all_reviews(
    session: AsyncSession = Depends(get_async_session)
):
    '''
    Get all user's reviews
    '''
    return await reviews_crud.get_all_reviews(session)


@router.get(
    '/photogallery',
    response_model=list[PhotoGalleryRead],
    summary='Получение всех фото для галереии',
    description=''
)
async def get_all_photogallery(
    session: AsyncSession = Depends(get_async_session)
):
    '''
    Get all photos from PhotoGallery
    '''
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


@router.post(
    '/cooperations',
    summary='Post new cooperation',
    description='Add a new copperation. Admin can check it in admin zone'
)
async def get_all_cooperations(
        cooperation: CooperationsRead,
        session: AsyncSession = Depends(get_async_session)
):
    '''
    Add new cooperation
    '''
    return await cooperations_crud.add_cooperation(session, cooperation)


@router.post(
    '/newsletters',
    summary='Post new newsletter from user',
    description='Add a new newsletter. Admin can check it in admin zone'
)
async def post_newsletter(
    newsletter: NewslettersCreate,
    session: AsyncSession = Depends(get_async_session)
):
    '''
    Post new newsletter from user
    '''
    return await newsletters_crud.send_newsletter(session, newsletter)


@router.post(
    '/questionnaire',
    summary="Post user's questionnaire",
    description="Add user's questionnaire to DB"
)
async def post_questionnaire(
    questionnaire: QuestionnaireCreate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user)
):
    '''
    Add user's questionnaire to DB
    '''

    return await questionnaire_crud.user_answer_questionnaire(
        session, questionnaire, user
    )
