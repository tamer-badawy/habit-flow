from sqlmodel import SQLModel, Field, Relationship
from pydantic import EmailStr
from typing import List

class BaseUser(SQLModel):
    email: EmailStr = Field(unique= True, index= True, nullable= False)
    password: str = Field(nullable= False)
    is_active: bool = Field(default= True)


class User(BaseUser, table = True):
    __tablename__ = "users"
    
    id: int|None = Field(default= None, index= True, primary_key= True)
    habits: List["Habit"] = Relationship(back_populates= "user", cascade_delete= True)



