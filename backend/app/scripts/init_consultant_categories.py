import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_async_session
from app.models.consultant_extended import ConsultantCategory


async def init_consultant_categories():
    """Initialize consultant categories"""
    async for session in get_async_session():
        # Check if categories already exist
        existing_categories = await session.execute(
            "SELECT COUNT(*) FROM consultantcategory"
        )
        count = existing_categories.scalar()
        
        if count > 0:
            print("Consultant categories already exist, skipping initialization")
            return
        
        # Create categories
        categories = [
            {
                "name_ru": "Гастроэнтерологи",
                "name_en": "Gastroenterologists", 
                "slug": "gastroenterologists",
                "is_active": True
            },
            {
                "name_ru": "Диетологи",
                "name_en": "Nutritionists",
                "slug": "nutritionists", 
                "is_active": True
            },
            {
                "name_ru": "Психологи",
                "name_en": "Psychologists",
                "slug": "psychologists",
                "is_active": True
            }
        ]
        
        for category_data in categories:
            category = ConsultantCategory(
                **category_data,
                tag=category_data["slug"]
            )
            session.add(category)
        
        await session.commit()
        print("Consultant categories initialized successfully!")


if __name__ == "__main__":
    asyncio.run(init_consultant_categories())
