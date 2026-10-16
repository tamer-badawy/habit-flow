from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException, status, Response, Cookie, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select
from pydantic import BaseModel
from backend.models.user import User, UserRegister, User_Refresh_Token
from backend.core.config import settings
from backend.database.session import SessionDep
from backend.core.security import get_password_hash, verify_password, create_access_token, generate_random_refresh_token
from typing import Annotated

router = APIRouter(prefix= "/api/auth", tags=["Authenttication System"])

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"



@router.post("/register", status_code= status.HTTP_201_CREATED)
async def register_user(user_data: UserRegister, db: SessionDep):
    statement = select(User).where(User.email == user_data.email)
    existing_user = (await db.exec(statement)).first()
    if existing_user:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail= "An account with this email already exists")
    new_user = User(
        email = user_data.email,
        first_name= user_data.first_name,
        last_name= user_data.last_name,
        password= get_password_hash(user_data.password.get_secret_value())
    )
    db.add(new_user)
    await db.commit()
    return {"status": "success", "message": "Account created successfully!"}

@router.post("/login", response_model= TokenResponse)
async def login_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: SessionDep, response: Response)->TokenResponse:
    statment = select(User).where(User.email == form_data.username)
    user = (await db.exec(statment)).first()
    if not user or not verify_password(form_data.password, user.password.get_secret_value()):
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail= "Invalid credentails")

    access_token = create_access_token(user.id)

    random_refresh_token = generate_random_refresh_token()
    expiry_time = datetime.now(timezone.utc) + timedelta(days = settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db_refresh_token = User_Refresh_Token(
        user_id= user.id, token= random_refresh_token, expires_at= expiry_time
    )
    db.add(db_refresh_token)
    await db.commit()

    response.set_cookie(
        key= "refresh_token",
        value= random_refresh_token,
        httponly= True,
        secure= True,
        samesite= "lax",
        expires= expiry_time.strftime("%a, %d-%b-%Y %H:%M:%S GMT"),
    )
    return TokenResponse(access_token= access_token)


@router.post("/refresh", response_model= TokenResponse)
async def refresh_access_token(response: Response, db: SessionDep, refresh_token: str = Cookie(None))-> TokenResponse:
    if not refresh_token:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail= "Session expired or missing cookie")

    statement = select(User_Refresh_Token).where(User_Refresh_Token.token == refresh_token)
    token_row = (await db.exec(statement)).first()
    if not token_row or token_row.expires_at.replace(tzinfo= timezone.utc) < datetime.now(timezone.utc):
        if token_row:
            await db.delete(token_row)
            await db.commit()

        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Session expired, please login again")
    
    expiry_time = datetime.now(timezone.utc) + timedelta(days = settings.REFRESH_TOKEN_EXPIRE_DAYS)
    token_row.expires_at = expiry_time
    db.add(token_row)
    await db.commit()

    new_access_token = create_access_token(token_row.user_id)

    response.set_cookie(
        key= "refresh_token",
        value= refresh_token,
        secure= True,
        httponly= True,
        samesite= "lax",
        expires= expiry_time.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
    )
    return TokenResponse(access_token= new_access_token)










