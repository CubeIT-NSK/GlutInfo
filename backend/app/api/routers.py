from fastapi import APIRouter

from app.api.endpoints import (
    user_router,
    consultant_router
)

main_router = APIRouter()

main_router.include_router(user_router)

main_router.include_router(
    consultant_router,
    prefix='/consultants',
    tags=['Consultants']
)
