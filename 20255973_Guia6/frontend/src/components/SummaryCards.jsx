const CARDS = [
  { key: "total", label: "Total", color: "text-slate-800" },
  { key: "pending", label: "Pendientes", color: "text-amber-600" },
  { key: "in_progress", label: "En progreso", color: "text-sky-600" },
  { key: "done", label: "Completadas", color: "text-emerald-600" },
];

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CARDS.map(({ key, label, color }) => (
        <div key={key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{summary[key]}</p>
        </div>
      ))}
    </div>
  );
}
