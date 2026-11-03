import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, loading, onUpdate, onDelete }) {
  if (loading && tasks.length === 0) {
    return <p className="py-10 text-center text-slate-500">Cargando tareas...</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
        No hay tareas que mostrar.
      </p>
    );
  }

  return (
    <ul className={`flex flex-col gap-3 transition-opacity ${loading ? "opacity-60" : ""}`}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
