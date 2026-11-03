const formatter = new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" });

/** Convierte "AAAA-MM-DD" a texto legible sin desfases de zona horaria. */
export function formatDueDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  return formatter.format(new Date(year, month - 1, day));
}

export function isOverdue(isoDate, status) {
  if (!isoDate || status === "done") return false;
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  return isoDate < today;
}
