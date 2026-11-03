import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    """Configuración leída desde variables de entorno (.env)."""

    SUPABASE_URL = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
    SUPABASE_TABLE = os.getenv("SUPABASE_TABLE", "tasks")
    REPOSITORY_BACKEND = os.getenv("REPOSITORY_BACKEND", "supabase").lower()
    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
        if origin.strip()
    ]
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    PORT = int(os.getenv("PORT", "5000"))
