import inspect
import os
import re
from datetime import date
from pathlib import Path
from typing import Any, Iterable, List, Optional
from uuid import uuid4

from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import TextAreaField, IntegerField, FileField, MultipleFileField
from sqladmin import ModelView
from starlette.requests import Request
from sqlalchemy import select
from sqlalchemy.sql.expression import Select

from app.models.consultant_extended import (
    ConsultantCategory,
    ConsultantExtended,
    ConsultantService,
    ConsultantReview
)


STATIC_ROOT = Path(__file__).resolve().parents[2] / "static"
STATIC_ROOT_RESOLVED = STATIC_ROOT.resolve()
CONSULTANT_MEDIA_BASE = Path("images") / "consultants"


class ConsultantCategoryAdmin(ModelView, model=ConsultantCategory):
    name = "Категории консультантов"
    name_plural = "Категории консультантов"
    icon = "fa-solid fa-tags"
    
    column_list = [
        ConsultantCategory.id,
        ConsultantCategory.name_ru,
        ConsultantCategory.name_en,
        ConsultantCategory.tag,
        ConsultantCategory.slug,
        ConsultantCategory.is_active
    ]
    
    column_details_list = [
        ConsultantCategory.id,
        ConsultantCategory.name_ru,
        ConsultantCategory.name_en,
        ConsultantCategory.tag,
        ConsultantCategory.slug,
        ConsultantCategory.is_active
    ]
    
    form_columns = [
        "name_ru",
        "name_en", 
        "tag",
        "slug",
        "is_active"
    ]
    column_labels = form_labels = {
        "id": "ID",
        "name_ru": "Название (RU)",
        "name_en": "Название (EN)",
        "tag": "Тэг привязки",
        "slug": "Слаг",
        "is_active": "Активна",
    }


class ConsultantServiceAdmin(ModelView, model=ConsultantService):
    name = "Услуги консультантов"
    name_plural = "Услуги консультантов"
    icon = "fa-solid fa-list"
    
    column_list = [
        ConsultantService.id,
        ConsultantService.tag,
        ConsultantService.title_ru,
        ConsultantService.price,
        ConsultantService.duration_minutes,
        ConsultantService.is_active
    ]
    
    column_details_list = [
        ConsultantService.id,
        ConsultantService.tag,
        ConsultantService.title_ru,
        ConsultantService.title_en,
        ConsultantService.description_ru,
        ConsultantService.description_en,
        ConsultantService.price,
        ConsultantService.duration_minutes,
        ConsultantService.is_active,
        ConsultantService.sort_order
    ]
    
    form_columns = [
        "tag",
        "title_ru",
        "title_en",
        "description_ru", 
        "description_en",
        "price",
        "duration_minutes",
        "is_active",
        "sort_order"
    ]
    column_labels = form_labels = {
        "id": "ID",
        "tag": "Тэг привязки",
        "title_ru": "Название (RU)",
        "title_en": "Название (EN)",
        "description_ru": "Описание (RU)",
        "description_en": "Описание (EN)",
        "price": "Стоимость",
        "duration_minutes": "Длительность (мин)",
        "is_active": "Активна",
        "sort_order": "Порядок сортировки",
    }
    form_overrides = {
        "description_ru": TextAreaField,
        "description_en": TextAreaField,
        "price": IntegerField,
        "duration_minutes": IntegerField,
    }


class ConsultantReviewAdmin(ModelView, model=ConsultantReview):
    name = "Отзывы консультантов"
    name_plural = "Отзывы консультантов"
    icon = "fa-solid fa-star"
    
    column_list = [
        ConsultantReview.id,
        ConsultantReview.tag,
        ConsultantReview.reviewer_name,
        ConsultantReview.rating,
        ConsultantReview.review_date,
        ConsultantReview.is_published
    ]
    
    column_details_list = [
        ConsultantReview.id,
        ConsultantReview.tag,
        ConsultantReview.reviewer_name,
        ConsultantReview.rating,
        ConsultantReview.review_date,
        ConsultantReview.review_text_ru,
        ConsultantReview.review_text_en,
        ConsultantReview.is_published,
        ConsultantReview.is_featured
    ]
    
    form_columns = [
        "tag",
        "reviewer_name",
        "rating",
        "review_date",
        "review_text_ru",
        "review_text_en",
        "is_published",
        "is_featured"
    ]
    column_labels = form_labels = {
        "id": "ID",
        "tag": "Тэг привязки",
        "reviewer_name": "Имя автора",
        "rating": "Оценка",
        "review_date": "Дата отзыва",
        "review_text_ru": "Текст (RU)",
        "review_text_en": "Текст (EN)",
        "is_published": "Опубликован",
        "is_featured": "Выведен в приоритет",
    }


class ConsultantExtendedAdmin(ModelView, model=ConsultantExtended):
    name = "Консультанты"
    name_plural = "Консультанты"
    icon = "fa-solid fa-user-doctor"
    
    column_list = [
        ConsultantExtended.id,
        ConsultantExtended.full_name_ru,
        ConsultantExtended.category_tags,
        ConsultantExtended.work_experience,
        ConsultantExtended.scientific_works_count,
        ConsultantExtended.is_active,
        ConsultantExtended.is_featured
    ]

    column_details_list = [
        ConsultantExtended.id,
        ConsultantExtended.full_name_ru,
        ConsultantExtended.full_name_en,
        ConsultantExtended.category_tags,
        ConsultantExtended.service_tags,
        ConsultantExtended.review_tags,
        ConsultantExtended.photo,
        ConsultantExtended.description1_ru,
        ConsultantExtended.description1_en,
        ConsultantExtended.description2_ru,
        ConsultantExtended.description2_en,
        ConsultantExtended.education_ru,
        ConsultantExtended.education_en,
        ConsultantExtended.work_experience,
        ConsultantExtended.scientific_works_count,
        ConsultantExtended.video_presentation,
        ConsultantExtended.photo_gallery,
        ConsultantExtended.documents,
        ConsultantExtended.is_active,
        ConsultantExtended.is_featured,
        ConsultantExtended.created_at,
        ConsultantExtended.updated_at,
    ]
    
    form_columns = [
        "full_name_ru",
        "full_name_en",
        "category_tags",
        "service_tags",
        "review_tags",
        "photo",
        "description1_ru",
        "description1_en",
        "description2_ru",
        "description2_en",
        "education_ru",
        "education_en",
        "work_experience",
        "scientific_works_count",
        "video_presentation",
        "photo_gallery",
        "documents",
        "is_active",
        "is_featured"
    ]

    form_ajax_refs = {}
    
    # Custom form fields for better UX
    form_overrides = {
        "description1_ru": TextAreaField,
        "description1_en": TextAreaField,
        "description2_ru": TextAreaField,
        "description2_en": TextAreaField,
        "education_ru": TextAreaField,
        "education_en": TextAreaField,
        "work_experience": IntegerField,
        "scientific_works_count": IntegerField,
        "photo": FileField,
        "video_presentation": FileField,
        "photo_gallery": MultipleFileField,
        "documents": MultipleFileField,
        "category_tags": TextAreaField,
        "service_tags": TextAreaField,
        "review_tags": TextAreaField,
    }

    form_args = {
        "work_experience": {
            "validators": [NumberRange(min=0, max=100)]
        },
        "scientific_works_count": {
            "validators": [NumberRange(min=0, max=10000)]
        },
        "full_name_ru": {
            "validators": [DataRequired(), Length(max=255)]
        },
        "full_name_en": {
            "validators": [DataRequired(), Length(max=255)]
        },
        "category_tags": {
            "render_kw": {
                "rows": 3,
                "placeholder": "Укажите тэги категорий через запятую или с новой строки"
            }
        },
        "service_tags": {
            "render_kw": {
                "rows": 3,
                "placeholder": "Укажите тэги услуг через запятую или с новой строки"
            }
        },
        "review_tags": {
            "render_kw": {
                "rows": 3,
                "placeholder": "Укажите тэги отзывов через запятую или с новой строки"
            }
        },
    }

    column_labels = {
        "id": "ID",
        "full_name_ru": "ФИО (RU)",
        "full_name_en": "ФИО (EN)",
        "category_tags": "Категории (тэги)",
        "service_tags": "Услуги (тэги)",
        "review_tags": "Отзывы (тэги)",
        "photo": "Фото",
        "description1_ru": "Описание 1 (RU)",
        "description1_en": "Описание 1 (EN)",
        "description2_ru": "Описание 2 (RU)",
        "description2_en": "Описание 2 (EN)",
        "education_ru": "Образование (RU)",
        "education_en": "Образование (EN)",
        "work_experience": "Опыт работы (лет)",
        "scientific_works_count": "Научных работ",
        "video_presentation": "Видео-презентация",
        "photo_gallery": "Фотогалерея",
        "documents": "Документы",
        "is_active": "Активен",
        "is_featured": "Выведен в приоритет",
        "created_at": "Создан",
        "updated_at": "Обновлён",
    }
    form_labels = column_labels

    def list_query(self, request: Request) -> Select:
        querry = select(ConsultantExtended).order_by(
            ConsultantExtended.is_featured.desc(),
            ConsultantExtended.full_name_ru.asc()
        )
        return querry

    column_formatters = {
        "category_tags": lambda model, attr: ", ".join(getattr(model, "category_tags", []) or []),
        "service_tags": lambda model, attr: ", ".join(getattr(model, "service_tags", []) or []),
        "review_tags": lambda model, attr: ", ".join(getattr(model, "review_tags", []) or []),
    }

    async def scaffold_form(self):
        return await super().scaffold_form()

    async def on_form_prefill(self, form, model):
        if hasattr(form, "category_tags"):
            form.category_tags.data = self._tags_to_text(getattr(model, "category_tags", []))
        if hasattr(form, "service_tags"):
            form.service_tags.data = self._tags_to_text(getattr(model, "service_tags", []))
        if hasattr(form, "review_tags"):
            form.review_tags.data = self._tags_to_text(getattr(model, "review_tags", []))
        if hasattr(form, 'photo'):
            form.photo.data = None
        if hasattr(form, 'video_presentation'):
            form.video_presentation.data = None
        if hasattr(form, 'photo_gallery'):
            form.photo_gallery.data = []
        if hasattr(form, 'documents'):
            form.documents.data = []
        return await super().on_form_prefill(form, model)

    async def on_model_change(self, data: dict, model: Any,
                               is_created: bool, request: Request):
        photo_file = data.pop('photo', None)
        video_file = data.pop('video_presentation', None)
        gallery_files = data.pop('photo_gallery', None)
        document_files = data.pop('documents', None)

        data['photo'] = await self._process_single_file(
            photo_file,
            'photos',
            current_value=None if is_created else getattr(model, 'photo', None)
        )

        data['video_presentation'] = await self._process_single_file(
            video_file,
            'videos',
            current_value=None if is_created else getattr(model, 'video_presentation', None)
        )

        data['photo_gallery'] = await self._process_multiple_files(
            gallery_files,
            'gallery',
            current_values=[] if is_created else list(getattr(model, 'photo_gallery', []) or [])
        )

        data['documents'] = await self._process_multiple_files(
            document_files,
            'documents',
            current_values=[] if is_created else list(getattr(model, 'documents', []) or [])
        )

        if is_created and not data.get('created_at'):
            data['created_at'] = date.today()

        data['category_tags'] = self._parse_tags(data.get('category_tags'))
        data['service_tags'] = self._parse_tags(data.get('service_tags'))
        data['review_tags'] = self._parse_tags(data.get('review_tags'))

        return await super().on_model_change(data, model, is_created, request)

    def _tags_to_text(self, tags: Optional[List[str]]) -> str:
        if not tags:
            return ""
        return "\n".join(tags)

    def _parse_tags(self, raw_value: Any) -> List[str]:
        if not raw_value:
            return []
        if isinstance(raw_value, list):
            candidates = raw_value
        else:
            text = str(raw_value)
            text = text.replace(';', '\n')
            candidates = re.split(r'[\n,]+', text)
        cleaned: List[str] = []
        seen: set[str] = set()
        for item in candidates:
            tag = (item or "").strip()
            if not tag:
                continue
            if tag in seen:
                continue
            seen.add(tag)
            cleaned.append(tag)
        return cleaned

    async def _process_single_file(
        self,
        file_obj,
        folder: str,
        current_value: Optional[str] = None
    ) -> Optional[str]:
        file_data = await self._extract_file(file_obj)
        if not file_data:
            return current_value

        filename, content = file_data
        return self._save_media_file(content, folder, filename, current_value)

    async def _process_multiple_files(
        self,
        files: Optional[Iterable],
        folder: str,
        current_values: Optional[List[str]] = None
    ) -> List[str]:
        existing = current_values or []
        if not files:
            return existing

        if not isinstance(files, (list, tuple)):
            files = [files]

        uploaded: List[str] = []
        for file_obj in files:
            file_data = await self._extract_file(file_obj)
            if not file_data:
                continue
            filename, content = file_data
            saved_path = self._save_media_file(content, folder, filename)
            uploaded.append(saved_path)

        combined = existing + uploaded
        deduped: List[str] = []
        seen = set()
        for item in combined:
            if not item or item in seen:
                continue
            seen.add(item)
            deduped.append(item)

        return deduped

    async def _extract_file(self, file_obj) -> Optional[tuple[str, bytes]]:
        if not file_obj:
            return None

        filename = getattr(file_obj, 'filename', None)
        if not filename:
            return None

        read_method = getattr(file_obj, 'read', None)
        content: Optional[bytes] = None

        if read_method and inspect.iscoroutinefunction(read_method):
            content = await read_method()
        elif read_method and callable(read_method):
            content = read_method()
        else:
            stream = getattr(file_obj, 'file', None)
            if stream:
                stream.seek(0)
                content = stream.read()

        if content is None:
            return None

        if isinstance(content, str):
            content = content.encode('utf-8')

        return filename, content

    def _save_media_file(
        self,
        content: bytes,
        folder: str,
        filename: str,
        current_value: Optional[str] = None
    ) -> str:
        relative_path = self._generate_object_name(folder, filename)
        absolute_path = (STATIC_ROOT_RESOLVED / relative_path)
        absolute_path.parent.mkdir(parents=True, exist_ok=True)
        with absolute_path.open("wb") as media_file:
            media_file.write(content)
        if current_value:
            self._remove_media_file(current_value)

        return relative_path.as_posix()

    def _normalize_media_path(self, stored_value: str) -> Optional[Path]:
        if not stored_value:
            return None
        cleaned = stored_value.strip()
        if not cleaned:
            return None
        cleaned = cleaned.lstrip("/")
        if cleaned.startswith("static/"):
            cleaned = cleaned[len("static/"):]
        candidate = Path(cleaned)
        try:
            absolute_path = (STATIC_ROOT_RESOLVED / candidate)
            _ = absolute_path.resolve().relative_to(STATIC_ROOT_RESOLVED)
        except (ValueError, RuntimeError):
            return None
        return candidate

    def _remove_media_file(self, stored_value: str) -> None:
        try:
            candidate = self._normalize_media_path(stored_value)
            if candidate is None:
                return
            absolute_path = (STATIC_ROOT_RESOLVED / candidate)
            if absolute_path.is_file():
                absolute_path.unlink()
        except Exception:
            # Ошибки удаления не критичны для работы админки
            pass

    def _generate_object_name(self, folder: str, filename: str) -> Path:
        _, ext = os.path.splitext(filename)
        ext = ext.lower()
        return CONSULTANT_MEDIA_BASE / folder / f"{uuid4().hex}{ext}"
