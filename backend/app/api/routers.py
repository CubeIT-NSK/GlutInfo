from fastapi import APIRouter

from app.api.endpoints import (
    user_router,
    consultant_router,
    patient_router,
    survey_router,
    feedback_router,
    projects_router,
    events_router,
    chat_router
)

main_router = APIRouter()

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

main_router.include_router(
    survey_router,
    prefix='/survey',
    tags=['Survey']
)

main_router.include_router(
    feedback_router,
    prefix='/feedback',
    tags=['Feedback']
)

main_router.include_router(
    projects_router,
    prefix='/projects',
    tags=['Projects']
)

main_router.include_router(
    events_router,
    prefix='/events',
    tags=['Events']
)

main_router.include_router(
    chat_router,
    prefix='/chat',
    tags=['Chat']
)
