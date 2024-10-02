from fastapi import HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.consultant import consultant_crud
from app.crud.patient import patient_crud
from app.core.user import current_user
from app.models.user import User


async def check_consultant_duplicate(
    user_id,
    session: AsyncSession,
) -> None:
    consultant = await consultant_crud.get_consultant_by_userid(
        user_id,
        session,
    )
    if consultant is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Consultant with user_id:{user_id} already exist!'
        )


async def check_patient_duplicate(
    user_id,
    session: AsyncSession,
) -> None:
    patient = await patient_crud.get_patient_by_userid(
        user_id,
        session,
    )
    if patient is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Patient with user_id:{user_id} already exist!'
        )


async def current_user_consultant(
        current_user: User = Depends(current_user)
):
    if current_user.role == 'consultant':
        return current_user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail='You haven`t consultant role'
    )


async def current_user_patient(
        current_user: User = Depends(current_user)
):
    if current_user.role == 'patient':
        return current_user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail='You haven`t patient role'
    )
