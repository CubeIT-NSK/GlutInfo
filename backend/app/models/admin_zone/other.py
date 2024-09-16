from typing import Optional, Literal, get_args
from datetime import date
from sqlalchemy import String, Text, Enum, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
)


Rating = Literal['0', '1', '2', '3', '4', '5']


class Histories(Base):
    '''
    Model for Histories
    '''

    text: Mapped[Optional[str]] = mapped_column(Text)
    name: Mapped[Optional[str]] = mapped_column(String(MAX_NAME_CHAR))
    surname: Mapped[Optional[str]] = mapped_column(String(MAX_SURNAME_CHAR))
    diagnosis: Mapped[Optional[str]] = mapped_column(Text)


class PhotoGallery(Base):
    '''
    Model for PhotoGallery
    '''

    image: Mapped[str] = mapped_column()


class Cooperations(Base):
    '''
    Model for Cooperations
    '''

    name: Mapped[str] = mapped_column()
    phone: Mapped[str] = mapped_column(String)


class Newsletters(Base):
    '''
    Model for Newsletters
    '''

    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)


class Reviews(Base):
    '''
    Model for Reviews
    '''

    rating: Mapped[Optional['Rating']] = mapped_column(Enum(
        *get_args(Rating),
        name="sexstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    name: Mapped[Optional[str]] = mapped_column(String(MAX_NAME_CHAR))
    surname: Mapped[Optional[str]] = mapped_column(String(MAX_SURNAME_CHAR))
    review_event: Mapped[Optional[date]] = mapped_column(Date)
    consultant: Mapped[int] = mapped_column[Integer]
    text: Mapped[Optional[str]] = mapped_column(Text)


class Places(Base):
    '''
    Model for Places
    '''

    place_type: Mapped[str] = mapped_column(String)
    name: Mapped[Optional[str]] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(Text)
    rating: Mapped[Optional['Rating']] = mapped_column(Enum(
        *get_args(Rating),
        name="sexstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    address: Mapped[Optional[str]] = mapped_column(String)
    phone: Mapped[Optional[str]] = mapped_column(String)
    website: Mapped[Optional[str]] = mapped_column(String)
    image = mapped_column()
