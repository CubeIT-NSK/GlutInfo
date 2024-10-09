from typing import Optional, List
from datetime import date

from sqlalchemy import Integer, ForeignKey, Date, Text
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

    messages: Mapped[Optional[List['Messages']]] = relationship(
        back_populates='chat'
    )


class Messages(Base):
    '''
    Model for Chat.
    '''

    chat_id: Mapped[int] = mapped_column(Integer, ForeignKey('chats.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    message_date: Mapped[Optional[date]] = mapped_column(Date)
    text: Mapped[str] = mapped_column(Text)
    chat: Mapped[Chats] = relationship(
        back_populates='messages'
    )
    sender: Mapped[User] = relationship(
        back_populates='messages'
    )