from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):

    #----------------------------------------------------------------------------------------------------
    # Core Application Settings
    #----------------------------------------------------------------------------------------------------

    PROJECT_NAME: str = "HabitFlow"
    ENVIRONMENT: str = "development" # development, production, testing

    #----------------------------------------------------------------------------------------------------
    # Security Settings
    #----------------------------------------------------------------------------------------------------

    # Should be changed  in production (ex: openssl rand -hex 32)
    SECRET_KEY: str = "DEFAULT_INSECURE_FALLBACK_SECRET_KEY_CHANGE_ME_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15 # valid for 15 min
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7 #valid for 7 days

    #----------------------------------------------------------------------------------------------------
    # Database Connection Settings
    #----------------------------------------------------------------------------------------------------

    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "habitflow_db"

    @property
    def ASYNC_DB_URI(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


    model_config = SettingsConfigDict(
        env_file = PROJECT_ROOT / ".env",
        env_file_encoding = "utf-8",
        extra = "ignore",
    )

@lru_cache
def get_settings():

    return Settings()

settings = get_settings()

