import uuid

from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel, ConfigDict, EmailStr
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.db import get_db
from app.models import User, UserRole
from app.security import (
    COOKIE_NAME,
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])

# Used so a wrong email takes the same time as a wrong password.
DUMMY_HASH = hash_password("not-a-real-password")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str
    full_name: str
    role: UserRole


@router.post("/login", response_model=UserOut)
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == data.email.lower()))
    valid = verify_password(data.password, user.password_hash if user else DUMMY_HASH)
    if user is None or not valid or not user.is_active:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")

    response.set_cookie(
        key=COOKIE_NAME,
        value=create_access_token(user.id),
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=settings.access_token_minutes * 60,
        path="/",
    )
    return user


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"status": "logged out"}


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return user