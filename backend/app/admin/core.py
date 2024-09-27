import contextlib

from starlette.requests import Request
from fastapi.security import OAuth2PasswordRequestForm
from sqladmin import ModelView, Admin
from sqladmin.authentication import AuthenticationBackend

from app.core.db import engine
from app.models.user import User, Patients, Consultants
from app.admin.views.viewsEvents import (
    OrganizatorsAdmin,
    EventsAdmin,
    EventOrganizatorsAdmin
)
from app.admin.views.viewsOthers import (
    HistoriesAdmin,
    PhotoGalleryAdmin,
    CooperationsAdmin,
    NewslettersAdmin,
    ReviewsAdmin,
    PlacesAdmin
)
from app.admin.views.viewsProjects import (
    ProjectsOrganizatorsAdmin,
    ProjectsAdmin,
    DocumentsAdmin,
    ProjectsDocumentsAdmin
)
from app.core.user import get_async_session, get_user_db, get_user_manager


get_async_session_context = contextlib.asynccontextmanager(get_async_session)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


class UserAdmin(ModelView, model=User):
    can_create = False
    can_edit = False
    column_list = [User.id,
                   User.name,
                   User.surname,
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
                             User.hashed_password
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


class PatientAdmin(ModelView, model=Patients):
    name_plural = Patients.__tablename__.title()

    column_list = [Patients.id,
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


class ConsultantAdmin(ModelView, model=Consultants):
    name_plural = Consultants.__tablename__.title()
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


def create_admin_core(app):
    authentication_backend = AdminAuth(secret_key="supersecretkey")
    admin = Admin(
        app=app,
        engine=engine,
        # authentication_backend=authentication_backend
    )

    admin.add_view(UserAdmin)
    admin.add_view(PatientAdmin)
    admin.add_view(ConsultantAdmin)

    admin.add_view(OrganizatorsAdmin)
    admin.add_view(EventOrganizatorsAdmin)
    admin.add_view(EventsAdmin)

    admin.add_view(ProjectsOrganizatorsAdmin)
    admin.add_view(ProjectsAdmin)
    admin.add_view(DocumentsAdmin)
    admin.add_view(ProjectsDocumentsAdmin)

    admin.add_view(HistoriesAdmin)
    admin.add_view(PhotoGalleryAdmin)
    admin.add_view(CooperationsAdmin)
    admin.add_view(NewslettersAdmin)
    admin.add_view(ReviewsAdmin)
    admin.add_view(PlacesAdmin)

    return admin
