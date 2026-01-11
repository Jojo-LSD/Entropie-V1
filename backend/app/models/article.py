"""SQLAlchemy model for articles."""

from sqlalchemy import BigInteger, Boolean, Column, Float, String, Text

from app.db import Base


class Article(Base):
    __tablename__ = "dim_produit"
    __table_args__ = {"schema": "core"}

    produit_id = Column(BigInteger, primary_key=True, index=True)
    code_produit_source = Column(Text, nullable=False)
    libelle_produit = Column(Text, nullable=False)
    espece = Column(Text, nullable=True)
    type_morceau = Column(Text, nullable=True)
    categorie_qualite = Column(Text, nullable=True)
    origine_pays = Column(Text, nullable=True)
    frais_ou_congele = Column(Text, nullable=True)
    type_conditionnement = Column(Text, nullable=True)
    unite_principale = Column(Text, nullable=True)
    poids_moyen_piece = Column(Float, nullable=True)
    actif = Column(Boolean, nullable=True, default=True)
