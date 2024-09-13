from typing import Optional
from datetime import date

from fastapi_users import schemas
from app.models.user import Sex


class UserRead(schemas.BaseUser[int]):
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    born_date: Optional[date]
    sex: Optional[Sex]


class UserCreate(schemas.BaseUserCreate):
    name: Optional[str] = None
    surname: Optional[str] = None
    patronymic: Optional[str] = None
    born_date: Optional[date] = None
    sex: Optional[Sex] = None


class UserUpdate(schemas.BaseUserUpdate):
    name: Optional[str] = None
    surname: Optional[str] = None
    patronymic: Optional[str] = None
    born_date: Optional[date] = None
    sex: Optional[Sex] = None
