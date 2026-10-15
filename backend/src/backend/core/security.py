import secrets
from typing import Annotated
from pwdlib import PasswordHash
import jwt
from jwt.exceptions import InvalidTokenError
from backend.core.config import settings
from backend.models.user import BaseUser, User
from backend.database.session import SessionDep
from datetime import datetime, timezone, timedelta
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

_password_hash = PasswordHash.recommended()

_auth_scheme = OAuth2PasswordBearer("token")

def get_password_hash(password: str)-> str:
    return _password_hash.hash(password)

def verify_password(password, hash : str)-> bool:
    return _password_hash.verify(password, hash)


def create_access_token(subject: int| str)->str:
    expires = datetime.now(timezone.utc) + timedelta(minutes= 15)
    to_encode = {"exp": expires, "sub": str(subject), "type": "access"}

    return jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)

async def get_user(token: Annotated[str, Depends(_auth_scheme)])-> BaseUser:
    credential_exception = HTTPException(status.HTTP_401_UNAUTHORIZED,
                                         detail= "Could not validate credentials",
                                         headers={"WWW-Authenticate": "Bearer"},
                                         )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
        user_id = payload.get("sub")
        if user_id is None:
            raise credential_exception
        
        user = SessionDep.get(User,user_id)
        if user is None:
            raise credential_exception
        if not user.is_active:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, detail= "Inactive user")
        return BaseUser(user)
    except InvalidTokenError:
        raise credential_exception

def generate_random_refresh_token():
    return secrets.token_hex(32)




