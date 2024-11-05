from pydantic import BaseModel, ConfigDict
from datetime import date


class MessageCreate(BaseModel):
    chat_id: int
    message_date: date
    text: str

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'chat_id': 1,
                    'message_date': '2024-10-07',
                    'text': 'Здравствуйте!',
                }
            ]
        }
    )


class MessageDB(MessageCreate):
    id: int
    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'chat_id': 1,
                    'message_date': '2024-10-07',
                    'text': 'Здравствуйте!',

                }
            ]
        }
    )
