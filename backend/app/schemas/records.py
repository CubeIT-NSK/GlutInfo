from pydantic import BaseModel, ConfigDict
from datetime import date

from .patient import PatientDB
from .consultant import ConsultantDB
from .services import ServicesCreate


class RecordsCreate(BaseModel):
    id: int
    pub_date: date
    consultants_id: ConsultantDB
    patient_id: PatientDB
    service_id: ServicesCreate

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            'examples': [
                {   
                    'id': 1,
                    'pub_date': '2024-10-07',
                    'consultants_id':{
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
                    },
                    'patient_id':{
                        'id': 1,
                        'address': 'г. Санкт-Петербург',
                        'education': 'Среднее',
                        'position': 'Старший слесарь',
                        'working': True,
                        'user': {
                            'id': 2,
                            'email': 'boganalov@mail.ru',
                            'password': 'badpassword',
                            'name': 'Борис',
                            'surname': 'Ганалов',
                            'patronymic': 'Олегович',
                            'born_date': '1980-04-27',
                            'sex': 'male',
                            'role': 'patient',
                        }
                    },
                    'service_id':{
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
                }
            ]
        }
    )
