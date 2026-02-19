from typing import Optional, List
from datetime import date

from sqlalchemy import (
    String, Integer, Text, Date, ForeignKey, Boolean,
    ARRAY
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.core.constants import DEFAULT_MAX_CHAR


class ConsultantCategory(Base):
    '''
    Model for Consultant Categories (Гастроэнтерологи, Диетологи, Психологи)
    '''
    name_ru: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    name_en: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    slug: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR), unique=True)
    tag: Mapped[Optional[str]] = mapped_column(String(DEFAULT_MAX_CHAR), unique=True, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    def __repr__(self) -> str:
        return f"{self.name_ru}"


class ConsultantExtended(Base):
    '''
    Extended Model for Consultant with all required fields
    '''
    # Basic info
    full_name_ru: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    full_name_en: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    photo: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Descriptions (2 pieces)
    description1_ru: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    description1_en: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    description2_ru: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    description2_en: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Education
    education_ru: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    education_en: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Experience
    work_experience: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    scientific_works_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    
    # Media
    video_presentation: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    photo_gallery: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    
    # Documents and certificates
    documents: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    category_tags: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    service_tags: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    review_tags: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    
    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Timestamps
    created_at: Mapped[date] = mapped_column(Date)
    updated_at: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    def __repr__(self) -> str:
        return f"{self.full_name_ru}"


class ConsultantService(Base):
    '''
    Model for Consultant Services
    '''
    consultant_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey('consultantextended.id'), nullable=True
    )
    tag: Mapped[Optional[str]] = mapped_column(String(DEFAULT_MAX_CHAR), unique=True, nullable=True)
    
    # Service info
    title_ru: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    title_en: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    description_ru: Mapped[str] = mapped_column(Text)
    description_en: Mapped[str] = mapped_column(Text)
    price: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    duration_minutes: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    
    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"{self.title_ru}"


class ConsultantReview(Base):
    '''
    Model for Consultant Reviews
    '''
    consultant_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey('consultantextended.id'), nullable=True
    )
    tag: Mapped[Optional[str]] = mapped_column(String(DEFAULT_MAX_CHAR), unique=True, nullable=True)
    
    # Review info
    reviewer_name: Mapped[str] = mapped_column(String(DEFAULT_MAX_CHAR))
    rating: Mapped[int] = mapped_column(Integer)  # 1-5 stars
    review_date: Mapped[date] = mapped_column(Date)
    review_text_ru: Mapped[str] = mapped_column(Text)
    review_text_en: Mapped[str] = mapped_column(Text)
    
    # Status
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)

    def __repr__(self) -> str:
        return f"Review by {self.reviewer_name} - {self.rating} stars"
