from fastapi_storages.integrations.sqlalchemy import ImageType as _ImageType
from fastapi_storages.integrations.sqlalchemy import FileType as _FileType
from fastapi_storages import FileSystemStorage
from pathlib import Path


class ImageType(_ImageType):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(
            storage=FileSystemStorage(path=Path(__file__).parent / 'image'),
            *args,
            **kwargs
        )


class FileType(_FileType):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(
            storage=FileSystemStorage(path=Path(__file__).parent / 'files'),
            *args,
            **kwargs
        )
