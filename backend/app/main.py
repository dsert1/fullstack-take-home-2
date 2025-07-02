from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .routers import upload, portfolio

settings = get_settings()
app = FastAPI(title="Cashmere Portfolio API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.cors_origins,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(portfolio.router)
