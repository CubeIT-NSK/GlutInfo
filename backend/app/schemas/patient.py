from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import DEFAULT_MIN_CHAR
from app.schemas.user import UserRead, UserUpdate


class PatientCreate(BaseModel):
    address: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Адрес',
    )
    education: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Образование',
    )
    position: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Должность',
    )
    working: bool = Field(
        ...,
        title='Работаю',
    )

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'address': 'г. Санкт-Петербург',
                    'education': 'Среднее',
                    'position': 'Старший слесарь',
                    'working': True,
                }
            ]
        }
    )


class PatientUpdate(BaseModel):
    address: Optional[str] = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Адрес',
    )
    education: Optional[str] = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Образование',
    )
    position: Optional[str] = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Должность',
    )
    working: Optional[bool] = Field(
        ...,
        title='Работаю',
    )
    user: Optional[UserUpdate] = None

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {
                    'address': 'г. Санкт-Петербург',
                    'education': 'Среднее',
                    'position': 'Старший слесарь',
                    'working': True,
                    'user': {
                        'email': 'subbotin@mail.ru',
                        'password': 'badpassword',
                        'name': 'Василий',
                        'surname': 'Субботин',
                        'patronymic': 'Иванович',
                        'born_date': '1980-04-27',
                        'sex': 'male',
                    }
                }
            ]
        }
    )


class PatientDB(PatientCreate):
    id: int
    user: UserRead

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'address': 'г. Санкт-Петербург',
                    'education': 'Среднее',
                    'position': 'Старший слесарь',
                    'working': True,
                    'user': {
                        'id': 2,
                        'email': 'subbotin@mail.ru',
                        'password': 'badpassword',
                        'name': 'Василий',
                        'surname': 'Субботин',
                        'patronymic': 'Иванович',
                        'born_date': '1980-04-27',
                        'sex': 'male',
                        'role': 'consultant',
                    }
                }
            ]
        }
    )
