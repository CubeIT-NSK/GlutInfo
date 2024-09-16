from typing import Optional
from datetime import date

from sqlalchemy import Date, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from user import User
from app.core.db import Base


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

    user: Mapped[User] = relationship(back_populates='patients')


# classes for others
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
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    date_send: Mapped[Optional[date]] = mapped_column(Date)
