from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.schemas.chat import (
    MessageCreate,
)
from app.crud.chat import chats_crud
from app.models.user import User
from app.core.user import (
    current_user
)
router = APIRouter()


@router.post(
        "/create_chat",
        response_model=None,
        summary="Create a direct chat"
)
async def create_chat_view(
    recipient_user_id: int,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user),
):
    '''
    Create chat between current user and recipient user
    '''

    if recipient_user_id == user.id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You can't create chat with yourself"
        )

    recipient_user = await chats_crud.get_user_by_id(
        recipient_user_id,
        session
    )
    if recipient_user is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User doesn't exist"
        )
    if await chats_crud.chat_exists(session, user, recipient_user):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Chat with recipient user - {recipient_user.id} exists "
        )

    chat = await chats_crud.create_chat(
        session,
        user,
        recipient_user
    )
    return chat


@router.get(
        "/{chat_id}/messages/",
        summary="Get user's chat messages"
)
async def get_user_messages_in_chat(
    chat_id: int,
    session: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_user),
):
    '''
    Get all messages from current chat
    '''
    chat = await chats_crud.get_chat_by_id(session, chat_id)

    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat with provided guid does not exist"
        )

    if current_user not in chat.users:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You don't have access to this chat"
        )
    for r in chat.read_statuses:
        if r.user_id == current_user.id:
            r.read_status = True

    return await chats_crud.get_chat_messages(session, chat)


@router.patch(
        "/{chat_id}/messages/",
        summary="Update read_status"
)
async def update_read_status(
    chat_id: int,
    session: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_user),
):
    chat = await chats_crud.get_chat_by_id(session, chat_id)

    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat with provided guid does not exist"
        )

    if current_user not in chat.users:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You don't have access to this chat"
        )
    for r in chat.read_statuses:
        if r.user_id == current_user.id:
            r.read_status = True

    return await chats_crud.update_messages(session, current_user.id)


@router.get(
    "/",
    summary="Get user's chats"
)
async def get_user_chats_view(
    session: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_user),
):
    '''
    Get all chats of current user
    '''

    return await chats_crud.get_user_chats(session, current_user)


@router.post(
    '/{chat_id}/send_message',
    summary='Send message to chat',
)
async def send_message(
    chat_id: int,
    message: MessageCreate,
    session: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_user),
):
    '''
    Send message to chat by chat_id
    '''

    chat = await chats_crud.get_chat_by_id(session, chat_id)

    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat does not exist"
        )
    if current_user not in chat.users:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You don't have access to this chat"
        )
    return await chats_crud.send_message(session, chat, current_user, message)
