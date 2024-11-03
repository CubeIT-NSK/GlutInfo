from fastapi import APIRouter

from app.api.endpoints import (
    user_router,
    consultant_router,
    patient_router
)

main_router = APIRouter(prefix='/api/v1')

main_router.include_router(user_router)

main_router.include_router(
    consultant_router,
    prefix='/consultants',
    tags=['Consultants']
)

main_router.include_router(
    patient_router,
    prefix='/patients',
    tags=['Patients']
)
