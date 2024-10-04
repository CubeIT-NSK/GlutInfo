from typing import Optional

from sqlalchemy import (
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models.admin.projects import Projects

class Documents(Base):
    # file: Mapped[FileType] = mapped_column(
    #     FileType(storage=FileSystemStorage(path="/tmp"))
    #     )
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