const API_BASE = window.location.port === "8000" || window.location.port === ""
  ? "/api"
  : "http://127.0.0.1:8000/api";

function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest(path, options = {}) {
  const headers = {
    ...authHeaders(),
    ...(options.headers || {}),
  };

  if (!(options.body instanceof URLSearchParams)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = data.detail;
    const message = typeof detail === "string"
      ? detail
      : Array.isArray(detail)
        ? detail.map((d) => d.msg).join(", ")
        : "Request failed";
    throw new Error(message);
  }

  return data;
}

async function register(email, password, fullName) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, full_name: fullName || null }),
  });
}

async function login(email, password) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const data = await apiRequest("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });

  setToken(data.access_token);
  return data;
}

async function getProfile() {
  return apiRequest("/profile");
}

async function updateProfile(profileData) {
  return apiRequest("/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

async function getNutrition() {
  return apiRequest("/nutrition");
}

async function getMealPlan() {
  return apiRequest("/meals/suggest");
}

async function getWorkoutPlan() {
  return apiRequest("/workouts/suggest");
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

function logout() {
  clearToken();
  window.location.href = "login.html";
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.classList.remove("hidden");
  }
}

function hideError(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add("hidden");
  }
}

function formatGoal(goal) {
  return (goal || "").replace(/_/g, " ");
}
