from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from fastapi_pagination.utils import disable_installed_extensions_check

from app.api.routers import main_router
from app.core.config import settings
from app.admin.core import create_admin_core


app = FastAPI(
    title=settings.app_title,
    openapi_url="/docs/openapi.json",
)
add_pagination(app)
disable_installed_extensions_check()
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

admin = create_admin_core(app)

app.include_router(main_router)
