from typing import Optional, List
from datetime import date

from sqlalchemy import (
    Text,
    Integer,
    String,
    Boolean,
    ForeignKey,
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

    event_organizators: Mapped[
            Optional[List['EventOrganizators']]] = relationship(
                                    back_populates='organizator'
                                )
    project_organizator: Mapped[
        Optional[List['ProjectsOrganizators']]] = relationship(
                                                back_populates='organizator'
                                            )


# classes for Events
class Events(Base):
    '''
    Model for Events
    '''

    title: Mapped[Optional[str]] = mapped_column(Text)
    date_event: Mapped[Optional[date]]
    finished: Mapped[bool] = mapped_column(Boolean)
    main_image = mapped_column(String)
    link: Mapped[Optional[str]] = mapped_column(String)
    event_format = mapped_column(String)
    place: Mapped[str] = mapped_column(Text)
    text: Mapped[Optional[str]] = mapped_column(String)

    event_organizator: Mapped[
                    Optional[List['EventOrganizators']]] = relationship(
                                                back_populates='event'
                                            )


class EventOrganizators(Base):
    '''
    Model for EventOrganizators
    '''

    event_id: Mapped[int] = mapped_column(Integer,
                                          ForeignKey('events.id'))
    organizator_id: Mapped[int] = mapped_column(Integer,
                                                ForeignKey('organizators.id'))

    event: Mapped[Events] = relationship(back_populates='event_organizator')
    organizator: Mapped[Organizators] = relationship(
                            back_populates='event_organizators'
                            )


class ProjectsOrganizators(Base):
    '''
    '''
    project_id: Mapped[Optional[int]] = mapped_column(
                                                    Integer,
                                                    ForeignKey('projects.id')
                                                      )
    organizator_id: Mapped[Optional[int]] = mapped_column(
                                                Integer,
                                                ForeignKey('organizators.id')
                                                    )
    project: Mapped['Projects'] = relationship(
                                        back_populates='project_organizator'
                                        )
    organizator: Mapped['Organizators'] = relationship(
                                        back_populates='project_organizator',
                                      )


class Projects(Base):
    '''
    '''

    title: Mapped[str] = mapped_column(Text)

    project_organizator: Mapped[Optional[ProjectsOrganizators]] = relationship(
        back_populates='project'
    )

    project_document: Mapped[Optional['ProjectsDocuments']] = relationship(
        back_populates='project'
    )


class Documents(Base):
    # file: Mapped[] = mapped_column()

    project_document: Mapped[Optional['ProjectsDocuments']] = relationship(
        back_populates='document'
    )


class ProjectsDocuments(Base):
    project_id: Mapped[Optional[int]] = mapped_column(
        Integer,
        ForeignKey('projects.id')
        )
    document_id: Mapped[Optional[int]] = mapped_column(
        Integer,
        ForeignKey('documents.id')
        )

    project: Mapped[Projects] = relationship(
        back_populates='project_document'
    )
    document: Mapped[Documents] = relationship(
        back_populates='project_document'
    )
