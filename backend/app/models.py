import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, String, Text, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class UserRole(str, enum.Enum):
    founder = "founder"
    admin = "admin"
    intern = "intern"
    client = "client"


class LeadStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    qualified = "qualified"
    client = "client"
    lost = "lost"


class ApplicationStatus(str, enum.Enum):
    applicant = "applicant"
    under_review = "under_review"
    shortlisted = "shortlisted"
    interview = "interview"
    selected = "selected"
    active = "active"
    completed = "completed"
    rejected = "rejected"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class User(TimestampMixin, Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(200))
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, native_enum=False, length=30), default=UserRole.intern
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Lead(TimestampMixin, Base):
    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255), index=True)
    company: Mapped[str | None] = mapped_column(String(200))
    phone: Mapped[str | None] = mapped_column(String(50))
    service_interest: Mapped[str | None] = mapped_column(String(100))
    message: Mapped[str] = mapped_column(Text)
    source: Mapped[str] = mapped_column(String(50), default="contact_form")
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, native_enum=False, length=30), default=LeadStatus.new
    )


class InternshipApplication(TimestampMixin, Base):
    __tablename__ = "internship_applications"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    full_name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str | None] = mapped_column(String(50))
    country: Mapped[str] = mapped_column(String(100))
    education: Mapped[str] = mapped_column(String(200))
    institute: Mapped[str] = mapped_column(String(200))
    skills: Mapped[str] = mapped_column(Text)
    experience_level: Mapped[str] = mapped_column(String(50))
    track: Mapped[str] = mapped_column(String(100))
    github_url: Mapped[str | None] = mapped_column(String(300))
    linkedin_url: Mapped[str | None] = mapped_column(String(300))
    portfolio_url: Mapped[str | None] = mapped_column(String(300))
    cv_path: Mapped[str | None] = mapped_column(String(500))
    previous_projects: Mapped[str | None] = mapped_column(Text)
    availability: Mapped[str | None] = mapped_column(String(200))
    preferred_area: Mapped[str | None] = mapped_column(String(200))
    motivation: Mapped[str] = mapped_column(Text)
    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus, native_enum=False, length=30),
        default=ApplicationStatus.applicant,
    )