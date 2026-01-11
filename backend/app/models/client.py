"""SQLAlchemy model for clients."""

from sqlalchemy import BigInteger, Boolean, Column, String, Text

from app.db import Base


class Client(Base):
    __tablename__ = "dim_client"
    __table_args__ = {"schema": "core"}

    client_id = Column(BigInteger, primary_key=True, index=True)
    code_client = Column(Text, nullable=False, unique=True)
    nom_client = Column(Text, nullable=False)
    ville = Column(Text, nullable=True)
    type_client = Column(Text, nullable=True)
    type_vente = Column(Text, nullable=True)
    groupe_client = Column(Text, nullable=True)
    devise_par_defaut = Column(String(3), nullable=True)
    actif = Column(Boolean, nullable=True, default=True)
    code_type_client = Column(Text, nullable=True)
    code_type_vente = Column(Text, nullable=True)
    code_groupe_client = Column(Text, nullable=True)
