const API_URL = "http://localhost:8080/api/v1";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("E-mail ou senha incorretos.");
    }

    throw new Error("Não foi possível realizar o login. Tente novamente.");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  return data;
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const parts = token.split(".");

    if (parts.length !== 3) return false;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(
      atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
    );

    if (!payload.exp) return false;

    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
