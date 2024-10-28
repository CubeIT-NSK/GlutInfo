from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from datetime import date

from .user import UserRead


class ChatCreate(BaseModel):
    id: int
    messages: Optional[List['MessageCreate']]

    model_config = ConfigDict(
        extra='forbid',
    )


class MessageCreate(BaseModel):
    chat_id: int
    sender_id: int
    message_date: date
    text: str
    read_status: bool

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'chat_id': 1,
                    'message_date': '2024-10-07',
                    'text': 'Здравствуйте!',
                    'sender_id': 1,
                    'read_status': 0
                    # 'user': {
                    #     'id': 2,
                    #     'email': 'subbotin@mail.ru',
                    #     'password': 'badpassword',
                    #     'name': 'Василий',
                    #     'surname': 'Субботин',
                    #     'patronymic': 'Иванович',
                    #     'born_date': '1980-04-27',
                    #     'sex': 'male',
                    #     'role': 'consultant',
                    # }
                }
            ]
        }
    )


class MessageDB(MessageCreate):
    id: int
    # sender: UserRead
    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'chat_id': 1,
                    'message_date': '2024-10-07',
                    'text': 'Здравствуйте!',
                    'sender_id': 1
                    # 'user': {
                    #     'id': 2,
                    #     'email': 'subbotin@mail.ru',
                    #     'password': 'badpassword',
                    #     'name': 'Василий',
                    #     'surname': 'Субботин',
                    #     'patronymic': 'Иванович',
                    #     'born_date': '1980-04-27',
                    #     'sex': 'male',
                    #     'role': 'consultant',
                    # }
                }
            ]
        }
    )