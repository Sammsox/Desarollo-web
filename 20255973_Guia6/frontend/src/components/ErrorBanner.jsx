export default function ErrorBanner({ message, onClose }) {
  if (!message) return null;

  return (
    <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
      <span>{message}</span>
      <button onClick={onClose} className="font-bold" aria-label="Cerrar">
        ×
      </button>
    </div>
  );
}
