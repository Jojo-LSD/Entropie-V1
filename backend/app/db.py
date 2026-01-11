"""Database setup and session management."""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

# SQLAlchemy engine and session factory
engine = create_engine(settings.DATABASE_URL, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

# Base class for models
Base = declarative_base()


def get_db():
    """FastAPI dependency to provide a scoped DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
