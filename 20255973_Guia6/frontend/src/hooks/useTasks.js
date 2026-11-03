import { useCallback, useEffect, useState } from "react";
import { tasksApi } from "../api/tasksApi.js";
import { EMPTY_FILTERS } from "../utils/constants.js";

const EMPTY_SUMMARY = { pending: 0, in_progress: 0, done: 0, total: 0 };

/** Estado y operaciones CRUD de tareas, aislados de la interfaz. */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [list, totals] = await Promise.all([tasksApi.list(filters), tasksApi.summary()]);
      setTasks(list);
      setSummary(totals);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(refresh, filters.search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [refresh, filters.search]);

  const runMutation = useCallback(
    async (operation) => {
      try {
        const result = await operation();
        await refresh();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [refresh],
  );

  const createTask = (task) => runMutation(() => tasksApi.create(task));
  const updateTask = (id, changes) => runMutation(() => tasksApi.update(id, changes));
  const deleteTask = (id) => runMutation(() => tasksApi.remove(id));

  return {
    tasks,
    summary,
    filters,
    setFilters,
    loading,
    error,
    clearError: () => setError(""),
    createTask,
    updateTask,
    deleteTask,
  };
}
