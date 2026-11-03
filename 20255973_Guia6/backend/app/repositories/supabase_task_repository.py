from app.errors import RepositoryError
from app.repositories.base import TaskRepository


class SupabaseTaskRepository(TaskRepository):
    """Implementación del repositorio sobre una tabla de Supabase (PostgreSQL)."""

    def __init__(self, client, table_name="tasks"):
        self._client = client
        self._table_name = table_name

    def _table(self):
        return self._client.table(self._table_name)

    @staticmethod
    def _execute(query):
        try:
            return query.execute().data or []
        except Exception as error:
            raise RepositoryError(
                "No se pudo comunicar con la base de datos.", {"reason": str(error)}
            ) from error

    def list(self, status=None, priority=None, search=None):
        query = self._table().select("*")
        if status:
            query = query.eq("status", status)
        if priority:
            query = query.eq("priority", priority)
        if search:
            query = query.ilike("title", f"%{search}%")
        return self._execute(query.order("created_at", desc=True))

    def get(self, task_id):
        rows = self._execute(self._table().select("*").eq("id", task_id).limit(1))
        return rows[0] if rows else None

    def create(self, data):
        rows = self._execute(self._table().insert(data))
        return rows[0]

    def update(self, task_id, data):
        rows = self._execute(self._table().update(data).eq("id", task_id))
        return rows[0] if rows else None

    def delete(self, task_id):
        rows = self._execute(self._table().delete().eq("id", task_id))
        return bool(rows)


def create_supabase_repository(url, key, table_name):
    if not url or not key:
        raise RuntimeError(
            "Faltan SUPABASE_URL o SUPABASE_KEY en el archivo .env "
            "(o usa REPOSITORY_BACKEND=memory para probar sin Supabase)."
        )
    from supabase import create_client

    return SupabaseTaskRepository(create_client(url, key), table_name)
