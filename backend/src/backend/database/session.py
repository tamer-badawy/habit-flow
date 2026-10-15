from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import  create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from backend.core.config import settings

async_engine = create_async_engine(settings.ASYNC_DB_URI, echo = (settings.ENVIRONMENT == "development"))

async def get_session()-> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(async_engine)  as session:
        yield session



SessionDep = Annotated[AsyncSession, Depends(get_session)]