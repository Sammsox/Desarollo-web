export const STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente", badge: "bg-amber-100 text-amber-800" },
  { value: "in_progress", label: "En progreso", badge: "bg-sky-100 text-sky-800" },
  { value: "done", label: "Completada", badge: "bg-emerald-100 text-emerald-800" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Baja", badge: "bg-slate-100 text-slate-700" },
  { value: "medium", label: "Media", badge: "bg-violet-100 text-violet-800" },
  { value: "high", label: "Alta", badge: "bg-rose-100 text-rose-800" },
];

export const EMPTY_TASK = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  due_date: "",
};

export const EMPTY_FILTERS = { status: "", priority: "", search: "" };

export const findOption = (options, value) =>
  options.find((option) => option.value === value) ?? options[0];
