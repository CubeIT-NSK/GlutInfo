from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import date

from app.core.constants import DEFAULT_MIN_CHAR
from app.models.admin.feedback import Rating_place, Rating
from app.schemas.consultant import ConsultantDB

# from fastapi_storages import FileSystemStorage
# from fastapi_storages.integrations.sqlalchemy import ImageType


class HistoriesCreate(BaseModel):
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    name: str
    surname: str
    diagnosis: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )


class HistoriesUpdate(HistoriesCreate):
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    name: Optional[str]
    surname: Optional[str]
    diagnosis: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )


class HistorieDB(HistoriesCreate):
    id: int


class PhotoGalleryRead(BaseModel):
    id: int
    image: str


class CooperationsRead(BaseModel):
    name: str
    phone: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    email: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    offer: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )


class NewslettersCreate(BaseModel):
    name: str
    email: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )


class NewslettersDB(NewslettersCreate):
    id: int


class ReviewCreate(BaseModel):
    rating: Optional[Rating]
    name: str
    surname: str
    consultant_id: int
    review_event: date
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    # published: bool
    # is_accepted: bool

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'rating': '5',
                    'name': 'Василий',
                    'surname': 'Субботин',
                    'consultant_id': '1',
                    'review_event': '2024-07-25',
                    'text': 'Some text',

                }
            ]
        }
    )


class ReviewUpdate(BaseModel):
    rating: Optional[Rating]
    name: Optional[str]
    surname: Optional[str]
    review_event: Optional[date]
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    consultants: Optional[ConsultantDB]

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
                'examples': [
                    {
                        'rating': '5',
                        'name': 'Василий',
                        'surname': 'Субботин',
                        'review_event': '2024-07-25',
                        'text': 'Some text',
                        'consultants': {
                            'id': 1,
                            'speciality': 'Терапевт травматолог',
                            'experience': 5,
                            'grade': 'Старший',
                            'institution': 'НГМУ',
                            'current_work': 'Городская поликлиника №1',
                            'user': {
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
                    }
                ]
            }
    )


class ReviewDB(ReviewCreate):
    id: int
    consultants: ConsultantDB

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
                'examples': [
                    {
                        'id': 1,
                        'rating': '5',
                        'name': 'Василий',
                        'surname': 'Субботин',
                        'review_event': '2024-07-25',
                        'text': 'Some text',
                        'consultants': {
                            'id': 1,
                            'speciality': 'Терапевт травматолог',
                            'experience': 5,
                            'grade': 'Старший',
                            'institution': 'НГМУ',
                            'current_work': 'Городская поликлиника №1',
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
                    }
                ]
            }
    )


class PlacesRead(BaseModel):
    id: int
    place_type: str
    name: str
    description: Optional[str]
    rating: Optional[Rating_place]
    address: Optional[str]
    phone: Optional[str]
    website: Optional[str]
    image: str

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    "id": 1,
                    "place_type": "Ресторан/Кафе",
                    "name": "Uslada",
                    "description": "Some text",
                    "rating": "4.6",
                    "address": "ул. Мира, 37, Санкт-Петербург",
                    "phone": "+79110891964",
                    "website": "uslada-candles.ru",
                    "image": "Some image"
                }
            ]
        }
    )


class QuestionnaireCreate(BaseModel):
    main_problem: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    bad_habits: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    allergy: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    relatives_illnesses: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    chronic_illnes: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    user_surgery: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    for_women: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    medicament: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    analysis: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    body_parameters: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
                'examples': [
                    {
                        'main_problem': 'Болит спина',
                        'bad_habits': 'Курение',
                        'allergy': 'Есть аллергия на цитрусовое',
                        'relatives_illnesses': 'Точно не могу подсказать'
                        'болезни родственников',
                        'chronic_illnes': 'Хронический заболеваний нет',
                        'user_surgery': 'Операций не было',
                        'for_women': '*Пропуск раздела для женщин*',
                        'medicament': 'Не принимая медикиментозное лечение',
                        'analysis': 'Добавлю флюрографию в личном кабинете',
                        'body_parameters': ' Рост 140, вес 121, 90-60-90, АД - 127/82, температура 36.6',
                    }
                ]
            }
    )
