from fastapi import APIRouter, Response, HTTPException, status
from backend.models.habit import Habit, CategoriesEnum
from typing import List
from backend.core.security import AuthUser

router = APIRouter(prefix= "/api/habit", tags= ["Habit Management"])

@router.get("/categories", response_model= List[CategoriesEnum])
async def get_categories_list(user: AuthUser)-> List[CategoriesEnum]:
    return list(CategoriesEnum)

