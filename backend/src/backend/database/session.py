from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel
from backend.core.config import settings

engine = create_async_engine(settings.ASYNC_DB_URI, echo = (settings.ENVIRONMENT == "development"))
async_session = async_sessionmaker(engine, expire_on_commit= False)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session()-> AsyncGenerator[AsyncSession, None]:
    
    async with async_session as session:
        yield session



SessionDep = Annotated[AsyncSession, Depends(get_session)]