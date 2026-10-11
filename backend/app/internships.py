import uuid
from datetime import datetime

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, EmailStr, TypeAdapter, ValidationError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.db import get_db
from app.models import ApplicationStatus, InternshipApplication, UserRole
from app.ratelimit import RateLimiter
from app.security import require_roles
from app.storage import cv_path, delete_cv, save_cv

router = APIRouter(prefix="/internships", tags=["internships"])

apply_limiter = RateLimiter(max_requests=5, window_seconds=3600)
staff_only = require_roles(UserRole.founder, UserRole.admin)
email_adapter = TypeAdapter(EmailStr)

# Keep this list identical to INTERNSHIP_TRACKS in src/lib/internships.ts
TRACKS = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Agentic AI Development",
    "Generative AI",
    "Python Development",
    "C++",
    "JavaScript",
    "HTML",
    "AI Research",
    "QA / Software Testing",
    "CSS Web Development",
    "Fundamentals of Application Development",
]
LEVELS = ["Beginner", "Intermediate", "Advanced"]


def clean_text(value: str | None) -> str | None:
    if value is None:
        return None
    value = value.strip()
    return value or None


def clean_url(value: str | None) -> str | None:
    value = clean_text(value)
    if value is None:
        return None
    if not value.lower().startswith(("http://", "https://")):
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "Links must start with http:// or https://",
        )
    return value


class ApplicationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    full_name: str
    email: str
    phone: str | None
    country: str
    education: str
    institute: str
    skills: str
    experience_level: str
    track: str
    github_url: str | None
    linkedin_url: str | None
    portfolio_url: str | None
    previous_projects: str | None
    availability: str | None
    preferred_area: str | None
    motivation: str
    status: ApplicationStatus
    created_at: datetime
    has_cv: bool = False


class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


def to_out(application: InternshipApplication) -> ApplicationOut:
    data = ApplicationOut.model_validate(application)
    data.has_cv = bool(application.cv_path)
    return data


@router.post(
    "/apply",
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(apply_limiter)],
)
async def apply(
    full_name: str = Form(min_length=2, max_length=200),
    email: str = Form(max_length=255),
    phone: str | None = Form(default=None, max_length=50),
    country: str = Form(min_length=2, max_length=100),
    education: str = Form(min_length=2, max_length=200),
    institute: str = Form(min_length=2, max_length=200),
    skills: str = Form(min_length=2, max_length=3000),
    experience_level: str = Form(max_length=50),
    track: str = Form(max_length=100),
    github_url: str | None = Form(default=None, max_length=300),
    linkedin_url: str | None = Form(default=None, max_length=300),
    portfolio_url: str | None = Form(default=None, max_length=300),
    previous_projects: str | None = Form(default=None, max_length=3000),
    availability: str | None = Form(default=None, max_length=200),
    preferred_area: str | None = Form(default=None, max_length=200),
    motivation: str = Form(min_length=20, max_length=3000),
    website: str | None = Form(default=None, max_length=200),  # honeypot
    cv: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
):
    if website:
        # A bot filled the hidden field. Pretend it worked, save nothing.
        return {"status": "received"}

    try:
        clean_email = str(email_adapter.validate_python(email.strip())).lower()
    except ValidationError:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY, "Please enter a valid email address."
        )
    if track not in TRACKS:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY, "Please choose a valid track."
        )
    if experience_level not in LEVELS:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "Please choose a valid experience level.",
        )

    existing = db.scalar(
        select(InternshipApplication.id).where(
            InternshipApplication.email == clean_email
        )
    )
    if existing:
        raise HTTPException(
            status.HTTP_409_CONFLICT, "An application with this email already exists."
        )

    cv_name = None
    if cv is not None and cv.filename:
        cv_name = await save_cv(cv)

    application = InternshipApplication(
        full_name=full_name.strip(),
        email=clean_email,
        phone=clean_text(phone),
        country=country.strip(),
        education=education.strip(),
        institute=institute.strip(),
        skills=skills.strip(),
        experience_level=experience_level,
        track=track,
        github_url=clean_url(github_url),
        linkedin_url=clean_url(linkedin_url),
        portfolio_url=clean_url(portfolio_url),
        cv_path=cv_name,
        previous_projects=clean_text(previous_projects),
        availability=clean_text(availability),
        preferred_area=clean_text(preferred_area),
        motivation=motivation.strip(),
    )
    db.add(application)
    try:
        db.commit()
    except Exception:
        db.rollback()
        if cv_name:
            delete_cv(cv_name)
        raise

    return {
        "status": "received",
        "whatsapp_group_url": settings.whatsapp_group_url or None,
    }


@router.get("/applications", response_model=list[ApplicationOut])
def list_applications(
    app_status: ApplicationStatus | None = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    stmt = (
        select(InternshipApplication)
        .order_by(InternshipApplication.created_at.desc())
        .limit(limit)
        .offset(offset)
    )
    if app_status:
        stmt = stmt.where(InternshipApplication.status == app_status)
    return [to_out(a) for a in db.scalars(stmt).all()]


@router.get("/applications/{application_id}", response_model=ApplicationOut)
def get_application(
    application_id: uuid.UUID,
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    application = db.get(InternshipApplication, application_id)
    if application is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Application not found")
    return to_out(application)


@router.patch("/applications/{application_id}", response_model=ApplicationOut)
def update_application(
    application_id: uuid.UUID,
    data: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    application = db.get(InternshipApplication, application_id)
    if application is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Application not found")
    application.status = data.status
    db.commit()
    db.refresh(application)
    return to_out(application)


@router.get("/applications/{application_id}/cv")
def download_cv(
    application_id: uuid.UUID,
    db: Session = Depends(get_db),
    _user=Depends(staff_only),
):
    application = db.get(InternshipApplication, application_id)
    if application is None or not application.cv_path:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "CV not found")
    path = cv_path(application.cv_path)
    if path is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "CV not found")
    return FileResponse(path, media_type="application/pdf", filename="cv.pdf")