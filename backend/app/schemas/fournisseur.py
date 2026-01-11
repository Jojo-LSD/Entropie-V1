"""Pydantic schemas for fournisseurs."""

from pydantic import BaseModel, ConfigDict


class FournisseurOut(BaseModel):
    """Fournisseur returned to the frontend."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    codeFournisseur: str
    nom: str
    ville: str | None = None
    pays: str | None = None
    statut: str | None = None
