from app.crud.base import CRUDBase
from app.models.admin.events import (
    Events
    )


class CRUDEvents(CRUDBase):
    ''''''


events_crud = CRUDEvents(Events)