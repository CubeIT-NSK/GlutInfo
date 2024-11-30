from pathlib import Path
import logging

from pydantic import EmailStr, BaseModel, Field
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

from app.core.config import settings


class EmailSchema(BaseModel):
    email: EmailStr = Field(...)
    subject: str = Field(...)
    body: dict[str, str] = Field(...)


conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS,
    TEMPLATE_FOLDER=Path(__file__).parent.parent / 'templates' / 'mail',
)

fast_mail = FastMail(config=conf)
logger = logging.getLogger('uvicorn.error')


async def send_email_task(data: EmailSchema):
    message = MessageSchema(
        subject=data.subject,
        recipients=[data.model_dump().get('email')],
        template_body=data.model_dump().get('body'),
        subtype=MessageType.html
    )
    logger.error(settings.MAIL_FROM)
    logger.error(settings.MAIL_USERNAME)
    logger.error(settings.MAIL_PASSWORD)
    logger.error(settings.MAIL_STARTTLS)
    logger.error(settings.MAIL_SSL_TLS)
    await fast_mail.send_message(message,
                                 template_name='mail_verification.html')


async def send_email_to_notify_consultant_accept(data: EmailSchema):
    message = MessageSchema(
        subject=data.subject,
        recipients=[data.model_dump().get('email')],
        template_body=data.model_dump().get('body'),
        subtype=MessageType.html
    )

    await fast_mail.send_message(message,
                                 template_name='mail_send_resume.html')
