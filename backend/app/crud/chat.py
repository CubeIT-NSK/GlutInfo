from sqlalchemy import select, update, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload  # joinedload,

from app.crud.base import CRUDBase
from app.models.chat import (
    Chats,
    Messages,
    ReadStatus
    )
from app.models.user import User
from app.schemas.chat import MessageCreate


class CRUDChats(CRUDBase):
    ''''''
    async def create_chat(
            self,
            session: AsyncSession,
            initiator_user: User,
            recipient_user: User
    ) -> Chats:
        chat = Chats()
        chat.users.append(initiator_user)
        chat.users.append(recipient_user)
        session.add(chat)
        await session.flush()

        # make empty read statuses for both users last_read_message_id = 0
        initiator_read_status = ReadStatus(
            chat_id=chat.id,
            user_id=initiator_user.id,
            read_status=True
            )
        recipient_read_status = ReadStatus(
            chat_id=chat.id,
            user_id=recipient_user.id,
            read_status=False
            )
        session.add_all([initiator_read_status, recipient_read_status])
        await session.commit()

        return chat

    async def chat_exists(
            self,
            session: AsyncSession,
            current_user: User,
            recipient_user: User
    ) -> bool:
        db_objs = await session.execute(select(Chats.id).where(
            and_(
                Chats.users.contains(current_user),
                Chats.users.contains(recipient_user),
            )
        ))
        existing_chat = db_objs.scalar_one_or_none()
        return existing_chat is not None

    async def get_user_by_id(
        self,
        user_id: int,
        session: AsyncSession,
    ):
        db_objs = await session.execute(
            select(User).where(
                User.id == user_id
                )
            )
        return db_objs.scalars().first()

    async def get_chat_by_id(
        self,
        session: AsyncSession,
        chat_id: int
    ):
        db_objs = await session.execute(
               select(Chats).where(Chats.id == chat_id)
               .options(
                    selectinload(Chats.messages),
                    selectinload(Chats.users),
                    selectinload(Chats.read_statuses)
                    )
          )
        chat: Chats | None = db_objs.scalar_one_or_none()

        return chat

    async def get_user_chats(
        self,
        session: AsyncSession,
        user: User
    ):
        db_objs = await session.execute(
            select(Chats)
            .where(
                and_(
                    Chats.users.contains(user),
                )
            )
            .options(
                selectinload(Chats.users),
                selectinload(Chats.read_statuses)
                )
        )
        chats: list[Chats] = db_objs.scalars().all()

        return chats

    async def get_chat_messages(
        self,
        session: AsyncSession,
        user_id: int,
        chat: Chats,
    ) -> tuple[list[Chats], bool, Messages | None]:
        query = (
            select(Messages)
            .where(Messages.chat_id == chat.id)
            .order_by(Messages.message_date.desc())
            .options(
                selectinload(Messages.sender),
                selectinload(Messages.chat)
            )
        )
        result = await session.execute(query)
        messages = result.scalars().all()
        print(messages[0].text)
        session.commit()
        return messages

    async def update_messages(
        self,
        session: AsyncSession,
        user_id: int
    ):
        await session.execute(
            update(Messages).
            where(Messages.sender_id != user_id).
            values(read_status=True)
        )
        # await session.commit()

    async def send_message(
        self,
        session: AsyncSession,
        chat: Chats,
        current_user: User,
        new_message: MessageCreate
    ):
        for r in chat.read_statuses:
            if r.user_id == current_user.id:
                r.last_read_message_id = True
            else:
                r.last_read_message_id = False

        message = Messages(
            chat_id=new_message.chat_id,
            sender_id=current_user.id,
            message_date=new_message.message_date,
            text=new_message.text,
            read_status=False
        )
        session.add(message)
        # await session.flush()
        # db_objs = await session.execute(
        #     select(Chats.read_statuses).where(
        #         Chats.id == chat.id
        #     )
        # )
        # result: List[ReadStatus] = db_objs.fetchall()

        await session.commit()
        return message


class CRUDMessages(CRUDBase):
    ''''''


chats_crud = CRUDChats(Chats)
