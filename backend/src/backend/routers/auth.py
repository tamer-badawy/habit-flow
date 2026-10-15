from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from backend.models.user import User, BaseUser, User_Register, User_Refresh_Token
from backend.database.session import SessionDep
from backend.core.security import get_password_hash

router = APIRouter(prefix= "/api/auth", tags=["Authenttication System"])

@router.post("/register", status_code= status.HTTP_201_CREATED)
async def register_user(user_data: User_Register, db: SessionDep):
    statement = select(User).where(User.email == user_data.email)
    existing_user = (await db.exec(statement)).first()
    if existing_user:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail= "An account with this email already exists")
    new_user = User(user_data)
    db.add(new_user)
    await db.commit
    return {"status": "success", "message": "Account created successfully!"}


