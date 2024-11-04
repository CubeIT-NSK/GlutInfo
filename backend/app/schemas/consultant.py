from typing import Optional
from datetime import date, time

from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import DEFAULT_MIN_CHAR, MIN_EXPERIENCE
from app.schemas.user import UserRead, UserUpdate


class ConsultantCreate(BaseModel):
    speciality: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Специальность',
    )
    experience: int = Field(
        ...,
        ge=MIN_EXPERIENCE,
        title='Стаж',
    )
    grade: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Степень',
    )
    institution: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Учебное заведение',
    )
    current_work: str = Field(
        ...,
        min_length=DEFAULT_MIN_CHAR,
        title='Основное место работы',
    )
    video_presentation: Optional[str] = None

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'speciality': 'Терапевт травматолог',
                    'experience': 5,
                    'grade': 'Старший',
                    'institution': 'НГМУ',
                    'current_work': 'Городская поликлиника №1',
                    'video_presentation': 'base64string',
                }
            ]
        }
    )


class ConsultantUpdate(BaseModel):
    speciality: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR,
        title='Специальность',
    )
    experience: Optional[int] = Field(
        ge=MIN_EXPERIENCE,
        title='Стаж',
    )
    grade: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR,
        title='Степень',
    )
    institution: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR,
        title='Учебное заведение',
    )
    current_work: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR,
        title='Основное место работы',
    )
    video_presentation: Optional[str] = None
    user: UserUpdate

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {
                    'speciality': 'Терапевт травматолог',
                    'experience': 5,
                    'grade': 'Старший',
                    'institution': 'НГМУ',
                    'current_work': 'Городская поликлиника №1',
                    'video_presentation': 'base64string',
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


class ConsultantDB(ConsultantCreate):
    id: int
    video_presentation: Optional[str] = None
    is_accepted: bool
    is_send_resume: bool
    user: UserRead

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'speciality': 'Терапевт травматолог',
                    'experience': 5,
                    'grade': 'Старший',
                    'institution': 'НГМУ',
                    'current_work': 'Городская поликлиника №1',
                    'video_presentation': 'base64string',
                    'is_accepted': False,
                    'is_send_resume': True,
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


class ConsultantAvailableDates(BaseModel):
    consultant: ConsultantDB
    dates: list[date]


class ConsultantAvailableTimeSlots(BaseModel):
    consultant: ConsultantDB
    time_slots: list[time]
