from datetime import date

from app.errors import ValidationError

STATUSES = ("pending", "in_progress", "done")
PRIORITIES = ("low", "medium", "high")
TITLE_MAX_LENGTH = 120
DESCRIPTION_MAX_LENGTH = 1000

EDITABLE_FIELDS = ("title", "description", "status", "priority", "due_date")

DEFAULTS = {
    "description": "",
    "status": "pending",
    "priority": "medium",
    "due_date": None,
}


def _validate_title(value, errors):
    if not isinstance(value, str) or not value.strip():
        errors["title"] = "El título es obligatorio."
        return None
    value = value.strip()
    if len(value) > TITLE_MAX_LENGTH:
        errors["title"] = f"El título no puede superar {TITLE_MAX_LENGTH} caracteres."
    return value


def _validate_description(value, errors):
    if value is None:
        return ""
    if not isinstance(value, str):
        errors["description"] = "La descripción debe ser texto."
        return None
    value = value.strip()
    if len(value) > DESCRIPTION_MAX_LENGTH:
        errors["description"] = (
            f"La descripción no puede superar {DESCRIPTION_MAX_LENGTH} caracteres."
        )
    return value


def _validate_choice(field, value, options, errors):
    if value not in options:
        errors[field] = f"Valor inválido. Opciones: {', '.join(options)}."
    return value


def _validate_due_date(value, errors):
    if value in (None, ""):
        return None
    try:
        return date.fromisoformat(value).isoformat()
    except (TypeError, ValueError):
        errors["due_date"] = "La fecha debe tener el formato AAAA-MM-DD."
        return None


_VALIDATORS = {
    "title": _validate_title,
    "description": _validate_description,
    "status": lambda v, e: _validate_choice("status", v, STATUSES, e),
    "priority": lambda v, e: _validate_choice("priority", v, PRIORITIES, e),
    "due_date": _validate_due_date,
}


def validate_task_payload(payload, partial=False):
    """Valida y normaliza los datos de una tarea.

    Con partial=True solo se validan los campos presentes (para actualizaciones).
    Devuelve un diccionario limpio con los campos permitidos.
    """
    if not isinstance(payload, dict):
        raise ValidationError("El cuerpo de la petición debe ser un objeto JSON.")

    unknown = set(payload) - set(EDITABLE_FIELDS)
    if unknown:
        raise ValidationError(
            "Campos no permitidos.", {field: "Campo desconocido." for field in unknown}
        )

    data = dict(payload) if partial else {**DEFAULTS, **payload}
    if not partial and "title" not in data:
        data["title"] = None

    if partial and not data:
        raise ValidationError("Debes enviar al menos un campo para actualizar.")

    errors = {}
    cleaned = {field: _VALIDATORS[field](value, errors) for field, value in data.items()}

    if errors:
        raise ValidationError("Datos de la tarea inválidos.", errors)
    return cleaned
