"""Импорты класса Base и всех моделей для Alembic."""
from app.core.db import Base  # noqa
from app.models import User, Consultants, Patients # noqa
from app.models import Services, Records, Schedule # noqa
