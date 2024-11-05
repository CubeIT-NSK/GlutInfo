from sqladmin import ModelView

from app.models.admin.projects import ProjectsOrganizators, Projects
from app.models.admin.documents import Documents, ProjectsDocuments


class ProjectsOrganizatorsAdmin(ModelView, model=ProjectsOrganizators):
    name_plural = "Projects Organizators"
    category = "Projects"
    column_list = [ProjectsOrganizators.id,
                   ProjectsOrganizators.project_id,
                   ProjectsOrganizators.organizator_id,
                   ]


class ProjectsAdmin(ModelView, model=Projects):
    name_plural = Projects.__tablename__.title()
    category = "Projects"
    column_list = [Projects.id,
                   Projects.title,
                   ]


class DocumentsAdmin(ModelView, model=Documents):
    name_plural = Documents.__tablename__.title()
    category = "Projects"
    column_list = [Documents.id,
                   ]


class ProjectsDocumentsAdmin(ModelView, model=ProjectsDocuments):
    name_plural = "Projects Documents"
    category = "Projects"
    column_list = [ProjectsDocuments.id,
                   ProjectsDocuments.project_id,
                   ProjectsDocuments.document_id,
                   ]
    column_searchable_list = [ProjectsDocuments.project_id,
                              ProjectsDocuments.document_id,
                              ]
