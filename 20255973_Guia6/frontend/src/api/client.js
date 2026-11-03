const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  constructor(message, status, details = {}) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/** Cliente HTTP genérico: serializa JSON y normaliza los errores de la API. */
export async function request(path, { method = "GET", body, params } = {}) {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor.", 0);
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(data?.error ?? "Error inesperado.", response.status, data?.details);
  }
  return data;
}
