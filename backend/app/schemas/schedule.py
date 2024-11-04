from typing import Optional
from datetime import time

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.models.record import day_of_week


class ScheduleCreate(BaseModel):
    day_week: day_of_week = Field(
        ...,
        title='День недели',
    )
    start_hour: Optional[time] = Field(
        default=None,
        title='Время начала',
    )
    end_hour: Optional[time] = Field(
        default=None,
        title='Время окончания',
    )
    working: bool = Field(
        ...,
        title='Рабочий день',
    )

    model_config = ConfigDict(
        extra='forbid'
    )

    @model_validator(mode='after')
    def check_time_in_work_day(self) -> 'ScheduleCreate':
        working = self.working
        start_hour = self.start_hour
        end_hour = self.end_hour
        if working and (start_hour is None or end_hour is None):
            raise ValueError('working hours in work day not specified')
        return self


class ScheduleUpdate(ScheduleCreate):
    ...


class ScheduleDB(ScheduleCreate):
    id: int
    consultant_id: int

    model_config = ConfigDict(
        from_attributes=True
    )
