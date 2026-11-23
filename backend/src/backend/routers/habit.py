from fastapi import APIRouter, Response, HTTPException, status
from typing import List
from backend.core.security import AuthUser
from backend.database.session import SessionDep
from backend.models.habit import Habit, HabitIn, HabitOut
from sqlmodel import select

router = APIRouter(prefix= "/api/habits", tags= ["Habit Management"])

@router.post("", response_model= List[HabitOut])
async def create_habit(user: AuthUser, habit: HabitIn, db: SessionDep)->List[HabitOut]:
    new_habit = Habit(user_id= user.id, **habit.model_dump())
    db.add(new_habit)
    await db.commit()
    statement = select(Habit).where(Habit.user_id == user.id)
    habits = await db.exec(statement)
    return habits


@router.get("", response_model=  List[HabitOut])
async def list_habits(user: AuthUser, db:SessionDep)->List[Habit]:
    statement  = select(Habit).where(Habit.user_id == user.id)
    habits = await db.exec(statement)
    return habits