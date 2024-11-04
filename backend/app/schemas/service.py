from datetime import timedelta

from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import (
    DEFAULT_MIN_CHAR,
    MIN_PRICE,
)


class ServiceCreate(BaseModel):
    name: str = Field(
        ...,
        title='Название услуги',
        min_length=DEFAULT_MIN_CHAR,
    )
    description: str = Field(
        ...,
        title='Описание услуги',
        min_length=DEFAULT_MIN_CHAR,
    )
    price: int = Field(
        ...,
        title='Цена услуги',
        ge=MIN_PRICE,
    )
    duration: timedelta = Field(
        ...,
        title='Длительность услуги',
    )

    model_config = ConfigDict(
        extra='forbid'
    )


class ServiceDB(ServiceCreate):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )
