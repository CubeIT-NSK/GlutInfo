from typing import Optional

from sqlalchemy import (
    Text,
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
# from events import Organizators


class ProjectsOrganizators(Base):
    '''
    '''

    project_id: Mapped[Optional[int]] = mapped_column(
                                                    Integer,
                                                    ForeignKey('projects.id')
                                                      )
    organizator_id: Mapped[Optional[int]] = mapped_column(
                                                    Integer,
                                                    ForeignKey('projects.id')
                                                      )
    project: Mapped['Projects'] = relationship(
                                        back_populates='project_organizator'
                                        )
    # organizator: Mapped['Organizators'] = relationship(
    #                                     back_populates='consultant',
    #                                   )


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
        back_populates=''
    )
    document: Mapped[Documents] = relationship(
        back_populates='project_document'
    )
