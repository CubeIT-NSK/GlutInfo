from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_title: str = 'Gluten.Info'
    database_url: str = 'sqlite+aiosqlite:///./fastapi.db'
    secret: str = 'SECRET'
    verification_token_secret: str = 'VERIFICATIONSECRET'
    verification_token_lifetime_seconds: int = 10080

    # Mail
    MAIL_USERNAME: str = 'username'
    MAIL_PASSWORD: str = '**********'
    MAIL_FROM: str = 'test@email.com'
    MAIL_PORT: int = 587
    MAIL_SERVER: str = 'mail server'
    MAIL_FROM_NAME: str = 'Desired Name'
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    # S3
    ACCESS_KEY: str = 'accesskeys3'
    SECRET_KEY: str = 'secretkeys3'
    ENDPOINT_URL: str = 'https://s3.ru-1.storage.selcloud.ru'
    BUCKET_NAME: str = 'test-gluten-info'

    model_config = SettingsConfigDict()


settings = Settings()
