"""API routes for clients."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.client import Client
from app.schemas import ClientOut

router = APIRouter()


@router.get("/clients", response_model=list[ClientOut])
def list_clients(db: Session = Depends(get_db)):
    """Return all clients."""
    items = db.query(Client).order_by(Client.client_id).all()
    return [
        ClientOut(
            id=item.client_id,
            codeClient=item.code_client,
            nom=item.nom_client,
            ville=item.ville,
            typeClient=item.type_client,
            typeVente=item.type_vente,
            groupeClient=item.groupe_client,
            devise=item.devise_par_defaut,
            actif=bool(item.actif),
        )
        for item in items
    ]
