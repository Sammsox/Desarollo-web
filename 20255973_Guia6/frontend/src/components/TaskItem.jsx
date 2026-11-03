import { useState } from "react";
import TaskForm from "./TaskForm.jsx";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, findOption } from "../utils/constants.js";
import { formatDueDate, isOverdue } from "../utils/formatDate.js";

function Badge({ option }) {
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${option.badge}`}>{option.label}</span>;
}

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const isDone = task.status === "done";
  const overdue = isOverdue(task.due_date, task.status);

  const runAction = async (action) => {
    setBusy(true);
    try {
      await action();
    } catch {
      // El hook ya expone el error en el banner global.
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = () =>
    runAction(() => onUpdate(task.id, { status: isDone ? "pending" : "done" }));

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      runAction(() => onDelete(task.id));
    }
  };

  const handleEdit = async (changes) => {
    await onUpdate(task.id, changes);
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="rounded-xl border border-indigo-200 bg-white p-4 shadow-sm">
        <TaskForm
          initialTask={task}
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
          submitLabel="Guardar cambios"
        />
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleToggle}
        disabled={busy}
        className="mt-1 h-5 w-5 cursor-pointer accent-indigo-600"
        aria-label={isDone ? "Marcar como pendiente" : "Marcar como completada"}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className={`font-semibold break-words ${isDone ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {task.title}
        </h3>
        {task.description && <p className="text-sm break-words text-slate-600">{task.description}</p>}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge option={findOption(STATUS_OPTIONS, task.status)} />
          <Badge option={findOption(PRIORITY_OPTIONS, task.priority)} />
          {task.due_date && (
            <span className={`text-xs ${overdue ? "font-semibold text-rose-600" : "text-slate-500"}`}>
              {overdue ? "Vencida: " : "Vence: "}
              {formatDueDate(task.due_date)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button onClick={() => setEditing(true)} disabled={busy} className="btn btn-secondary">
          Editar
        </button>
        <button onClick={handleDelete} disabled={busy} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </li>
  );
}
