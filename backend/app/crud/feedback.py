from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.admin.feedback import (
    PhotoGallery,
    Places,
    Reviews,
    Histories
    )


class CRUDPhotoGallery(CRUDBase):
    ''''''


class CRUDPlaces(CRUDBase):
    ''''''


class CRUDReviews(CRUDBase):
    ''''''


class CRUDHistories(CRUDBase):
    ''''''


photo_gallery_crud = CRUDPhotoGallery(PhotoGallery)
places_crud = CRUDPlaces(Places)
reviews_crud = CRUDReviews(Reviews)
histories_crud = CRUDHistories(Histories)