from sqladmin import ModelView

from app.models.admin_zone.projectsPlusEvents import (
    Organizators,
    Events,
    EventOrganizators
)


class OrganizatorsAdmin(ModelView, model=Organizators):
    column_list = [Organizators.id,
                   Organizators.fio,
                   Organizators.role,
                   Organizators.description,
                   Organizators.event_id
                   ]


class EventsAdmin(ModelView, model=Events):
    column_list = [Events.id,
                   Events.title,
                   Events.date_event,
                   Events.finished,
                   Events.main_image,
                   Events.link,
                   Events.event_format,
                   Events.place,
                   Events.text
                   ]


class EventOrganizatorsAdmin(ModelView, model=EventOrganizators):
    column_list = [EventOrganizators.id,
                   EventOrganizators.event_id,
                   EventOrganizators.organizator_id,
                   ]
