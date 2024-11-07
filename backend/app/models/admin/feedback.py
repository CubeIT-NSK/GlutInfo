from typing import Optional, Literal, get_args
from datetime import date

from sqlalchemy import (
    String,
    Text,
    Enum,
    Date,
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.services.custom_types import ImageType
from app.core.db import Base
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
)
from app.models.user import Consultants, User


Rating_place = Literal[
    '4.0',
    '4.1',
    '4.2',
    '4.3',
    '4.4',
    '4.5',
    '4.6',
    '4.7',
    '4.8',
    '4.9',
    '5.0']
Rating = Literal['0', '1', '2', '3', '4', '5']
Place = Literal[
    'Ресторан/Кафе',
    'Магазин где представлена Б.П.',
    'Магазин с Б.П.'
    ]


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
    image: Mapped[ImageType] = mapped_column(ImageType)

    @property
    def image_name(self) -> str:
        return f"{self.image.name}"

    def __repr__(self):
        return f"{self.image.name}"


class Cooperations(Base):
    '''
    Model for Cooperations
    '''

    name: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    offer: Mapped[str] = mapped_column(Text)


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
    place_type: Mapped[Place] = mapped_column(Enum(
        *get_args(Place),
        name="placetype",
        create_constraint=True,
        validate_strings=True,
    ))
    name: Mapped[Optional[str]] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(Text)
    rating: Mapped[Optional['Rating_place']] = mapped_column(Enum(
        *get_args(Rating_place),
        name="placeratingstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    address: Mapped[Optional[str]] = mapped_column(String)
    phone: Mapped[Optional[str]] = mapped_column(String)
    website: Mapped[Optional[str]] = mapped_column(String)
    image: Mapped[ImageType] = mapped_column(ImageType)


class Questionnaire(Base):
    '''
    Model for user's ankets
    '''
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('user.id')
    )
    main_problem: Mapped[str] = mapped_column(Text)
    bad_habits: Mapped[str] = mapped_column(Text)
    allergy: Mapped[str] = mapped_column(Text)
    relatives_illnesses: Mapped[str] = mapped_column(Text)
    chronic_illnes: Mapped[str] = mapped_column(Text)
    user_surgery: Mapped[str] = mapped_column(Text)
    for_women: Mapped[str] = mapped_column(Text, nullable=True)
    medicament: Mapped[str] = mapped_column(Text)
    analysis: Mapped[str] = mapped_column(Text)
    body_parameters: Mapped[str] = mapped_column(Text)

    user: Mapped[User] = relationship(
        back_populates='questionnaire'
    )
