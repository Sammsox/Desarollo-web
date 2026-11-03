# Guía 6 — Gestor de Tareas (React + Flask + Supabase)

Aplicación full stack para crear, editar, filtrar y completar tareas.

## Arquitectura

```
20255973_Guia6/
├── backend/                     API REST en Python + Flask
│   ├── app/
│   │   ├── __init__.py          Application factory (inyección de dependencias)
│   │   ├── config.py            Variables de entorno
│   │   ├── errors.py            Errores de dominio y manejadores JSON
│   │   ├── models/task.py       Reglas y validación de una tarea
│   │   ├── repositories/        Patrón Repositorio
│   │   │   ├── base.py                       Interfaz TaskRepository
│   │   │   ├── supabase_task_repository.py   Implementación con Supabase
│   │   │   └── memory_task_repository.py     Implementación en memoria (pruebas)
│   │   ├── services/task_service.py  Lógica de negocio
│   │   └── routes/task_routes.py     Endpoints HTTP (Blueprint)
│   ├── database/schema.sql      Tabla `tasks` para Supabase
│   ├── tests/                   Pruebas con pytest
│   └── run.py                   Punto de entrada
└── frontend/                    React + Vite + Tailwind CSS
    └── src/
        ├── api/                 Cliente HTTP y llamadas a la API
        ├── hooks/useTasks.js    Estado y operaciones CRUD
        ├── components/          Componentes de interfaz
        └── utils/               Constantes y formato de fechas
```

Flujo de una petición: `Componente → useTasks → tasksApi → Flask route → TaskService → TaskRepository → Supabase`.

## API

| Método | Ruta                  | Descripción                                        |
|--------|-----------------------|----------------------------------------------------|
| GET    | `/api/health`         | Estado del servidor                                |
| GET    | `/api/tasks`          | Lista (filtros: `status`, `priority`, `search`)   |
| GET    | `/api/tasks/summary`  | Conteo por estado                                  |
| GET    | `/api/tasks/<id>`     | Detalle                                            |
| POST   | `/api/tasks`          | Crear                                              |
| PATCH  | `/api/tasks/<id>`     | Actualizar campos                                  |
| DELETE | `/api/tasks/<id>`     | Eliminar                                           |

Campos: `title` (obligatorio), `description`, `status` (`pending`, `in_progress`, `done`),
`priority` (`low`, `medium`, `high`), `due_date` (`AAAA-MM-DD` o `null`).

## Puesta en marcha

### 1. Supabase
1. Crea un proyecto en <https://supabase.com>.
2. En **SQL Editor** ejecuta el contenido de `backend/database/schema.sql`.
3. En **Project Settings → API** copia la *Project URL* y la clave *service_role*.

> La clave `service_role` solo va en el backend (`.env`), nunca en el frontend.

### 2. Backend (PowerShell)
```powershell
cd 20255973_Guia6\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # edita SUPABASE_URL y SUPABASE_KEY
python run.py               # http://127.0.0.1:5000
```
Para probar sin Supabase, pon `REPOSITORY_BACKEND=memory` en `.env` (los datos se pierden al reiniciar).

Pruebas: `python -m pytest`

### 3. Frontend (otra terminal)
```powershell
cd 20255973_Guia6\frontend
npm install
npm run dev                 # http://localhost:5173
```
Vite redirige `/api` al backend, así que no hace falta configurar `.env` en desarrollo.
