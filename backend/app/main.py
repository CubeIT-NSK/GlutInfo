from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.api.routers import main_router
from app.core.config import settings
from app.admin.core import create_admin_core
from app.core.db import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    print("База готова")
    yield


app = FastAPI(title=settings.app_title, lifespan=lifespan)
admin = create_admin_core(app)


app.include_router(main_router)
