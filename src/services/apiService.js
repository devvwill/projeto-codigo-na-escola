import { isAuthenticated, logout } from "./authService";

const API_URL = "http://localhost:8080/api/v1";

export async function apiFetch(path, options = {}) {
  if (!isAuthenticated()) {
    logout();
    throw new Error("Sua sessão expirou. Faça login novamente.");
  }

  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
  }

  return response;
}
