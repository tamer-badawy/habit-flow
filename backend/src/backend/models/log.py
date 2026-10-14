from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Relationship

class Log(SQLModel, table = True):
    __tablename__ = "logs"
    id: int|None = Field(default= None, primary_key= True, index= True)
    habit_id: int = Field(foreign_key= "habits.id", ondelete= "CASCADE", nullable= False)
    completed_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc), index= True)

    habit: "Habit" = Relationship(back_populates= "logs")


