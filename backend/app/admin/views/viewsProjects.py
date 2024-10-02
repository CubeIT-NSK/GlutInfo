from sqladmin import ModelView

from app.models.admin_zone.projectsPlusEvents import (
    ProjectsOrganizators,
    Projects,
    Documents,
    ProjectsDocuments
)


class ProjectsOrganizatorsAdmin(ModelView, model=ProjectsOrganizators):
    name_plural = "Projects Organizators"
    category = "Projects"
    column_list = [ProjectsOrganizators.id,
                   ProjectsOrganizators.project_id,
                   ProjectsOrganizators.organizator_id,
                   ProjectsOrganizators.project,
                   ProjectsOrganizators.organizator,
                   ]
    column_searchable_list = [ProjectsOrganizators.project,
                              ProjectsOrganizators.organizator,
                              ]


class ProjectsAdmin(ModelView, model=Projects):
    name_plural = Projects.__tablename__.title()
    category = "Projects"
    column_list = [Projects.id,
                   Projects.title,
                   Projects.project_organizator,
                   Projects.project_document,
                   ]
    column_searchable_list = [Projects.project_organizator,
                              Projects.project_document,
                              ]
    form_excluded_columns = [Projects.project_organizator,
                             Projects.project_document
                             ]


class DocumentsAdmin(ModelView, model=Documents):
    name_plural = Documents.__tablename__.title()
    category = "Projects"
    column_list = [Documents.id,
                   Documents.project_document,
                   ]
    column_searchable_list = [Documents.project_document,
                              ]
    form_excluded_columns = [Documents.project_document,
                             ]


class ProjectsDocumentsAdmin(ModelView, model=ProjectsDocuments):
    name_plural = "Projects Documents"
    category = "Projects"
    column_list = [ProjectsDocuments.id,
                   ProjectsDocuments.project_id,
                   ProjectsDocuments.document_id,
                   ProjectsDocuments.project,
                   ProjectsDocuments.document,
                   ]
    column_searchable_list = [ProjectsDocuments.project_id,
                              ProjectsDocuments.document_id,
                              ProjectsDocuments.project,
                              ProjectsDocuments.document,
                              ]
