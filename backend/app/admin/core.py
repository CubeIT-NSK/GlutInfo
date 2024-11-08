import contextlib
from typing import Any
from pathlib import Path

from wtforms.validators import DataRequired
from starlette.requests import Request
from fastapi.security import OAuth2PasswordRequestForm
from sqladmin import ModelView, Admin
from sqladmin.authentication import AuthenticationBackend
from sqlalchemy.sql.expression import Select, select, and_

from app.core.db import engine
from app.models.user import (
    User,
    Patients,
    Consultants,
    Speciality
    )
from app.admin.views.events import (
    OrganizatorsAdmin,
    EventsAdmin,
    # EventOrganizatorsAdmin
)
from app.admin.views.feedback import (
    HistoriesAdmin,
    PhotoGalleryAdmin,
    CooperationsAdmin,
    NewslettersAdmin,
    ReviewsAdmin,
    PlacesAdmin
)
from app.admin.views.projects import (
    # ProjectsOrganizatorsAdmin,
    ProjectsAdmin,
    DocumentsAdmin,
    # ProjectsDocumentsAdmin
)
from app.core.user import get_async_session, get_user_db, get_user_manager


get_async_session_context = contextlib.asynccontextmanager(get_async_session)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


class UserAdmin(ModelView, model=User):
    can_create = False
    can_edit = False
    can_delete = False
    column_list = [User.id,
                   User.name,
                   User.surname,
                   User.patronymic,
                   User.phone,
                   User.role,
                   User.is_active,
                   User.is_superuser,
                   User.is_verified,
                   ]
    column_searchable_list = [User.name,
                              User.phone,
                              User.role
                              ]
    column_sortable_list = [User.is_active,
                            User.is_superuser,
                            User.is_verified,
                            ]
    form_excluded_columns = [User.consultant,
                             User.patient,
                             User.hashed_password,
                             User.messages
                             ]
    column_details_exclude_list = [
        User.consultant,
        User.messages,
        User.patient,
        User.chats,
        User.hashed_password,
        User.questionnaire,
        User.read_statuses
        ]

    form_ajax_refs = {
        'patient': {
            'fields': ('address', 'education', 'working', 'position'),
            'order_by': 'id'
        },
        'consultant': {
            'fields': ('speciality',
                       'experience',
                       'grade',
                       'institution',
                       'current_work'
                       ),
            'order_by': 'id'
        }
    }

    async def on_model_change(self, data: dict, model: Any,
                              is_created: bool, request: Request):
        ...
        return await super().on_model_change(data, model, is_created, request)


class PatientAdmin(ModelView, model=Patients):
    name_plural = Patients.__tablename__.title()
    can_create = False
    can_delete = False
    column_list = [Patients.id,
                   Patients.user_id,
                   Patients.address,
                   Patients.education,
                   Patients.working,
                   Patients.position,
                   Patients.user,
                   ]
    column_searchable_list = [Patients.address,
                              Patients.position,
                              Patients.user
                              ]
    column_sortable_list = [Patients.working,
                            ]
    form_excluded_columns = [Patients.patientresponses,
                             Patients.records,
                             ]
    # column_formatters_detail = {Patients.user: lambda m, a: User.name}
    column_details_exclude_list = [
        Patients.patientresponses,
        Patients.records
        ]


class ConsultantAdmin(ModelView, model=Consultants):
    name = 'ConsultantAccept'
    identity = 'consultants-for-accept'
    can_create = False
    can_delete = False
    form_columns = [Consultants.is_accepted, Consultants.is_send_resume]
    # name_plural = Consultants.__tablename__.title()
    column_list = [Consultants.id,
                   Consultants.speciality,
                   Consultants.grade,
                   Consultants.institution,
                   Consultants.user,
                   ]
    column_searchable_list = [Consultants.speciality,
                              Consultants.grade,
                              Consultants.user
                              ]
    # form_excluded_columns = [Consultants.reviews,
    #                          Consultants.records,
    #                          Consultants.services,
    #                          ]
    column_details_exclude_list = [
        Consultants.reviews,
        Consultants.records,
        Consultants.services,
        ]

    def list_query(self, request: Request) -> Select:
        querry = select(self.model).where(
            and_(
                self.model.is_send_resume == True, # noqa
                self.model.is_accepted == False # noqa
            )
        )
        return querry


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form.get("username")
        password = form.get("password")

        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.authenticate(
                        credentials=OAuth2PasswordRequestForm(
                            username=username,
                            password=password
                        )
                    )
                    if user and user.is_superuser:
                        print(f"User: {user.email}")
                        request.session.update({"token": user.email})
                        return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")
        return token is not None


class SpecialityAdmin(ModelView, model=Speciality):
    name_plural = "Специальности"
    column_list = [Speciality.speciality]


def create_admin_core(app):
    authentication_backend = AdminAuth(secret_key="supersecretkey")
    admin = Admin(
        app=app,
        engine=engine,
        templates_dir=Path(__file__).parent.parent / 'templates' / 'admin',
        # authentication_backend=authentication_backend
    )

    admin.add_view(UserAdmin)
    admin.add_view(PatientAdmin)
    admin.add_view(ConsultantAdmin)
    admin.add_view(SpecialityAdmin)

    admin.add_view(OrganizatorsAdmin)
    # admin.add_view(EventOrganizatorsAdmin)
    admin.add_view(EventsAdmin)

    # admin.add_view(ProjectsOrganizatorsAdmin)
    admin.add_view(ProjectsAdmin)
    admin.add_view(DocumentsAdmin)
    # admin.add_view(ProjectsDocumentsAdmin)

    admin.add_view(HistoriesAdmin)
    admin.add_view(PhotoGalleryAdmin)
    admin.add_view(CooperationsAdmin)
    admin.add_view(NewslettersAdmin)
    admin.add_view(ReviewsAdmin)
    admin.add_view(PlacesAdmin)

    return admin
