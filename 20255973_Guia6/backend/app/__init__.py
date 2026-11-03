from flask import Flask, jsonify
from flask_cors import CORS

from app.config import Config
from app.errors import register_error_handlers
from app.repositories import build_repository
from app.routes import create_task_blueprint
from app.services import TaskService


def create_app(config=Config, repository=None) -> Flask:
    """Application factory: arma la app inyectando el repositorio en el servicio."""
    app = Flask(__name__)
    app.config.from_object(config)
    app.json.sort_keys = False

    CORS(app, resources={r"/api/*": {"origins": config.CORS_ORIGINS}})

    task_service = TaskService(repository or build_repository(config))
    app.register_blueprint(create_task_blueprint(task_service))

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    register_error_handlers(app)
    return app
