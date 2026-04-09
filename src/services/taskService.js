const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const withAuth = () => {
  const token = localStorage.getItem('rbac_token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const fetchTasks = async ({ search = '', status = '', page = 1, limit = 8 } = {}) => {
  const query = new URLSearchParams({ search, status, page, limit });
  const response = await fetch(`${API_BASE}/tasks?${query.toString()}`, {
    headers: withAuth(),
  });

  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const createTask = async (payload) => {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: withAuth(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const updateTask = async (id, payload) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: withAuth(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

export const removeTask = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: withAuth(),
  });

  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
};

export const fetchAnalytics = async () => {
  const response = await fetch(`${API_BASE}/tasks/analytics`, {
    headers: withAuth(),
  });

  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
};
