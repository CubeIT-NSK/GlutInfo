from typing import Optional
from datetime import date

from pydantic import ConfigDict, Field
from fastapi_users import schemas
from app.models.user import Sex, Role
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
    MAX_PATRONYMIC_CHAR,
    MAX_PHONE_NUMBER_DIGITS,
)


class UserRead(schemas.BaseUser[int]):
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    born_date: Optional[date]
    sex: Optional[Sex]
    phone: str
    role: Role


class UserCreate(schemas.BaseUserCreate):
    name: Optional[str] = Field(
        None,
        max_length=MAX_NAME_CHAR
    )
    surname: Optional[str] = Field(
        None,
        max_length=MAX_SURNAME_CHAR
    )
    patronymic: Optional[str] = Field(
        None,
        max_length=MAX_PATRONYMIC_CHAR
    )
    born_date: Optional[date] = None
    sex: Optional[Sex] = None
    phone: str = Field(
        ...,
        max_length=MAX_PHONE_NUMBER_DIGITS
    )
    role: Role

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'email': 'subbotin@mail.ru',
                    'password': 'badpassword',
                    'name': 'Василий',
                    'surname': 'Субботин',
                    'patronymic': 'Иванович',
                    'born_date': '1980-04-27',
                    'sex': 'male',
                    'phone': '+79991234554',
                    'role': 'consultant',
                }
            ]
        }
    )


class UserUpdate(schemas.BaseUserUpdate):
    name: Optional[str] = None
    surname: Optional[str] = None
    patronymic: Optional[str] = None
    born_date: Optional[date] = None
    phone: Optional[str] = None
    sex: Optional[Sex] = None
    # role: Optional[Role]
