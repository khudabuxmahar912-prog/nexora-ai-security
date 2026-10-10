import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Lead, LeadStatus, UserRole
from app.ratelimit import RateLimiter
from app.security import require_roles

router = APIRouter(prefix="/leads", tags=["leads"])

lead_limiter = RateLimiter(max_requests=5, window_seconds=3600)
staff_only = require_roles(UserRole.founder, UserRole.admin)


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    company: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=50)
    service_interest: str | None = Field(default=None, max_length=100)
    message: str = Field(min_length=10, max_length=5000)
    # Honeypot: hidden field. Real people leave it empty, bots fill it.
    website: str | None = Field(default=None, max_length=200)


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: str
    company: str | None
    phone: str | None
    service_interest: str | None
    message: str
    source: str
    status: LeadStatus
    created_at: datetime


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


@router.post(
    "", status_code=status.HTTP_201_CREATED, dependencies=[Depends(lead_limiter)]
)
def create_lead(data: LeadCreate, db: Session = Depends(get_db)):
    if data.website:
        # A bot filled the hidden field. Pretend it worked, save nothing.
        return {"status": "received"}

    lead = Lead(
        name=data.name.strip(),
        email=data.email.lower(),
        company=data.company.strip() if data.company else None,
        phone=data.phone.strip() if data.phone else None,
        service_interest=data.service_interest,
        message=data.message.strip(),
    )
    db.add(lead)
    db.commit()
    return {"status": "received"}


@router.get("", response_model=list[LeadOut])
def list_leads(
    lead_status: LeadStatus | None = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    stmt = select(Lead).order_by(Lead.created_at.desc()).limit(limit).offset(offset)
    if lead_status:
        stmt = stmt.where(Lead.status == lead_status)
    return db.scalars(stmt).all()


@router.patch("/{lead_id}", response_model=LeadOut)
def update_lead(
    lead_id: uuid.UUID,
    data: LeadStatusUpdate,
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    lead = db.get(Lead, lead_id)
    if lead is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Lead not found")
    lead.status = data.status
    db.commit()
    db.refresh(lead)
    return lead