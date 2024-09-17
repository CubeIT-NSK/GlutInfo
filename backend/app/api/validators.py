from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.consultant import consultant_crud


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
