// All calls to the Express backend live here (B6)
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/tasks";

// Shared helper: sends the request and throws a readable error on failure
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const getTasks = () => request(BASE);

export const addTask = (title) =>
  request(BASE, { method: "POST", body: JSON.stringify({ title }) });

// `changes` can contain { completed } and/or { title }
export const updateTask = (id, changes) =>
  request(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(changes) });

export const deleteTask = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
