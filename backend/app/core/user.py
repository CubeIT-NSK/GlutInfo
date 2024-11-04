from typing import Optional, Union

from fastapi import Depends, Request, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_users import (
    BaseUserManager, FastAPIUsers, IntegerIDMixin, InvalidPasswordException
)
from fastapi_users.authentication import (
    AuthenticationBackend, BearerTransport, JWTStrategy
)
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.db import get_async_session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.constants import (
    TOKEN_LIVETIME,
    MIN_PASSWORD_LENGTH,
)
from app.services.fastMail import EmailSchema, send_email_task


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


bearer_transport = BearerTransport(tokenUrl='api/v1/auth/jwt/login')


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.secret, lifetime_seconds=TOKEN_LIVETIME)


auth_backend = AuthenticationBackend(
    name='jwt',
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    verification_token_secret = settings.verification_token_secret
    verification_token_lifetime_seconds = (
        settings.verification_token_lifetime_seconds
    )

    async def validate_password(
        self,
        password: str,
        user: Union[UserCreate, User],
    ) -> None:
        if len(password) < MIN_PASSWORD_LENGTH:
            raise InvalidPasswordException(
                reason=(f'Password should be at least'
                        f'{MIN_PASSWORD_LENGTH} characters')
            )
        if user.email in password:
            raise InvalidPasswordException(
                reason='Password should not contain e-mail'
            )

    async def on_after_register(
        self, user: User, request: Optional[Request] = None
    ):
        print(f'Пользователь {user.email} зарегистрирован.')

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        await send_email_task(
            EmailSchema(
                email=user.email,
                subject='От Глютен.ИНФО',
                body={
                    'title': 'Ваш токен для верификации аккаунта',
                    'message': token
                }
            )
        )

    async def authenticate(self, credentials: OAuth2PasswordRequestForm):
        user = await super().authenticate(credentials)
        if user and user.role == 'consultant' and user.consultant:
            if not user.consultant.is_accepted:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail='Your consultant account is not accepted'
                )
        return user


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)


current_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)
