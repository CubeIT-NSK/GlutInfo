from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from app.core.constants import DEFAULT_MIN_CHAR
from app.schemas.admin.events import OrganizatorsRead


class ProjectsRead(BaseModel):
    title: str = Field(
        min_length=DEFAULT_MIN_CHAR
    )
    id: int
    organizators: Optional[list[OrganizatorsRead]]

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'title': 'Правильное питание',
                    'organizators': {
                        
                    }
                }
            ]
        }
    )


class ProjectsOrganizatorsRead(BaseModel):
    id: int
    project_id: ProjectsRead
    organizator_id: OrganizatorsRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'project_id': {
                        'id': 1,
                        'title': 'Правильное питание',
                    },
                    'organizator_id': {
                        'id': 1,
                        'fio': 'Субботин Василий Иванович',
                        'role': 'Ведущий',
                        'description': 'Some text',
                        'event_id': 2,
                    }
                }
            ]
        }
    )


class DocumentsRead(BaseModel):
    id: int
    # file:

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    # 'file':
                }
            ]
        }
    )


class ProjectsDocumentsRead(BaseModel):
    id: int
    project: ProjectsRead
    document: DocumentsRead

    model_config = ConfigDict(
        extra='forbid',
        json_schema_extra={
            'examples': [
                {
                    'id': 1,
                    'project': {
                        'id': 1,
                        'title': 'Правильное питание',
                    },
                    'document': {
                        'id': 1,
                        # 'file':
                    }
                }
            ]
        }
    )
