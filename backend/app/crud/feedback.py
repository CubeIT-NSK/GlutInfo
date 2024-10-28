from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from fastapi.responses import JSONResponse

from app.crud.base import CRUDBase
from app.models.admin.feedback import (
    PhotoGallery,
    Places,
    Reviews,
    Histories,
    Cooperations,
    Newsletters,
    Questionnaire
    )
from app.models.user import User
from app.schemas.admin.feedback import (
    CooperationsRead,
    NewslettersCreate,
    QuestionnaireCreate
)


class CRUDPhotoGallery(CRUDBase):
    '''
    CRUD for PhotoGallery model
    '''


class CRUDPlaces(CRUDBase):
    '''
    CRUD for Places model
    '''
    async def get_current_places(
            self,
            places_id: int,
            session: AsyncSession
    ):
        if places_id == 0:
            db_objs = await session.execute(
                select(Places).where(
                    Places.place_type == 'Ресторан/Кафе'
                )
            )
        elif places_id == 1:
            db_objs = await session.execute(
                select(Places).where(
                    Places.place_type == 'Магазин где представлена Б.П.'
                )
            )
        elif places_id == 2:
            db_objs = await session.execute(
                select(Places).where(
                    Places.place_type == 'Магазин с Б.П.'
                )
            )
        return db_objs.scalars().all()


class CRUDReviews(CRUDBase):
    '''
    CRUD for Newsletters model
    '''
    async def get_all_reviews(
        self,
        session: AsyncSession,
    ):
        db_objs = await session.execute(
            select(Reviews).options(
                selectinload(Reviews.consultants),
                )
            )
        return db_objs.unique().scalars().all()


class CRUDHistories(CRUDBase):
    '''
    CRUD for Newsletters model
    '''


class CRUDCooperations(CRUDBase):
    '''
    CRUD for Newsletters model
    '''
    async def add_cooperation(
        self,
        session: AsyncSession,
        cooperation: CooperationsRead
    ):
        coop = Cooperations(
            name=cooperation.name,
            phone=cooperation.phone,
            email=cooperation.email,
            offer=cooperation.offer
        )
        session.add(coop)
        await session.commit()

        return JSONResponse(
            status_code=200,
            content={"cooperation": "You add new cooperation!"}
        )


class CRUDNewsletters(CRUDBase):
    '''
    CRUD for Newsletters model
    '''
    async def send_newsletter(
        self,
        session: AsyncSession,
        newsletter: NewslettersCreate
    ):
        coop = Newsletters(
            name=newsletter.name,
            email=newsletter.email,
        )
        session.add(coop)
        await session.commit()

        return JSONResponse(
            status_code=200,
            content={"newsletter": "You send newsletter!"}
        )


class CRUDQuestionnaire(CRUDBase):
    '''
    CRUD for Questionnaire model
    '''

    async def user_answer_questionnaire(
        self,
        session: AsyncSession,
        questionnaire: QuestionnaireCreate,
        user: User
    ):
        '''
        User's answer of questionnaire
        '''

        result = Questionnaire(
            user_id=user.id,
            main_problem=questionnaire.main_problem,
            bad_habits=questionnaire.bad_habits,
            allergy=questionnaire.allergy,
            relatives_illnesses=questionnaire.relatives_illnesses,
            chronic_illnes=questionnaire.chronic_illnes,
            user_surgery=questionnaire.user_surgery,
            for_women=questionnaire.for_women,
            medicament=questionnaire.medicament,
            analysis=questionnaire.analysis,
            body_parameters=questionnaire.body_parameters,
        )
        session.add(result)
        await session.commit()

        return JSONResponse(
            status_code=200,
            content={"questionnaire": "You send questionnaire!"}
        )


photo_gallery_crud = CRUDPhotoGallery(PhotoGallery)
places_crud = CRUDPlaces(Places)
reviews_crud = CRUDReviews(Reviews)
histories_crud = CRUDHistories(Histories)
cooperations_crud = CRUDCooperations(Cooperations)
newsletters_crud = CRUDNewsletters(Newsletters)
questionnaire_crud = CRUDQuestionnaire(Questionnaire)
