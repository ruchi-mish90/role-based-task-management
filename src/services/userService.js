const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const withAuth = () => {
  const token = localStorage.getItem('rbac_token');
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: withAuth(),
  });

  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const assignUserManager = async (userId, managerId) => {
  const response = await fetch(`${API_BASE}/users/${userId}/manager`, {
    method: 'PATCH',
    headers: withAuth(),
    body: JSON.stringify({ managerId: managerId || null }),
  });

  if (!response.ok) throw new Error('Failed to assign manager');
  return response.json();
};
