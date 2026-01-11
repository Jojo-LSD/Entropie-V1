"""SQLAlchemy model for fournisseurs."""

from sqlalchemy import BigInteger, Column, Text

from app.db import Base


class Fournisseur(Base):
    __tablename__ = "dim_fournisseur"
    __table_args__ = {"schema": "core"}

    fournisseur_id = Column(BigInteger, primary_key=True, index=True)
    code_fournisseur_source = Column(Text, nullable=False, unique=True)
    nom_fournisseur = Column(Text, nullable=False)
    ville = Column(Text, nullable=True)
    pays = Column(Text, nullable=True)
    statut = Column(Text, nullable=True)
