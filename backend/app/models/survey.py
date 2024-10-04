from typing import Optional
from datetime import date

from sqlalchemy import String, Date, Text, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.db import Base
from app.core.constants import (
    DEFAULT_MAX_CHAR,
)
from app.models.user import Patients, Consultants, User


class Surveys(Base):
    '''
    Model for Survey.
    '''

    title: Mapped[str] = mapped_column(Text)
    text: Mapped[str] = mapped_column(Text)

    questions: Mapped[Optional['Questions']] = relationship(
         back_populates='survey'
         )
    patientsresponses: Mapped[Optional['PatientsResponses']] = relationship(
        back_populates='surveys'
    )


class Questions(Base):
    '''
    Model for Question.
    '''

    survey_id: Mapped[str] = mapped_column(Integer,
                                           ForeignKey('surveys.id'))
    text: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer)
    q_type: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))

    survey: Mapped[Surveys] = relationship(
        back_populates='questions'
        )
    answer: Mapped[Optional['AnswerOptions']] = relationship(
        back_populates='question'
    )


class AnswerOptions(Base):
    '''
    Model for AnswerOptions.
    '''

    text: Mapped[str] = mapped_column(Text)
    question_id: Mapped[int] = mapped_column(Integer,
                                             ForeignKey('questions.id'))

    question: Mapped[Questions] = relationship(
        back_populates='answer'
    )
    response: Mapped[Optional['Responses']] = relationship(
        back_populates='answer'
    )


class PatientsResponses(Base):
    patient_id: Mapped[int] = mapped_column(Integer, ForeignKey('patients.id'))
    surveys_id: Mapped[int] = mapped_column(Integer, ForeignKey('surveys.id'))
    pub_date: Mapped[date] = mapped_column(Date)

    response: Mapped[Optional['Responses']] = relationship(
        back_populates='patientresponses'
    )
    surveys: Mapped[Surveys] = relationship(
        back_populates='patientsresponses'
    )
    patient: Mapped[Patients] = relationship(
        back_populates='patientresponses'
    )


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

    answer: Mapped[AnswerOptions] = relationship(
        back_populates='response'
    )
    patientresponses: Mapped[PatientsResponses] = relationship(
        back_populates='response'
    )


class Services(Base):
    '''
    Model for Service.
    '''

    name: Mapped[str] = mapped_column(Text)
    price: Mapped[int] = mapped_column(Integer)
    description: Mapped[Optional[str]] = mapped_column(Text)
    consultant_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('consultants.id')
        )
    consultants: Mapped[Consultants] = relationship(
        back_populates='services'
    )
    records: Mapped[Optional['Records']] = relationship(
        back_populates='services'
    )


class Records(Base):
    '''
    Model for Record.
    '''

    pub_date: Mapped[date] = mapped_column(Date)
    consultants_id: Mapped[int] = mapped_column(Integer,
                                                ForeignKey('consultants.id'))
    patient_id: Mapped[int] = mapped_column(Integer, )
    service_id: Mapped[int] = mapped_column(Integer, ForeignKey('services.id'))

    consultants: Mapped[Consultants] = relationship(
        back_populates=''
    )
    services: Mapped[Services] = relationship(
        back_populates='records'
    )
