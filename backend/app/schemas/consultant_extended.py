from typing import List, Optional
from datetime import date
from pydantic import BaseModel, Field


class ConsultantCategoryResponse(BaseModel):
    id: int
    name_ru: str
    name_en: str
    slug: str
    tag: str
    is_active: bool

    class Config:
        from_attributes = True


class ConsultantCategoryCreate(BaseModel):
    name_ru: str = Field(..., max_length=255)
    name_en: Optional[str] = Field(None, max_length=255)
    slug: Optional[str] = None
    tag: Optional[str] = None


class ConsultantServiceResponse(BaseModel):
    id: int
    tag: str
    consultant_id: Optional[int]
    title_ru: str
    title_en: str
    description_ru: str
    description_en: str
    price: Optional[int] = None
    duration_minutes: Optional[int] = None
    is_active: bool
    sort_order: int

    class Config:
        from_attributes = True


class ConsultantReviewResponse(BaseModel):
    id: int
    tag: str
    consultant_id: Optional[int]
    reviewer_name: str
    rating: int = Field(..., ge=1, le=5)
    review_date: date
    review_text_ru: str
    review_text_en: str
    is_published: bool
    is_featured: bool

    class Config:
        from_attributes = True


class ConsultantExtendedResponse(BaseModel):
    id: int
    full_name_ru: str
    full_name_en: str
    photo: Optional[str] = None
    description1_ru: Optional[str] = None
    description1_en: Optional[str] = None
    description2_ru: Optional[str] = None
    description2_en: Optional[str] = None
    education_ru: Optional[str] = None
    education_en: Optional[str] = None
    work_experience: Optional[int] = None
    scientific_works_count: Optional[int] = None
    video_presentation: Optional[str] = None
    photo_gallery: Optional[List[str]] = None
    documents: Optional[List[str]] = None
    category_tags: Optional[List[str]] = None
    service_tags: Optional[List[str]] = None
    review_tags: Optional[List[str]] = None
    is_active: bool
    is_featured: bool
    created_at: date
    updated_at: Optional[date] = None
    
    # Related data
    categories: List[ConsultantCategoryResponse] = []
    services: Optional[List[ConsultantServiceResponse]] = None
    reviews: Optional[List[ConsultantReviewResponse]] = None

    class Config:
        from_attributes = True


# Create/Update schemas
class ConsultantExtendedCreate(BaseModel):
    full_name_ru: str = Field(..., max_length=255)
    full_name_en: str = Field(..., max_length=255)
    category_tags: Optional[List[str]] = None
    service_tags: Optional[List[str]] = None
    review_tags: Optional[List[str]] = None
    photo: Optional[str] = None
    description1_ru: Optional[str] = None
    description1_en: Optional[str] = None
    description2_ru: Optional[str] = None
    description2_en: Optional[str] = None
    education_ru: Optional[str] = None
    education_en: Optional[str] = None
    work_experience: Optional[int] = Field(None, ge=0, le=100)
    scientific_works_count: Optional[int] = Field(None, ge=0, le=10000)
    video_presentation: Optional[str] = None
    photo_gallery: Optional[List[str]] = None
    documents: Optional[List[str]] = None
    is_active: bool = True
    is_featured: bool = False


class ConsultantExtendedUpdate(BaseModel):
    full_name_ru: Optional[str] = Field(None, max_length=255)
    full_name_en: Optional[str] = Field(None, max_length=255)
    category_tags: Optional[List[str]] = None
    service_tags: Optional[List[str]] = None
    review_tags: Optional[List[str]] = None
    photo: Optional[str] = None
    description1_ru: Optional[str] = None
    description1_en: Optional[str] = None
    description2_ru: Optional[str] = None
    description2_en: Optional[str] = None
    education_ru: Optional[str] = None
    education_en: Optional[str] = None
    work_experience: Optional[int] = Field(None, ge=0, le=100)
    scientific_works_count: Optional[int] = Field(None, ge=0, le=10000)
    video_presentation: Optional[str] = None
    photo_gallery: Optional[List[str]] = None
    documents: Optional[List[str]] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None


class ConsultantServiceCreate(BaseModel):
    tag: str = Field(..., max_length=255)
    title_ru: str = Field(..., max_length=255)
    title_en: str = Field(..., max_length=255)
    description_ru: str
    description_en: str
    price: Optional[int] = Field(None, ge=0)
    duration_minutes: Optional[int] = Field(None, ge=1)
    is_active: bool = True
    sort_order: int = 0


class ConsultantServiceUpdate(BaseModel):
    tag: Optional[str] = Field(None, max_length=255)
    title_ru: Optional[str] = Field(None, max_length=255)
    title_en: Optional[str] = Field(None, max_length=255)
    description_ru: Optional[str] = None
    description_en: Optional[str] = None
    price: Optional[int] = Field(None, ge=0)
    duration_minutes: Optional[int] = Field(None, ge=1)
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class ConsultantReviewCreate(BaseModel):
    tag: str = Field(..., max_length=255)
    reviewer_name: str = Field(..., max_length=255)
    rating: int = Field(..., ge=1, le=5)
    review_date: date
    review_text_ru: str
    review_text_en: str
    is_published: bool = False
    is_featured: bool = False


class ConsultantReviewUpdate(BaseModel):
    tag: Optional[str] = Field(None, max_length=255)
    reviewer_name: Optional[str] = Field(None, max_length=255)
    rating: Optional[int] = Field(None, ge=1, le=5)
    review_date: Optional[date] = None
    review_text_ru: Optional[str] = None
    review_text_en: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
