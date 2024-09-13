from typing import Optional
from datetime import date

from sqlalchemy import String, Date, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.db import Base
from app.core.constants import (
    DEFAULT_MAX_CHAR,
)


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


class PatientsResponses(Base):
    patient_id: Mapped[int] = mapped_column(Integer, ForeignKey('patients.id'))
    surveys_id: Mapped[int] = mapped_column(Integer, ForeignKey('surveys.id'))
    pub_date: Mapped[date] = mapped_column(Date)


class Patients(Base):
    '''
    Model for Patient.
    '''

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    address: Mapped[str] = mapped_column(Text)
    education: Mapped[str] = mapped_column(Text)
    working: Mapped[bool] = mapped_column(Boolean)
    position: Mapped[str] = mapped_column(Text)
    # image: Mapped[] = mapped_column()  Need to check how to save static

    user: Mapped['Users'] = relationship(back_populates='patients')


# classes for Users and others
class Users(Base):
    '''
    Model for User.
    '''

    name: Mapped[str] = mapped_column(String)
    surname: Mapped[str] = mapped_column(String)
    patronymic: Mapped[str] = mapped_column(Text)
    born_date: Mapped[str] = mapped_column(Text)
    sex: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(Text)
    email: Mapped[str] = mapped_column(Text)
    verified: Mapped[str] = mapped_column(Text)

    patients: Mapped['Patients'] = relationship(back_populates='user')
    consultants: Mapped['Consultants'] = relationship(back_populates='user')


class Consultants(Base):
    '''
    Model for Consultant.
    '''

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    speciality: Mapped[list] = mapped_column(Text)
    experience: Mapped[str] = mapped_column(Text)
    grade: Mapped[str] = mapped_column(Text)
    institution: Mapped[str] = mapped_column(Text)
    current_work: Mapped[str] = mapped_column(Text)

    user: Mapped['Users'] = relationship(back_populates='consultants')


class Records(Base):
    '''
    Model for Record.
    '''

    pub_date: Mapped[date] = mapped_column(Date)
    consultants_id: Mapped[int] = mapped_column(Integer,
                                                ForeignKey('consultants.id'))
    patient_id: Mapped[int] = mapped_column(Integer, )
    service_id: Mapped[int] = mapped_column(Integer, ForeignKey('services.id'))

    consultants = relationship(foreign_keys=[consultants_id])
    service = relationship(foreign_keys=[service_id])


class Services(Base):
    '''
    Model for Service.
    '''

    name: Mapped[str] = mapped_column(Text)
    price: Mapped[int] = mapped_column(Integer)
    description: Mapped[Optional[str]] = mapped_column(Text)
    consultant_id: Mapped[int] = mapped_column(Integer,
                                               ForeignKey('consultants.id'))


class Chats(Base):
    '''
    Model for Chat.
    '''


class Messages(Base):
    '''
    Model for Chat.
    '''

    chat_id: Mapped[int] = mapped_column(Integer, ForeignKey('chats.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
