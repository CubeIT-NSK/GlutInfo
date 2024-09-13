from typing import Optional, Literal, get_args
from datetime import date

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import String, Date, Enum
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base
from app.core.constants import (
    MAX_NAME_CHAR,
    MAX_SURNAME_CHAR,
    MAX_PATRONYMIC_CHAR,
)


Sex = Literal['male', 'female']


class User(SQLAlchemyBaseUserTable[int], Base):
    '''User model.'''

    # id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(MAX_NAME_CHAR))
    surname: Mapped[Optional[str]] = mapped_column(String(MAX_SURNAME_CHAR))
    patronymic: Mapped[Optional[str]] = mapped_column(
        String(MAX_PATRONYMIC_CHAR)
    )
    born_date: Mapped[Optional[date]] = mapped_column(Date)
    sex: Mapped[Optional[Sex]] = mapped_column(Enum(  # Maybe not working
        *get_args(Sex),
        name="sexstatus",
        create_constraint=True,
        validate_strings=True,
    ))
    # phone: Mapped[int] = mapped_column(Integer)
