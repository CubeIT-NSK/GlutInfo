from typing import Optional

from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.db import Base
from app.models.user import User


class Chats(Base):
    '''
    Model for Chat.
    '''

    messages: Mapped[Optional['Messages']] = relationship(
        back_populates='chat'
    )


class Messages(Base):
    '''
    Model for Chat.
    '''

    chat_id: Mapped[int] = mapped_column(Integer, ForeignKey('chats.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))

    chat: Mapped[Chats] = relationship(
        back_populates='messages'
    )
    sender: Mapped[User] = relationship(
        back_populates='messages'
    )