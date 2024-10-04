from typing import Optional, Literal, get_args
from datetime import date

from sqlalchemy import String, Text, Enum, Date, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
)
from app.models.user import Consultants


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

    # image: Mapped[ImageType] = mapped_column(
    #     ImageType(storage=FileSystemStorage(path="/tmp")))


class Cooperations(Base):
    '''
    Model for Cooperations
    '''

    name: Mapped[str] = mapped_column(String)
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
        name="ratingstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    name: Mapped[Optional[str]] = mapped_column(String(MAX_NAME_CHAR))
    surname: Mapped[Optional[str]] = mapped_column(String(MAX_SURNAME_CHAR))
    review_event: Mapped[Optional[date]] = mapped_column(Date)
    consultant: Mapped[int] = mapped_column(
        Integer, ForeignKey('consultants.id'
                            ))
    text: Mapped[Optional[str]] = mapped_column(Text)

    consultants: Mapped['Consultants'] = relationship(
        back_populates='reviews'
    )


class Places(Base):
    '''
    Model for Places
    '''
    place_type: Mapped[str] = mapped_column(String)
    name: Mapped[Optional[str]] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(Text)
    rating: Mapped[Optional['Rating']] = mapped_column(Enum(
        *get_args(Rating),
        name="ratingstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    address: Mapped[Optional[str]] = mapped_column(String)
    phone: Mapped[Optional[str]] = mapped_column(String)
    website: Mapped[Optional[str]] = mapped_column(String)
    # image: Mapped[ImageType] = mapped_column(
    #     ImageType(storage=FileSystemStorage(path="/tmp"))
    #     )
