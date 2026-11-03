import uuid
from datetime import datetime, timezone
from threading import Lock

from app.repositories.base import TaskRepository


def _now():
    return datetime.now(timezone.utc).isoformat()


class InMemoryTaskRepository(TaskRepository):
    """Repositorio en memoria: útil para pruebas y para desarrollar sin Supabase."""

    def __init__(self):
        self._tasks = {}
        self._lock = Lock()

    def list(self, status=None, priority=None, search=None):
        tasks = list(self._tasks.values())
        if status:
            tasks = [task for task in tasks if task["status"] == status]
        if priority:
            tasks = [task for task in tasks if task["priority"] == priority]
        if search:
            term = search.lower()
            tasks = [task for task in tasks if term in task["title"].lower()]
        return sorted(tasks, key=lambda task: task["created_at"], reverse=True)

    def get(self, task_id):
        task = self._tasks.get(task_id)
        return dict(task) if task else None

    def create(self, data):
        timestamp = _now()
        task = {**data, "id": str(uuid.uuid4()), "created_at": timestamp, "updated_at": timestamp}
        with self._lock:
            self._tasks[task["id"]] = task
        return dict(task)

    def update(self, task_id, data):
        with self._lock:
            task = self._tasks.get(task_id)
            if task is None:
                return None
            task.update(data, updated_at=_now())
            return dict(task)

    def delete(self, task_id):
        with self._lock:
            return self._tasks.pop(task_id, None) is not None
