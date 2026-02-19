from typing import List, Optional
from datetime import date
from uuid import uuid4
import re

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.core.db import get_async_session
from app.models.consultant_extended import (
    ConsultantCategory,
    ConsultantExtended,
    ConsultantService,
    ConsultantReview
)
from app.schemas.consultant_extended import (
    ConsultantCategoryResponse,
    ConsultantCategoryCreate,
    ConsultantExtendedResponse,
    ConsultantServiceResponse,
    ConsultantReviewResponse,
    ConsultantExtendedCreate,
    ConsultantExtendedUpdate,
    ConsultantServiceCreate,
    ConsultantServiceUpdate,
    ConsultantReviewCreate,
    ConsultantReviewUpdate
)

router = APIRouter()


_slug_cleaner = re.compile(r"[^a-z0-9]+")


def _slugify(value: str) -> str:
    if not value:
        return uuid4().hex
    value = value.lower()
    value = _slug_cleaner.sub('-', value).strip('-')
    return value or uuid4().hex


def _build_media_url(path: Optional[str], request: Request) -> Optional[str]:
    if not path:
        return None
    trimmed = path.strip()
    if not trimmed:
        return None
    if trimmed.startswith("http://") or trimmed.startswith("https://"):
        return trimmed
    cleaned = trimmed.lstrip("/")
    if cleaned.startswith("static/"):
        cleaned = cleaned[len("static/") :]
    try:
        return str(request.url_for("static", path=cleaned))
    except KeyError:
        # Static route might be unavailable during certain test runs
        base_url = str(request.base_url).rstrip("/")
        return f"{base_url}/static/{cleaned}" if cleaned else trimmed


def _apply_media_urls(consultant: ConsultantExtended, request: Request) -> ConsultantExtended:
    consultant.photo = _build_media_url(consultant.photo, request)
    consultant.video_presentation = _build_media_url(consultant.video_presentation, request)

    if consultant.photo_gallery:
        consultant.photo_gallery = [
            url for item in consultant.photo_gallery
            if (url := _build_media_url(item, request))
        ]

    if consultant.documents:
        consultant.documents = [
            url for item in consultant.documents
            if (url := _build_media_url(item, request))
        ]

    return consultant


def _clean_tag_list(tags: Optional[List[str]]) -> List[str]:
    if not tags:
        return []
    return [tag for tag in (item.strip() for item in tags) if tag]


async def _populate_related_objects(
    session: AsyncSession,
    consultants: List[ConsultantExtended]
) -> None:
    if not consultants:
        return

    category_tags: set[str] = set()
    service_tags: set[str] = set()
    review_tags: set[str] = set()

    for consultant in consultants:
        category_tags.update(_clean_tag_list(getattr(consultant, "category_tags", [])))
        service_tags.update(_clean_tag_list(getattr(consultant, "service_tags", [])))
        review_tags.update(_clean_tag_list(getattr(consultant, "review_tags", [])))

    categories_map: dict[str, ConsultantCategory] = {}
    services_map: dict[str, ConsultantService] = {}
    reviews_map: dict[str, ConsultantReview] = {}

    if category_tags:
        result = await session.execute(
            select(ConsultantCategory).where(
                ConsultantCategory.tag.in_(category_tags),
                ConsultantCategory.is_active == True  # noqa: E712
            )
        )
        categories_map = {category.tag: category for category in result.scalars().all()}

    if service_tags:
        result = await session.execute(
            select(ConsultantService).where(
                ConsultantService.tag.in_(service_tags),
                ConsultantService.is_active == True  # noqa: E712
            )
        )
        services_map = {service.tag: service for service in result.scalars().all()}

    if review_tags:
        result = await session.execute(
            select(ConsultantReview).where(ConsultantReview.tag.in_(review_tags))
        )
        reviews_map = {review.tag: review for review in result.scalars().all()}

    for consultant in consultants:
        consultant.categories = [
            categories_map[tag]
            for tag in _clean_tag_list(getattr(consultant, "category_tags", []))
            if tag in categories_map
        ]
        consultant.services = [
            services_map[tag]
            for tag in _clean_tag_list(getattr(consultant, "service_tags", []))
            if tag in services_map
        ]
        consultant.reviews = [
            reviews_map[tag]
            for tag in _clean_tag_list(getattr(consultant, "review_tags", []))
            if tag in reviews_map
        ]


@router.get("/categories", response_model=List[ConsultantCategoryResponse])
async def get_consultant_categories(
    is_active: Optional[bool] = Query(None),
    session: AsyncSession = Depends(get_async_session)
):
    """Get all consultant categories"""
    query = select(ConsultantCategory)
    if is_active is not None:
        query = query.where(ConsultantCategory.is_active == is_active)
    
    result = await session.execute(query)
    categories = result.scalars().all()
    return categories


@router.get("/consultants", response_model=List[ConsultantExtendedResponse])
async def get_consultants(
    request: Request,
    category_id: Optional[int] = Query(None),
    is_active: Optional[bool] = Query(True),
    is_featured: Optional[bool] = Query(None),
    session: AsyncSession = Depends(get_async_session)
):
    """Get all consultants with optional filtering"""
    query = select(ConsultantExtended)

    if is_active is not None:
        query = query.where(ConsultantExtended.is_active == is_active)

    if category_id:
        result = await session.execute(
            select(ConsultantCategory).where(ConsultantCategory.id == category_id)
        )
        category = result.scalar_one_or_none()
        if category is None:
            return []
        if not category.tag:
            return []
        query = query.where(
            ConsultantExtended.category_tags.isnot(None),
            ConsultantExtended.category_tags.contains([category.tag])
        )

    if is_featured is not None:
        query = query.where(ConsultantExtended.is_featured == is_featured)

    query = query.order_by(
        ConsultantExtended.is_featured.desc(),
        ConsultantExtended.full_name_ru.asc()
    )

    result = await session.execute(query)
    consultants = result.scalars().unique().all()
    await _populate_related_objects(session, consultants)
    for consultant in consultants:
        _apply_media_urls(consultant, request)
    return consultants


@router.get("/consultants/{consultant_id}", response_model=ConsultantExtendedResponse)
async def get_consultant(
    consultant_id: int,
    request: Request,
    session: AsyncSession = Depends(get_async_session)
):
    """Get consultant by ID"""
    query = select(ConsultantExtended).where(
        and_(
            ConsultantExtended.id == consultant_id,
            ConsultantExtended.is_active == True
        )
    )
    
    result = await session.execute(query)
    consultant = result.scalar_one_or_none()
    
    if not consultant:
        raise HTTPException(status_code=404, detail="Consultant not found")

    await _populate_related_objects(session, [consultant])
    return _apply_media_urls(consultant, request)


@router.get("/consultants/{consultant_id}/services", response_model=List[ConsultantServiceResponse])
async def get_consultant_services(
    consultant_id: int,
    is_active: Optional[bool] = Query(True),
    session: AsyncSession = Depends(get_async_session)
):
    """Get services for a specific consultant"""
    consultant = await session.get(ConsultantExtended, consultant_id)
    if not consultant:
        raise HTTPException(status_code=404, detail="Consultant not found")

    tags = _clean_tag_list(consultant.service_tags)
    if not tags:
        return []

    query = select(ConsultantService).where(
        ConsultantService.tag.in_(tags)
    )
    if is_active is not None:
        query = query.where(ConsultantService.is_active == is_active)

    result = await session.execute(query)
    services_map = {service.tag: service for service in result.scalars().all()}
    ordered_services = [services_map[tag] for tag in tags if tag in services_map]
    return ordered_services


@router.get("/consultants/{consultant_id}/reviews", response_model=List[ConsultantReviewResponse])
async def get_consultant_reviews(
    consultant_id: int,
    is_published: Optional[bool] = Query(True),
    is_featured: Optional[bool] = Query(None),
    session: AsyncSession = Depends(get_async_session)
):
    """Get reviews for a specific consultant"""
    consultant = await session.get(ConsultantExtended, consultant_id)
    if not consultant:
        raise HTTPException(status_code=404, detail="Consultant not found")

    tags = _clean_tag_list(consultant.review_tags)
    if not tags:
        return []

    query = select(ConsultantReview).where(
        ConsultantReview.tag.in_(tags)
    )

    if is_published is not None:
        query = query.where(ConsultantReview.is_published == is_published)

    if is_featured is not None:
        query = query.where(ConsultantReview.is_featured == is_featured)

    result = await session.execute(query)
    reviews_map = {review.tag: review for review in result.scalars().all()}
    ordered_reviews = [reviews_map[tag] for tag in tags if tag in reviews_map]
    return ordered_reviews


# Admin endpoints (for creating/updating consultants)
@router.post("/admin/consultants", response_model=ConsultantExtendedResponse)
async def create_consultant(
    request: Request,
    consultant_data: ConsultantExtendedCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """Create a new consultant (admin only)"""
    payload = consultant_data.model_dump()
    payload["category_tags"] = _clean_tag_list(payload.get("category_tags"))
    payload["service_tags"] = _clean_tag_list(payload.get("service_tags"))
    payload["review_tags"] = _clean_tag_list(payload.get("review_tags"))

    consultant = ConsultantExtended(
        **payload,
        created_at=date.today()
    )

    session.add(consultant)
    await session.commit()
    await session.refresh(
        consultant,
        attribute_names=['category_tags', 'service_tags', 'review_tags']
    )
    await _populate_related_objects(session, [consultant])
    return _apply_media_urls(consultant, request)


@router.put("/admin/consultants/{consultant_id}", response_model=ConsultantExtendedResponse)
async def update_consultant(
    consultant_id: int,
    request: Request,
    consultant_data: ConsultantExtendedUpdate,
    session: AsyncSession = Depends(get_async_session)
):
    """Update consultant (admin only)"""
    query = select(ConsultantExtended).where(ConsultantExtended.id == consultant_id)
    result = await session.execute(query)
    consultant = result.scalar_one_or_none()
    
    if not consultant:
        raise HTTPException(status_code=404, detail="Consultant not found")

    update_payload = consultant_data.model_dump(exclude_unset=True)
    if "category_tags" in update_payload:
        update_payload["category_tags"] = _clean_tag_list(update_payload.get("category_tags"))
    if "service_tags" in update_payload:
        update_payload["service_tags"] = _clean_tag_list(update_payload.get("service_tags"))
    if "review_tags" in update_payload:
        update_payload["review_tags"] = _clean_tag_list(update_payload.get("review_tags"))

    for field, value in update_payload.items():
        setattr(consultant, field, value)

    consultant.updated_at = date.today()

    await session.commit()
    await session.refresh(
        consultant,
        attribute_names=['category_tags', 'service_tags', 'review_tags']
    )
    await _populate_related_objects(session, [consultant])
    return _apply_media_urls(consultant, request)


@router.delete("/admin/consultants/{consultant_id}")
async def delete_consultant(
    consultant_id: int,
    session: AsyncSession = Depends(get_async_session)
):
    """Delete consultant (admin only)"""
    query = select(ConsultantExtended).where(ConsultantExtended.id == consultant_id)
    result = await session.execute(query)
    consultant = result.scalar_one_or_none()
    
    if not consultant:
        raise HTTPException(status_code=404, detail="Consultant not found")
    
    await session.delete(consultant)
    await session.commit()
    
    return {"message": "Consultant deleted successfully"}


@router.post("/admin/consultants/{consultant_id}/services", response_model=ConsultantServiceResponse)
async def create_consultant_service(
    consultant_id: int,
    service_data: ConsultantServiceCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """Create a new service for consultant (admin only)"""
    service = ConsultantService(
        consultant_id=consultant_id,
        **service_data.dict()
    )
    
    session.add(service)
    await session.commit()
    await session.refresh(service)
    
    return service


@router.post("/admin/consultants/{consultant_id}/reviews", response_model=ConsultantReviewResponse)
async def create_consultant_review(
    consultant_id: int,
    review_data: ConsultantReviewCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """Create a new review for consultant (admin only)"""
    review = ConsultantReview(
        consultant_id=consultant_id,
        **review_data.dict()
    )
    
    session.add(review)
    await session.commit()
    await session.refresh(review)
    
    return review
