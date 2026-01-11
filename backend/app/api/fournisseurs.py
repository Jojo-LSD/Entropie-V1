"""API routes for fournisseurs."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.fournisseur import Fournisseur
from app.schemas import FournisseurOut

router = APIRouter()


@router.get("/fournisseurs", response_model=list[FournisseurOut])
def list_fournisseurs(db: Session = Depends(get_db)):
    """Return all fournisseurs."""
    items = db.query(Fournisseur).order_by(Fournisseur.fournisseur_id).all()
    return [
        FournisseurOut(
            id=item.fournisseur_id,
            codeFournisseur=item.code_fournisseur_source,
            nom=item.nom_fournisseur,
            ville=item.ville,
            pays=item.pays,
            statut=item.statut,
        )
        for item in items
    ]
