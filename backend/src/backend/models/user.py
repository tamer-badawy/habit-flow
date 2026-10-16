from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import String, Column
from pydantic import EmailStr, SecretStr, model_validator, BaseModel
from typing import List, TYPE_CHECKING, Self
from datetime import datetime, timezone

if TYPE_CHECKING:
    from backend.models.habit import Habit

class BaseUser(SQLModel):
    id: int|None = Field(default= None, index= True, primary_key= True)
    email: EmailStr = Field(unique= True, index= True, nullable= False)
    first_name: str = Field(max_length= 30, nullable= False)
    last_name: str = Field(max_length= 30, nullable= False)
    is_active: bool = Field(default= True)

class UserRegister(BaseModel):
    email: EmailStr = Field(unique= True, index= True, nullable= False)
    password: SecretStr = Field(min_length=6, nullable= False)
    password_confirm: SecretStr = Field(min_length=6 , nullable= False)
    first_name: str = Field(max_length= 30, nullable= False)
    last_name: str = Field(max_length= 30, nullable= False)

    @model_validator(mode= "after")
    def passwords_match(self)-> Self:
        password = self.password.get_secret_value()
        password_confirm = self.password_confirm.get_secret_value()
        if password != password_confirm:
            raise ValueError("Passwords do not match")
        return self
    



class User(BaseUser, table = True):
    __tablename__ = "users"
    password: SecretStr = Field(sa_column= Column(String(255), nullable= False))
    habits: List["Habit"] = Relationship(back_populates= "user", cascade_delete= True)
    refresh_tokens: List[User_Refresh_Token] = Relationship(back_populates= "user", cascade_delete= True)



class User_Refresh_Token(SQLModel, table = True):
    __tablename__ = "user_refresh_tokens"
    id: int|None = Field(default= None, primary_key= True, index= True)
    user_id: int = Field(foreign_key= "users.id", ondelete="CASCADE", nullable= False)
    token: str = Field(nullable= False, index= True)
    expires_at: datetime = Field(nullable= False)
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))
    user: User = Relationship(back_populates= "refresh_tokens")



