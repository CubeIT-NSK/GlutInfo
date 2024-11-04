from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from app.core.constants import DEFAULT_MIN_CHAR, DEFAULT_MAX_CHAR


class SurveysRead(BaseModel):
    id: int
    title: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    text: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'title': 'Some title',
                    'text': 'Some text',
                }
            ]
        }
    )


class QuestionsRead(BaseModel):
    id: int
    text: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    order: int
    q_type: str = Field(
        min_length=DEFAULT_MIN_CHAR,
        max_length=DEFAULT_MAX_CHAR
    )
    survey: SurveysRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'text': 'text',
                    'order': 3,
                    'q_type': 'Some text',
                    'survey': {
                        'id': 1,
                        'title': 'Some title',
                        'text': 'Some text',
                    }
                }
            ]
        }
    )


class AnswerOptionsRead(BaseModel):
    id: int
    text: str = Field(
        min_length=DEFAULT_MIN_CHAR,
    )
    question: QuestionsRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {   
                    'id': 1,
                    'text': 'Some text',
                    'question': {
                        'id': 1,
                        'text': 'text',
                        'order': 3,
                        'q_type': 'Some text',
                        'survey': {
                            'id': 1,
                            'title': 'Some title',
                            'text': 'Some text',
                        }
                    }
                }
            ]
        }
    )
