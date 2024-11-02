from typing import Optional
from sqlalchemy import (
    Text,
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models.admin.events import Organizators


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


class Projects(Base):
    '''
    '''

    title: Mapped[str] = mapped_column(Text)

    organizator: Mapped[Optional[list[Organizators]]] = relationship(
       secondary='projectsorganizators', back_populates='project'
    )
    document: Mapped[Optional[list['Documents']]] = relationship(
       secondary='projectsdocuments', back_populates='project'
    )

    def __repr__(self) -> str:
        return f"{self.title}"
