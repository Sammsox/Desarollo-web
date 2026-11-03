import { EMPTY_FILTERS, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/constants.js";

export default function TaskFilters({ filters, onChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Buscar por título..."
        className="input sm:flex-1"
      />
      <select name="status" value={filters.status} onChange={handleChange} className="input sm:w-40">
        <option value="">Todos los estados</option>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select name="priority" value={filters.priority} onChange={handleChange} className="input sm:w-44">
        <option value="">Todas las prioridades</option>
        {PRIORITY_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {hasFilters && (
        <button onClick={() => onChange(EMPTY_FILTERS)} className="btn btn-secondary">
          Limpiar
        </button>
      )}
    </div>
  );
}
