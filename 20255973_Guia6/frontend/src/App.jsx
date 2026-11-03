import ErrorBanner from "./components/ErrorBanner.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { useTasks } from "./hooks/useTasks.js";

export default function App() {
  const {
    tasks,
    summary,
    filters,
    setFilters,
    loading,
    error,
    clearError,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Gestor de Tareas</h1>
        <p className="text-slate-500">React + Flask + Supabase</p>
      </header>

      <SummaryCards summary={summary} />

      <ErrorBanner message={error} onClose={clearError} />

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Nueva tarea</h2>
        <TaskForm onSubmit={createTask} />
      </section>

      <section className="flex flex-col gap-4">
        <TaskFilters filters={filters} onChange={setFilters} />
        <TaskList tasks={tasks} loading={loading} onUpdate={updateTask} onDelete={deleteTask} />
      </section>
    </main>
  );
}
