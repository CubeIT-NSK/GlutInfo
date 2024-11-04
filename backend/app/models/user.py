from typing import Optional, Literal, get_args, List
from datetime import date

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import (
    String, Integer, Text, Date,
    Enum, ForeignKey, Boolean, UniqueConstraint)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
    MAX_PATRONYMIC_CHAR,
)

Sex = Literal['male', 'female']
Role = Literal['patient', 'consultant']


class User(SQLAlchemyBaseUserTable[int], Base):
    '''
    Model for User.
    '''

    name: Mapped[Optional[str]] = mapped_column(String(MAX_NAME_CHAR))
    surname: Mapped[Optional[str]] = mapped_column(String(MAX_SURNAME_CHAR))
    patronymic: Mapped[Optional[str]] = mapped_column(
        String(MAX_PATRONYMIC_CHAR)
    )
    born_date: Mapped[Optional[date]] = mapped_column(Date)
    sex: Mapped[Optional[Sex]] = mapped_column(Enum(
        *get_args(Sex),
        name="sexstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    phone: Mapped[int] = mapped_column(Integer)
    role: Mapped[Role] = mapped_column(Enum(
        *get_args(Role),
        name="rolestatus",
        create_constraint=True,
        validate_strings=True,
    ))

    consultant: Mapped[Optional['Consultants']] = relationship(
        back_populates='user',
        lazy='joined'
    )
    patient: Mapped[Optional['Patients']] = relationship(
        back_populates='user',
        lazy='joined'
    )
    messages: Mapped[Optional['Messages']] = relationship(
        back_populates='sender'
    )
    chats: Mapped[List["Chats"]] = relationship(
        secondary='chatparticipant',
        back_populates="users"
        )
    read_statuses: Mapped[Optional[List["ReadStatus"]]] = relationship(
        back_populates="user"
        )
    questionnaire: Mapped[Optional['Questionnaire']] = relationship(
        back_populates='user'
    )

    def __repr__(self) -> str:
        return f"{self.surname} {self.name} {self.patronymic}"


class Patients(Base):
    '''
    Model for Patient.
    '''

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('user.id'),
        unique=True
    )
    address: Mapped[str] = mapped_column(Text)
    education: Mapped[str] = mapped_column(Text)
    working: Mapped[bool] = mapped_column(Boolean)
    position: Mapped[str] = mapped_column(Text)
    image: Mapped[str] = mapped_column(Text, default=None, nullable=True)

    user: Mapped[User] = relationship(back_populates='patient',
                                      lazy='joined'
                                      )
    patientresponses: Mapped[Optional['PatientsResponses']] = relationship(
        back_populates='patient'
    )
    records: Mapped[list['Records']] = relationship(
        back_populates='patient',
        lazy='joined'
    )

    def __repr__(self) -> str:
        return f"{self.user}"

    __table_args__ = (UniqueConstraint("user_id"),)
    


class Consultants(Base):
    '''
    Model for Consultant.
    '''
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('user.id'),
        unique=True
    )
    speciality: Mapped[str] = mapped_column(Text)
    experience: Mapped[int] = mapped_column(Integer)
    grade: Mapped[str] = mapped_column(Text)
    institution: Mapped[str] = mapped_column(Text)
    current_work: Mapped[str] = mapped_column(Text)
    video_presentation: Mapped[str] = mapped_column(
        Text,
        default=None,
        nullable=True
    )
    is_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    is_send_resume: Mapped[bool] = mapped_column(Boolean, default=False)

    user: Mapped[User] = relationship(back_populates='consultant',
                                      lazy='joined'
                                      )
    reviews: Mapped[Optional['Reviews']] = relationship(
        back_populates='consultants'
    )
    services: Mapped[list['Services']] = relationship(
        back_populates='consultant',
        lazy='joined'
    )
    schedule: Mapped[list['Schedule']] = relationship(
        back_populates='consultant',
        lazy='joined'
    )
    records: Mapped[list['Records']] = relationship(
        back_populates='consultant',
        lazy='joined'
    )

    def __repr__(self) -> str:
        return f"{self.user}"

    __table_args__ = (UniqueConstraint("user_id"),)
