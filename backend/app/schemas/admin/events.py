from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import date

from app.core.constants import DEFAULT_MIN_CHAR


class OrganizatorsRead(BaseModel):
    id: int
    fio: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    role: str
    description: Optional[str]

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'fio': 'Субботин Василий Иванович',
                    'role': 'Ведущий',
                    'description': 'Some text',
                }
            ]
        }
    )


class EventRead(BaseModel):
    id: int
    title: str
    date_event: date
    finished: bool
    main_image: Optional[str]
    link: Optional[str]
    event_format: Optional[str]
    place: str
    text: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    organizator: Optional[list['OrganizatorsRead']]

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'title': 'Полезные качества пива',
                    'date_event': '2024-08-09',
                    'finished': True,
                    'main_image': '',
                    'link': 'url',
                    'event_format': 'Лекция',
                    'text': 'some text',
                    "organizator": [
                                {
                                    "id": 1,
                                    "fio": "Берюзов Тимур Михайлович",
                                    "role": "Ведущий",
                                    "description": "Some text"
                                }
                    ]
                }
            ]
        }
    )


class EventOrganizatorsRead(BaseModel):
    id: int
    event_id: EventRead
    organizator_id: OrganizatorsRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'event_id': {
                        'id': 1,
                        'title': 'Some title',
                        'date_event': '2024-08-09',
                        'finished': False,
                        'main_image': '',
                        'link': 'url',
                        'event_format': 'Форум',
                        'text': 'Some text',
                    },
                    'organizator_id': {
                        'id': 1,
                        'fio': 'Субботин Василий Иванович',
                        'role': 'role',
                        'description': 'Some text',
                    }
                }
            ]
        }
    )
