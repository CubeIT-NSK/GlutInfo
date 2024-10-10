from fastapi import FastAPI

from app.api.routers import main_router
from app.core.config import settings
from app.admin.core import create_admin_core


app = FastAPI(title=settings.app_title)
admin = create_admin_core(app)


app.include_router(main_router, prefix='/api/v1')
