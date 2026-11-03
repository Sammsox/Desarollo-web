import uuid

from app.errors import NotFoundError, ValidationError
from app.models.task import PRIORITIES, STATUSES, validate_task_payload
from app.repositories.base import TaskRepository


class TaskService:
    """Lógica de negocio de las tareas, independiente de Flask y de la base de datos."""

    def __init__(self, repository: TaskRepository):
        self._repository = repository

    @staticmethod
    def _ensure_valid_id(task_id):
        try:
            return str(uuid.UUID(str(task_id)))
        except ValueError as error:
            raise NotFoundError("Tarea no encontrada.") from error

    def list_tasks(self, status=None, priority=None, search=None):
        if status and status not in STATUSES:
            raise ValidationError("Filtro de estado inválido.", {"status": status})
        if priority and priority not in PRIORITIES:
            raise ValidationError("Filtro de prioridad inválido.", {"priority": priority})
        search = search.strip() if search else None
        return self._repository.list(status=status, priority=priority, search=search)

    def get_task(self, task_id):
        task = self._repository.get(self._ensure_valid_id(task_id))
        if task is None:
            raise NotFoundError("Tarea no encontrada.")
        return task

    def create_task(self, payload):
        data = validate_task_payload(payload)
        return self._repository.create(data)

    def update_task(self, task_id, payload):
        task_id = self._ensure_valid_id(task_id)
        data = validate_task_payload(payload, partial=True)
        task = self._repository.update(task_id, data)
        if task is None:
            raise NotFoundError("Tarea no encontrada.")
        return task

    def delete_task(self, task_id):
        if not self._repository.delete(self._ensure_valid_id(task_id)):
            raise NotFoundError("Tarea no encontrada.")

    def get_summary(self):
        tasks = self._repository.list()
        summary = {status: 0 for status in STATUSES}
        for task in tasks:
            summary[task["status"]] += 1
        summary["total"] = len(tasks)
        return summary
