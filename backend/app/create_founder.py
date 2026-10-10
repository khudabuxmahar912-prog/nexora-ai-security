import getpass

from sqlalchemy import select

from app.db import SessionLocal
from app.models import User, UserRole
from app.security import hash_password


def main() -> None:
    email = input("Founder email: ").strip().lower()
    full_name = input("Full name: ").strip()
    password = getpass.getpass("Password (min 12 characters): ")
    confirm = getpass.getpass("Confirm password: ")

    if password != confirm:
        print("Passwords do not match.")
        return
    if len(password) < 12:
        print("Password must be at least 12 characters.")
        return

    with SessionLocal() as db:
        if db.scalar(select(User).where(User.email == email)):
            print("A user with this email already exists.")
            return
        db.add(
            User(
                email=email,
                full_name=full_name,
                password_hash=hash_password(password),
                role=UserRole.founder,
            )
        )
        db.commit()
    print("Founder account created.")


if __name__ == "__main__":
    main()