from typing import Optional, List
from datetime import date

from sqlalchemy import (
    Text,
    Integer,
    String,
    Boolean,
    ForeignKey,
    Date
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.services.custom_types import ImageType
from app.core.db import Base


class EventOrganizators(Base):
    '''
    Model for EventOrganizators
    '''

    event_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('events.id'),
    )
    organizator_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('organizators.id'),
    )


class Organizators(Base):
    '''
    Model for Organizators
    '''

    fio: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(Text)
    
    project: Mapped[Optional[List['Projects']]] = relationship(
        secondary='projectsorganizators', back_populates='organizator'
                                            )
    event: Mapped[Optional[List['Events']]] = relationship(
        secondary='eventorganizators', back_populates='organizator'
    )

    def __repr__(self) -> str:
        return f"{self.fio} {self.role}"


class Events(Base):
    '''
    Model for Events
    '''

    title: Mapped[Optional[str]] = mapped_column(Text)
    date_event: Mapped[Optional[date]] = mapped_column(Date)
    finished: Mapped[bool] = mapped_column(Boolean)
    main_image: Mapped[ImageType] = mapped_column(ImageType)
    link: Mapped[Optional[str]] = mapped_column(String)
    event_format: Mapped[Optional[str]] = mapped_column(String)
    place: Mapped[str] = mapped_column(String)
    text: Mapped[Optional[str]] = mapped_column(Text)

    organizator: Mapped[Optional[List[Organizators]]] = relationship(
        secondary='eventorganizators', back_populates='event'
    )

    def __repr__(self) -> str:
        return f"{self.title}"
