import { useState } from "react";
import { EMPTY_TASK, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/constants.js";

const toFormValues = (task) => ({ ...EMPTY_TASK, ...task, due_date: task?.due_date ?? "" });

/** Formulario reutilizable para crear y editar tareas. */
export default function TaskForm({ initialTask, onSubmit, onCancel, submitLabel = "Agregar tarea" }) {
  const [values, setValues] = useState(() => toFormValues(initialTask));
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      setFieldErrors({ title: "El título es obligatorio." });
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        priority: values.priority,
        due_date: values.due_date || null,
      });
      if (!initialTask) setValues(EMPTY_TASK);
    } catch (err) {
      setFieldErrors(err.details ?? {});
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="¿Qué necesitas hacer?"
          maxLength={120}
          className="input"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        {fieldErrors.title && <p className="mt-1 text-xs text-rose-600">{fieldErrors.title}</p>}
      </div>

      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Descripción (opcional)"
        rows={2}
        maxLength={1000}
        className="input resize-none"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
          Estado
          <select name="status" value={values.status} onChange={handleChange} className="input">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
          Prioridad
          <select name="priority" value={values.priority} onChange={handleChange} className="input">
            {PRIORITY_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
          Fecha límite
          <input type="date" name="due_date" value={values.due_date} onChange={handleChange} className="input" />
          {fieldErrors.due_date && <span className="text-rose-600">{fieldErrors.due_date}</span>}
        </label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        )}
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
