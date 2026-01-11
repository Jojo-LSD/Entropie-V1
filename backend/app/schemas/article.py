"""Pydantic schemas for articles."""

from pydantic import BaseModel, ConfigDict


class ArticleOut(BaseModel):
    """Article returned to the frontend."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    code: str
    nom: str
    categorie: str | None = None
    espece: str | None = None
    morceau: str | None = None
    unite: str | None = None
    statut: str
