from sqladmin import ModelView

from app.models.admin.events import (
    Organizators,
    Events,
    EventOrganizators
)


class OrganizatorsAdmin(ModelView, model=Organizators):
    name_plural = Organizators.__tablename__.title()
    category = "Events"
    column_list = [Organizators.id,
                   Organizators.fio,
                   Organizators.role,
                   Organizators.description,
                   ]
    column_searchable_list = [Organizators.fio,
                              Organizators.role,
                              ]
    # form_excluded_columns = [Organizators.event_organizators,
    #                          Organizators.project_organizator
    #                          ]


class EventsAdmin(ModelView, model=Events):
    name_plural = Events.__tablename__.title()
    category = "Events"
    column_list = [Events.id,
                   Events.title,
                   Events.date_event,
                   Events.finished,
                   Events.main_image,
                   Events.link,
                   Events.event_format,
                   Events.place,
                #    Events.event_organizator
                   ]
    column_searchable_list = [Events.place,
                              Events.date_event,
                              Events.event_format,
                            #   Events.event_organizator
                              ]
    column_sortable_list = [Events.finished,
                            ]
    # form_excluded_columns = [Events.event_organizator
    #                          ]


class EventOrganizatorsAdmin(ModelView, model=EventOrganizators,):
    name_plural = "Event Organizators"
    category = "Events"
    column_list = [EventOrganizators.id,
                   EventOrganizators.event_id,
                   EventOrganizators.organizator_id,
                #    EventOrganizators.event,
                #    EventOrganizators.organizator,
                   ]
    form_columns = [EventOrganizators.event_id,
                   EventOrganizators.organizator_id,]
    # column_searchable_list = [EventOrganizators.event_id,
    #                           EventOrganizators.organizator_id,
                            #   EventOrganizators.event,
                            #   EventOrganizators.organizator,
                              # ]
