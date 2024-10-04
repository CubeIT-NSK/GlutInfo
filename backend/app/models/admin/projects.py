from typing import Optional
from sqlalchemy import (
    Text,
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base


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
