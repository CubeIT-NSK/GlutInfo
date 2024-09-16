from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from app.core.db import Base
from app.core.constants import (
    DEFAULT_MAX_CHAR,
)


# classes for Survey
class Surveys(Base):
    '''
    Model for Survey.
    '''

    title: Mapped[str] = mapped_column(Text)
    text: Mapped[str] = mapped_column(Text)

    questions = relationship('questions', back_populates='survey')


class Questions(Base):
    '''
    Model for Question.
    '''

    survey_id: Mapped[str] = mapped_column(Integer,
                                           ForeignKey('surveys.id'))
    text: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer)
    q_type: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))

    survey = relationship('surveys', back_populates='questions')


class AnswerOptions(Base):
    '''
    Model for AnswerOptions.
    '''

    text: Mapped[str] = mapped_column(Text)
    question_id: Mapped[int] = mapped_column(Integer,
                                             ForeignKey('questions.id'))


class Responses(Base):
    '''
    Model for Responses.
    '''

    answer_id: Mapped[int] = mapped_column(Integer,
                                           ForeignKey('answeroptions.id'))
    patientresponses_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('patientsresponses.id')
    )
