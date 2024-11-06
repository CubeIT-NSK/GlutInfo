from typing import Optional

from sqlalchemy import (
    Integer,
    ForeignKey,
    )
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models.admin.projects import Projects
from app.services.custom_types import FileType


class ProjectsDocuments(Base):
    project_id: Mapped[Optional[int]] = mapped_column(
        Integer,
        ForeignKey('projects.id')
        )
    document_id: Mapped[Optional[int]] = mapped_column(
        Integer,
        ForeignKey('documents.id')
        )


class Documents(Base):
    file: Mapped[FileType] = mapped_column(FileType)
    project: Mapped[Optional[list['Projects']]] = relationship(
        secondary='projectsdocuments', back_populates='document'
    )

    @property
    def file_name(self) -> str:
        return f"{self.file.name}"

    def __repr__(self) -> str:
        return f"{self.file.name}"
