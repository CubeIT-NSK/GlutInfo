from app.schemas.schedule import (
    ScheduleCreate,
)


def append_unselected_days(
    list_schedule: list[ScheduleCreate],
) -> None:
    unselect_days = {'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'}

    for schedule_model in list_schedule:
        schedule = schedule_model.model_dump()
        unselect_days.remove(schedule['day_week'])
    for day in unselect_days:
        day_off = ScheduleCreate(
            day_week=day,
            start_hour=None,
            end_hour=None,
            working=False,
        )
        list_schedule.append(day_off)
