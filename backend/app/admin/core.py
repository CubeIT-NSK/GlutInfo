import contextlib

from starlette.requests import Request
from fastapi.security import OAuth2PasswordRequestForm
from sqladmin import ModelView, Admin
from sqladmin.authentication import AuthenticationBackend

from app.core.db import engine
from app.models.user import User, Patients, Consultants
from app.core.user import get_async_session, get_user_db, get_user_manager


get_async_session_context = contextlib.asynccontextmanager(get_async_session)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


class UserAdmin(ModelView, model=User):
    form_ajax_refs = {
        'patient': {
            'fields': ('address', 'education', 'working', 'position'),
            'order_by': 'id'
        }
    }


class PatientAdmin(ModelView, model=Patients):
    ...


class ConsultantAdmin(ModelView, model=Consultants):
    ...


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
        authentication_backend=authentication_backend
    )

    admin.add_view(UserAdmin)
    admin.add_view(PatientAdmin)
    admin.add_view(ConsultantAdmin)

    return admin
