from typing import Optional
from datetime import date

from pydantic import ConfigDict
from fastapi_users import schemas
from app.models.user import Sex, Role


class UserRead(schemas.BaseUser[int]):
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    born_date: Optional[date]
    sex: Optional[Sex]
    phone: int
    role: Role


class UserCreate(schemas.BaseUserCreate):
    name: Optional[str] = None
    surname: Optional[str] = None
    patronymic: Optional[str] = None
    born_date: Optional[date] = None
    sex: Optional[Sex] = None
    phone: int
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
                    'phone': '89991234554',
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
    sex: Optional[Sex] = None
    # role: Optional[Role]
