from abc import ABC, abstractmethod


class TaskRepository(ABC):
    """Contrato de persistencia de tareas. La capa de servicio solo conoce esta interfaz."""

    @abstractmethod
    def list(self, status=None, priority=None, search=None):
        """Devuelve las tareas filtradas, de la más reciente a la más antigua."""

    @abstractmethod
    def get(self, task_id):
        """Devuelve la tarea o None si no existe."""

    @abstractmethod
    def create(self, data):
        """Crea la tarea y la devuelve con id y fechas."""

    @abstractmethod
    def update(self, task_id, data):
        """Actualiza la tarea y la devuelve, o None si no existe."""

    @abstractmethod
    def delete(self, task_id):
        """Elimina la tarea. Devuelve True si existía."""
