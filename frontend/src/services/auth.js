import { api } from "./api";

const TOKEN_KEY = "cga_auth_token";
const USER_KEY = "cga_auth_user";

export async function login(username, password) {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });

  if (!response?.token) {
    throw new Error("Login response did not contain a token");
  }

  localStorage.setItem(TOKEN_KEY, response.token);
  localStorage.setItem(USER_KEY, username);

  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  return localStorage.getItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
