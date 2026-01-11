from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import HTMLResponse
import pandas as pd
import pygwalker as pyg
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db import get_db

router = APIRouter()

TABLE_QUERIES = {
    "pygwalker_global": "SELECT * FROM marts.pygwalker_global",
    "produits": "SELECT * FROM core.dim_produit",
    "clients": "SELECT * FROM core.dim_client",
    "fournisseurs": "SELECT * FROM core.dim_fournisseur",
}


@router.get("/pygwalker", response_class=HTMLResponse)
def pygwalker_dashboard(
    table: str = Query("pygwalker_global", description="Nom logique de la table"),
    limit: int = Query(10000, ge=1, le=200000),
    db: Session = Depends(get_db),
):
    if table not in TABLE_QUERIES:
        raise HTTPException(
            status_code=400,
            detail=f"Table non supportée. Options: {', '.join(TABLE_QUERIES.keys())}.",
        )

    query = f"{TABLE_QUERIES[table]} LIMIT :limit"
    df = pd.read_sql(text(query), db.get_bind(), params={"limit": limit})
    walker = pyg.walk(df, return_html=True)
    html = walker.to_html() if hasattr(walker, "to_html") else str(walker)
    return HTMLResponse(content=html)
