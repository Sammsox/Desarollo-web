from app.repositories.base import TaskRepository
from app.repositories.memory_task_repository import InMemoryTaskRepository
from app.repositories.supabase_task_repository import (
    SupabaseTaskRepository,
    create_supabase_repository,
)


def build_repository(config) -> TaskRepository:
    """Elige la implementación del repositorio según la configuración."""
    if config.REPOSITORY_BACKEND == "memory":
        return InMemoryTaskRepository()
    return create_supabase_repository(
        config.SUPABASE_URL, config.SUPABASE_KEY, config.SUPABASE_TABLE
    )


__all__ = [
    "TaskRepository",
    "InMemoryTaskRepository",
    "SupabaseTaskRepository",
    "build_repository",
]
