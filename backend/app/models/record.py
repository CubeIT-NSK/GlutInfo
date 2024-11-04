from typing import Optional, Literal, get_args
from datetime import date, time, timedelta

from sqlalchemy import (
    String,
    Integer,
    Text,
    Date,
    ForeignKey,
    Time,
    Enum,
    Boolean,
    Interval,
    UniqueConstraint
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.core.constants import (
    DEFAULT_MAX_CHAR,
)
from app.models.user import Consultants, Patients


day_of_week = Literal['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


class Schedule(Base):
    '''
    Model for Schedule of Consultants.
    '''

    day_week: Mapped[day_of_week] = mapped_column(
        Enum(
            *get_args(day_of_week),
            name="dayweekstatus",
            create_constraint=True,
            validate_strings=True,
        ),
    )
    start_hour: Mapped[Optional[time]] = mapped_column(Time)
    end_hour: Mapped[Optional[time]] = mapped_column(Time)
    working: Mapped[bool] = mapped_column(Boolean)
    consultant_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('consultants.id')
    )

    consultant: Mapped[Consultants] = relationship(back_populates='schedule',
                                                   lazy='joined')
    __table_args__ = (
        UniqueConstraint('day_week', 'consultant_id', name='consultant_day_c'),
    )


class Services(Base):
    '''
    Model for Services of Consultants.
    '''

    name: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    description: Mapped[str] = mapped_column(Text)
    price: Mapped[int] = mapped_column(Integer)
    duration: Mapped[timedelta] = mapped_column(Interval)
    consultant_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('consultants.id')
    )

    consultant: Mapped[Consultants] = relationship(back_populates='services',
                                                   lazy='joined')
    records: Mapped[list['Records']] = relationship(back_populates='service',
                                                    lazy='joined')


class Records(Base):
    '''
    Model for Records of Patients.
    '''

    rec_date: Mapped[date] = mapped_column(Date)
    rec_time: Mapped[time] = mapped_column(Time)
    consultant_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('consultants.id')
    )
    patient_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('patients.id')
    )
    service_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('services.id')
    )

    consultant: Mapped[Consultants] = relationship(back_populates='records',
                                                   lazy='joined')
    patient: Mapped[Patients] = relationship(back_populates='records',
                                             lazy='joined')
    service: Mapped[Services] = relationship(back_populates='records',
                                             lazy='joined')
