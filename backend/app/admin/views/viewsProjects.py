from sqladmin import ModelView

from app.models.admin_zone.projectsPlusEvents import (
    ProjectsOrganizators,
    Projects,
    Documents,
    ProjectsDocuments
)


class ProjectsOrganizatorsAdmin(ModelView, model=ProjectsOrganizators):
    column_list = [ProjectsOrganizators.id,
                   ProjectsOrganizators.project_id,
                   ProjectsOrganizators.organizator_id,
                   ]


class ProjectsAdmin(ModelView, model=Projects):
    column_list = [Projects.id,
                   Projects.title,
                   ]


class DocumentsAdmin(ModelView, model=Documents):
    column_list = [Documents.id,
                   ]


class ProjectsDocumentsAdmin(ModelView, model=ProjectsDocuments):
    column_list = [ProjectsDocuments.id,
                   ProjectsDocuments.project_id,
                   ProjectsDocuments.document_id,
                   ]
