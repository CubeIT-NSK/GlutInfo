from typing import Optional, Literal, get_args
from datetime import date

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import String, Integer, Text, Date, Enum, ForeignKey, Boolean
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
    # phone: Mapped[int] = mapped_column(Integer)
    role: Mapped[Role] = mapped_column(Enum(
        *get_args(Role),
        name="rolestatus",
        create_constraint=True,
        validate_strings=True,
    ))

    consultant: Mapped[Optional['Consultants']] = relationship(
        back_populates='user'
    )


# class Patients(Base):
#     '''
#     Model for Patient.
#     '''

#     user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
#     address: Mapped[str] = mapped_column(Text)
#     education: Mapped[str] = mapped_column(Text)
#     working: Mapped[bool] = mapped_column(Boolean)
#     position: Mapped[str] = mapped_column(Text)
#     # image: Mapped[] = mapped_column()  Need to check how to save static

#     user: Mapped['Users'] = relationship(back_populates='patients')


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
    experience: Mapped[int] = mapped_column(Text)
    grade: Mapped[str] = mapped_column(Integer)
    institution: Mapped[str] = mapped_column(Text)
    current_work: Mapped[str] = mapped_column(Text)

    user: Mapped[User] = relationship(back_populates='consultant',
                                      lazy='joined')
