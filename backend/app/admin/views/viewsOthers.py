from sqladmin import ModelView

from app.models.admin_zone.other import (
    Histories,
    PhotoGallery,
    Cooperations,
    Newsletters,
    Reviews,
    Places
)


class HistoriesAdmin(ModelView, model=Histories):
    name_plural = Histories.__tablename__.title()
    column_list = [Histories.id,
                   Histories.name,
                   Histories.surname,
                   Histories.diagnosis
                   ]
    column_searchable_list = [Histories.surname,
                              Histories.diagnosis
                              ]  


class PhotoGalleryAdmin(ModelView, model=PhotoGallery):
    name_plural = PhotoGallery.__tablename__.title()
    column_list = [PhotoGallery.id,
                #    PhotoGallery.image
                   ]


class CooperationsAdmin(ModelView, model=Cooperations):
    name_plural = Cooperations.__tablename__.title()
    column_list = [Cooperations.id,
                   Cooperations.name,
                   Cooperations.phone,
                   ]
    column_searchable_list = [Cooperations.name,
                              Cooperations.phone
                              ]


class NewslettersAdmin(ModelView, model=Newsletters):
    name_plural = Newsletters.__tablename__.title()
    column_list = [Newsletters.id,
                   Newsletters.name,
                   Newsletters.email,
                   ]
    column_searchable_list = [Newsletters.name,
                              Newsletters.email
                              ]


class ReviewsAdmin(ModelView, model=Reviews):
    name_plural = Reviews.__tablename__.title()
    column_list = [Reviews.id,
                   Reviews.rating,
                   Reviews.name,
                   Reviews.surname,
                   Reviews.review_event,
                   Reviews.consultant,
                   ]
    column_searchable_list = [Reviews.name,
                              Reviews.rating,
                              Reviews.review_event,
                              Reviews.consultant
                              ]
    column_sortable_list = [Reviews.rating,
                            ]


class PlacesAdmin(ModelView, model=Places):
    name_plural = Places.__tablename__.title()
    column_list = [Places.id,
                   Places.place_type,
                   Places.name,
                   Places.rating,
                   Places.address,
                   Places.phone,
                   ]
    column_searchable_list = [Places.place_type,
                              Places.name,
                              Places.phone,
                              Places.address
                              ]
    column_sortable_list = [Places.rating,
                            ]
