from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from datetime import date

from .user import UserRead


class ChatCreate(BaseModel):
    id: int
    messages: Optional[List['MessagesCreate']]

    model_config = ConfigDict(
        extra='forbid',
    )


class MessagesCreate(BaseModel):
    id: int
    message_date: date
    text: str
    chat_id: ChatCreate
    sender_id: UserRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'message_date': '2024-10-07',
                    'text': 'Здравствуйте!',
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
