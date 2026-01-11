from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401
from app.api import articles
from app.api import clients
from app.api import data
from app.api import fournisseurs
from app.api import purchase_orders
from app.api import pygwalker
from app.core.config import settings
from app.db import Base, engine

app = FastAPI(
    title="entropie-prodal",
    description="Backend API for entropie-prodal",
    version="1.0.0",
)

# Create tables at startup (simple dev bootstrap; prefer migrations later)
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS if settings.ALLOWED_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "entropie-prodal API - Ready for development"}


# API routes
app.include_router(articles.router, prefix="/api", tags=["articles"])
app.include_router(clients.router, prefix="/api", tags=["clients"])
app.include_router(data.router, prefix="/api", tags=["data"])
app.include_router(fournisseurs.router, prefix="/api", tags=["fournisseurs"])
app.include_router(purchase_orders.router, prefix="/api", tags=["commande-achat"])
app.include_router(pygwalker.router, tags=["pygwalker"])
