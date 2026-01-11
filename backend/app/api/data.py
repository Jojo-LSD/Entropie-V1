from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.encoders import jsonable_encoder
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db import get_db

router = APIRouter()


@router.get("/data/pygwalker")
def get_pygwalker_data(
    limit: int = Query(10000, ge=1, le=200000),
    db: Session = Depends(get_db),
):
    try:
        result = db.execute(
            text("SELECT * FROM marts.pygwalker_global LIMIT :limit"),
            {"limit": limit},
        )
        rows = result.mappings().all()
        return jsonable_encoder(rows)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=500,
            detail="Database query failed for marts.pygwalker_global.",
        ) from exc
