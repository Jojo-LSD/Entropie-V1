"""API routes for articles."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.article import Article
from app.schemas import ArticleOut

router = APIRouter()


@router.get("/articles", response_model=list[ArticleOut])
def list_articles(db: Session = Depends(get_db)):
    """Return all articles."""
    items = db.query(Article).order_by(Article.produit_id).all()
    return [
        ArticleOut(
            id=item.produit_id,
            code=item.code_produit_source,
            nom=item.libelle_produit,
            categorie=item.categorie_qualite,
            espece=item.espece,
            morceau=item.type_morceau,
            unite=item.unite_principale,
            statut="actif" if item.actif else "inactif",
        )
        for item in items
    ]
