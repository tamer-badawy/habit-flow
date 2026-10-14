from sqlmodel import SQLModel, Relationship, Field
from datetime import datetime, timezone
from typing import List

class Habit(SQLModel, table = True):
    __tablename__ = "habits"
    id: int|None = Field(default= None, index= True, primary_key= True)
    user_id: int = Field(foreign_key="users.id", ondelete= "CASCADE", nullable= False)
    name: str = Field(max_length= 100, nullable= False)
    category: str = Field(max_length= 50, nullable= False)
    streak : int = Field(default= 0, nullable= False)
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))

    user: "User" = Relationship(back_populates= "habits")
    logs: List["Log"] = Relationship(back_populates= "habit", cascade_delete= True)


