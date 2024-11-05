from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from app.core.constants import DEFAULT_MIN_CHAR, DEFAULT_MAX_CHAR
from .consultant import ConsultantDB


class ServicesCreate(BaseModel):
    id: int
    name: str
    price: int
    description: Optional[str] = Field(
        min_length=DEFAULT_MIN_CHAR   
    )
    consultant_id: ConsultantDB

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {   
                    'id': 1,
                    'name': 'Консультация Терапевта травматолога',
                    'price': 1500,
                    'description': '',
                    'consultant_id':{
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
