from datetime import date, time

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.consultant import ConsultantDB
from app.schemas.service import ServiceDB


class RecordCreate(BaseModel):
    rec_date: date = Field(
        ...,
        title='Дата записи',
    )
    rec_time: time = Field(
        ...,
        title='Время записи',
    )
    consultant_id: int = Field(
        ...,
        title='ID Консультанта',
    )
    service_id: int = Field(
        ...,
        title='ID Услуги',
    )

    model_config = ConfigDict(
        extra='forbid'
    )


class RecordDB(BaseModel):
    id: int
    rec_date: date = Field(
        ...,
        title='Дата записи',
    )
    rec_time: time = Field(
        ...,
        title='Время записи',
    )
    consultant: ConsultantDB
    service: ServiceDB

    model_config = ConfigDict(
        from_attributes=True
    )
