from sqladmin import ModelView
# from main import app
from app.models.admin_zone.other import (
    Histories,
    PhotoGallery,
    Cooperations,
    Newsletters,
    Reviews,
    Places
)


class HistoriesAdmin(ModelView, model=Histories):
    column_list = [Histories.id,
                   Histories.text,
                   Histories.name,
                   Histories.surname,
                   Histories.diagnosis
                   ]


class PhotoGalleryAdmin(ModelView, model=PhotoGallery):
    column_list = [PhotoGallery.id,
                   PhotoGallery.image
                   ]


class CooperationsAdmin(ModelView, model=Cooperations):
    column_list = [Cooperations.id,
                   Cooperations.name,
                   Cooperations.phone,
                   ]


class NewslettersAdmin(ModelView, model=Newsletters):
    column_list = [Newsletters.id,
                   Newsletters.name,
                   Newsletters.email,
                   ]


class ReviewsAdmin(ModelView, model=Reviews):
    column_list = [Reviews.id,
                   Reviews.rating,
                   Reviews.name,
                   Reviews.surname,
                   Reviews.review_event,
                   Reviews.consultant,
                   Reviews.text
                   ]


class PlacesAdmin(ModelView, model=Places):
    column_list = [Places.id,
                   Places.place_type,
                   Places.name,
                   Places.description,
                   Places.rating,
                   Places.address,
                   Places.phone,
                   Places.website,
                   ]
