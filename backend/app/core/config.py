from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str = 'Gluten.Info'
    database_url: str = 'sqlite+aiosqlite:///./fastapi.db'
    secret: str = 'SECRET'
    verification_token_secret: str = 'VERIFICATIONSECRET'
    verification_token_lifetime_seconds: int = 10080

    MAIL_USERNAME: str = 'username',
    MAIL_PASSWORD: str = '**********',
    MAIL_FROM: str = 'test@email.com',
    MAIL_PORT: int = 587,
    MAIL_SERVER: str = 'mail server',
    MAIL_FROM_NAME: str = 'Desired Name',
    MAIL_STARTTLS: bool = True,
    MAIL_SSL_TLS: bool = False,
    USE_CREDENTIALS: bool = True,
    VALIDATE_CERTS: bool = True

    class Config:
        env_file = '.env'


settings = Settings()
