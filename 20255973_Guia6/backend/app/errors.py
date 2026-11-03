from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException


class AppError(Exception):
    """Error de dominio con código HTTP asociado."""

    status_code = 500

    def __init__(self, message, details=None):
        super().__init__(message)
        self.message = message
        self.details = details or {}


class ValidationError(AppError):
    status_code = 400


class NotFoundError(AppError):
    status_code = 404


class RepositoryError(AppError):
    status_code = 502


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(AppError)
    def handle_app_error(error: AppError):
        body = {"error": error.message}
        if error.details:
            body["details"] = error.details
        return jsonify(body), error.status_code

    @app.errorhandler(HTTPException)
    def handle_http_error(error: HTTPException):
        return jsonify({"error": error.description}), error.code

    @app.errorhandler(Exception)
    def handle_unexpected_error(error: Exception):
        app.logger.exception("Error no controlado: %s", error)
        return jsonify({"error": "Error interno del servidor"}), 500
