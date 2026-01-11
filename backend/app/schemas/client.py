"""Pydantic schemas for clients."""

from pydantic import BaseModel, ConfigDict


class ClientOut(BaseModel):
    """Client returned to the frontend."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    codeClient: str
    nom: str
    ville: str | None = None
    typeClient: str | None = None
    typeVente: str | None = None
    groupeClient: str | None = None
    devise: str | None = None
    actif: bool
