import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads" / "cv"
MAX_CV_BYTES = 5 * 1024 * 1024  # 5 MB


async def save_cv(file: UploadFile) -> str:
    """Validate and store a CV (PDF only). Returns the stored file name."""
    content = await file.read(MAX_CV_BYTES + 1)
    if len(content) > MAX_CV_BYTES:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            "CV must be 5 MB or smaller.",
        )
    if not content.startswith(b"%PDF-"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "CV must be a PDF file.")

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    name = f"{uuid.uuid4().hex}.pdf"
    (UPLOAD_DIR / name).write_bytes(content)
    return name


def cv_path(name: str) -> Path | None:
    path = UPLOAD_DIR / Path(name).name
    return path if path.is_file() else None


def delete_cv(name: str) -> None:
    path = cv_path(name)
    if path:
        path.unlink(missing_ok=True)