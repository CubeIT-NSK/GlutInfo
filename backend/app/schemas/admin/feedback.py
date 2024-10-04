from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import date

from app.core.constants import DEFAULT_MIN_CHAR
from backend.app.models.admin.feedback import Rating
from app.schemas.consultant import ConsultantDB


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
    image = Field(
    )


class CooperationsRead(BaseModel):
    name: str
    phone: str = Field(
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
    review_event: date
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'rating': '5',
                    'name': 'Василий',
                    'surname': 'Субботин',
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
    rating: Optional[Rating]
    address: Optional[str]
    phone: Optional[str]
    website: Optional[str]
    # image
