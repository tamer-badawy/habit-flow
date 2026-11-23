from sqlmodel import SQLModel, Relationship, Field
from datetime import datetime, timezone
from typing import List, TYPE_CHECKING
from pydantic import BaseModel, model_validator



if TYPE_CHECKING:
    from backend.models.user import User
    from backend.models.log import Log


class HabitIn(BaseModel):
    name: str = Field(max_length= 100, nullable= False)
    category: str = Field(max_length= 50, nullable= False)
    is_numeric: bool = Field(default= False)
    target_value: int = Field(default= 1)
    unit: str|None = Field(default= None)

    @model_validator(mode="after")
    def enforce_target_value(self) -> "HabitIn":
        if not self.is_numeric:
            self.target_value = 1

        return self
    
class HabitOut(BaseModel):
    id: int
    name: str = Field(max_length= 100, nullable= False)
    category: str = Field(max_length= 50, nullable= False)
    streak : int = Field(default= 0, nullable= False)
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))
    is_numeric: bool = Field(default= False)
    target_value: int = Field(default= 1)
    current_value: int = Field(default= 0)
    unit: str|None = Field(default= None)



class Habit(SQLModel, table = True):
    __tablename__ = "habits"
    id: int|None = Field(default= None, index= True, primary_key= True)
    user_id: int = Field(foreign_key="users.id", ondelete= "CASCADE", nullable= False)
    name: str = Field(max_length= 100, nullable= False)
    category: str = Field(max_length= 50, nullable= False)
    streak : int = Field(default= 0, nullable= False)
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))
    is_numeric: bool = Field(default= False)
    target_value: int = Field(default= 1)
    unit: str|None = Field(default= None)

    user: "User" = Relationship(back_populates= "habits")
    logs: List["Log"] = Relationship(back_populates= "habit", cascade_delete= True)


