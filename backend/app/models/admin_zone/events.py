from typing import Optional
from datetime import date

from sqlalchemy import (
    String,
    Text,
    Integer,
    ForeignKey,
    Boolean,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base


class Organizators(Base):
    '''
    Model for Organizators
    '''

    fio: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(Text)
    event_id: Mapped[int] = mapped_column(Integer)

    event_organizators: Mapped[Optional['EventOrganizators']] = relationship(
        back_populates='organizator'
    )
    # project_organizator: Mapped[Optional['ProjectsOrganizators']] =
    #  relationship
    # (
    #     back_populates='organizator'
    # )


# classes for Events
class Events(Base):
    '''
    Model for Events
    '''

    title: Mapped[Optional[str]] = mapped_column(Text)
    date_event: Mapped[Optional[date]]
    finished: Mapped[bool] = mapped_column(Boolean)
    main_image = mapped_column()
    link: Mapped[Optional[str]] = mapped_column(String)
    event_format = mapped_column()
    place: Mapped[str] = mapped_column(Text)
    text: Mapped[Optional[str]] = mapped_column(String)

    event_organizator: Mapped[Optional['EventOrganizators']] = relationship(
        back_populates='event'
    )


class EventOrganizators(Base):
    '''
    Model for EventOrganizators
    '''

    event_id: Mapped[int] = mapped_column(Integer,
                                          ForeignKey('organizators.id'))
    organizator_id: Mapped[int] = mapped_column(Integer,
                                                ForeignKey('events.id'))

    event: Mapped[Events] = relationship(back_populates='event_organizator')
    organizator: Mapped[Organizators] = relationship(
                                        back_populates='event_organizators'
                                        )
