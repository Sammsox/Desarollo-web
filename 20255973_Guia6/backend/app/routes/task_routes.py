from flask import Blueprint, jsonify, request

from app.services.task_service import TaskService


def create_task_blueprint(service: TaskService) -> Blueprint:
    """Rutas HTTP de tareas. Solo traducen HTTP <-> servicio, sin lógica de negocio."""
    blueprint = Blueprint("tasks", __name__, url_prefix="/api/tasks")

    @blueprint.get("")
    def list_tasks():
        tasks = service.list_tasks(
            status=request.args.get("status"),
            priority=request.args.get("priority"),
            search=request.args.get("search"),
        )
        return jsonify(tasks)

    @blueprint.get("/summary")
    def get_summary():
        return jsonify(service.get_summary())

    @blueprint.get("/<task_id>")
    def get_task(task_id):
        return jsonify(service.get_task(task_id))

    @blueprint.post("")
    def create_task():
        task = service.create_task(request.get_json(silent=True))
        return jsonify(task), 201

    @blueprint.patch("/<task_id>")
    def update_task(task_id):
        return jsonify(service.update_task(task_id, request.get_json(silent=True)))

    @blueprint.delete("/<task_id>")
    def delete_task(task_id):
        service.delete_task(task_id)
        return "", 204

    return blueprint
