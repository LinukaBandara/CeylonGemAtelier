const API_BASE = "";

async function request(path, options = {}) {
  const token = localStorage.getItem("cga_auth_token");

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("cga_auth_token");
    localStorage.removeItem("cga_auth_user");

    if (!window.location.pathname.startsWith("/login")) {
      window.location.replace("/login");
    }

    throw new Error("Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const payload = await response.json();
      message = payload?.message ?? payload?.detail ?? message;
    } catch {
      // Use fallback message.
    }

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.value)) return payload.value;
  return [];
}