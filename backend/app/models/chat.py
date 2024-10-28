from typing import Optional, List
from datetime import date

from sqlalchemy import Integer, ForeignKey, Date, Text, Boolean
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.db import Base
from app.models.user import User


class ChatParticipant(Base):
    '''
    Model for chat participants
    '''
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("user.id"),
        )
    chat_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("chats.id"),
        )


class Chats(Base):
    '''
    Model for Chat.
    '''
    users: Mapped[List["User"]] = relationship(
        secondary='chatparticipant',
        back_populates="chats"
        )
    messages: Mapped[Optional[List['Messages']]] = relationship(
        back_populates='chat'
    )
    read_statuses: Mapped[Optional[List["ReadStatus"]]] = relationship(
        back_populates="chat",
        )


class Messages(Base):
    '''
    Model for Chat.
    '''

    chat_id: Mapped[int] = mapped_column(Integer, ForeignKey('chats.id'))
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))
    message_date: Mapped[Optional[date]] = mapped_column(Date)
    text: Mapped[str] = mapped_column(Text)
    read_status: Mapped[bool] = mapped_column(Boolean)

    chat: Mapped[Chats] = relationship(
        back_populates='messages'
    )
    sender: Mapped[User] = relationship(
        back_populates='messages'
    )


class ReadStatus(Base):

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    read_status: Mapped[bool] = mapped_column(Boolean)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    chat_id: Mapped[int] = mapped_column(ForeignKey("chats.id"))

    # to display unread messages for a user in different chats
    chat: Mapped["Chats"] = relationship(
        back_populates="read_statuses"
        )
    user: Mapped["User"] = relationship(
        back_populates="read_statuses"
        )

    def __str__(self):
        return f"User: {self.user_id}, Message: {self.read_status}"
