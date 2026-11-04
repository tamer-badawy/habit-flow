from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import  create_async_engine, async_sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from backend.core.config import settings

async_engine = create_async_engine(settings.ASYNC_DB_URI, echo = (settings.ENVIRONMENT == "development"))
async_session = async_sessionmaker(
    bind= async_engine,
    class_= AsyncSession,
    expire_on_commit= False
)

async def get_session()-> AsyncGenerator[AsyncSession, None]:
    async with async_session()  as session:
        yield session



SessionDep = Annotated[AsyncSession, Depends(get_session)]