import pytest

from app import create_app
from app.repositories import InMemoryTaskRepository


@pytest.fixture
def client():
    app = create_app(repository=InMemoryTaskRepository())
    app.config["TESTING"] = True
    return app.test_client()


def create(client, **fields):
    payload = {"title": "Estudiar Flask", **fields}
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 201
    return response.get_json()


def test_health(client):
    assert client.get("/api/health").get_json() == {"status": "ok"}


def test_create_task_applies_defaults(client):
    task = create(client)
    assert task["title"] == "Estudiar Flask"
    assert task["status"] == "pending"
    assert task["priority"] == "medium"
    assert task["due_date"] is None
    assert task["id"]


def test_create_task_rejects_invalid_data(client):
    response = client.post(
        "/api/tasks", json={"title": "  ", "priority": "urgent", "due_date": "mañana"}
    )
    body = response.get_json()
    assert response.status_code == 400
    assert set(body["details"]) == {"title", "priority", "due_date"}


def test_create_task_rejects_unknown_fields(client):
    response = client.post("/api/tasks", json={"title": "x", "owner": "yo"})
    assert response.status_code == 400


def test_list_and_filter_tasks(client):
    create(client, title="Leer", priority="high")
    create(client, title="Escribir", status="done")
    assert len(client.get("/api/tasks").get_json()) == 2
    assert [t["title"] for t in client.get("/api/tasks?status=done").get_json()] == ["Escribir"]
    assert [t["title"] for t in client.get("/api/tasks?priority=high").get_json()] == ["Leer"]
    assert [t["title"] for t in client.get("/api/tasks?search=esc").get_json()] == ["Escribir"]
    assert client.get("/api/tasks?status=nope").status_code == 400


def test_update_task(client):
    task = create(client)
    response = client.patch(f"/api/tasks/{task['id']}", json={"status": "done"})
    assert response.status_code == 200
    assert response.get_json()["status"] == "done"
    assert response.get_json()["title"] == "Estudiar Flask"


def test_update_requires_fields(client):
    task = create(client)
    assert client.patch(f"/api/tasks/{task['id']}", json={}).status_code == 400


def test_delete_task(client):
    task = create(client)
    assert client.delete(f"/api/tasks/{task['id']}").status_code == 204
    assert client.get(f"/api/tasks/{task['id']}").status_code == 404


def test_missing_task_returns_404(client):
    assert client.get("/api/tasks/no-es-un-uuid").status_code == 404
    missing = "00000000-0000-0000-0000-000000000000"
    assert client.patch(f"/api/tasks/{missing}", json={"title": "x"}).status_code == 404
    assert client.delete(f"/api/tasks/{missing}").status_code == 404


def test_summary(client):
    create(client)
    create(client, status="done")
    assert client.get("/api/tasks/summary").get_json() == {
        "pending": 1,
        "in_progress": 0,
        "done": 1,
        "total": 2,
    }
