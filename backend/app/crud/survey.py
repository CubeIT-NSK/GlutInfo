from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.survey import Surveys



class CRUDSurvey(CRUDBase):
    ''''''

survey_crud = CRUDSurvey(Surveys)