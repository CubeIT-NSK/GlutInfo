"""Импорты класса Base и всех моделей для Alembic."""
from app.core.db import Base  # noqa
from app.models import ( # noqa
    User,
    Consultants,
    Patients,
    Services,
    Records,
    Schedule,
    EventOrganizators,
    ProjectsOrganizators,
    Projects,
    Documents,
    ProjectsDocuments,
    Histories,
    PhotoGallery,
    Cooperations,
    Newsletters,
    Reviews,
    Places
)

# Events,