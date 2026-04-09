import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/authService';

const initialForm = { name: '', email: '', password: '' };

const Auth = () => {
  const { user, login } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response =
        mode === 'login'
          ? await loginUser({ email: form.email, password: form.password })
          : await registerUser({
              name: form.name,
              email: form.email,
              password: form.password,
              role: 'user',
            });
      login(response);
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>RBAC Task Manager</h1>
        <p>{mode === 'login' ? 'Sign in to continue.' : 'Create your account.'}</p>

        {mode === 'register' && (
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        )}

        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        {error && <p className="error-msg">{error}</p>}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
        </button>

        <button
          className="text-btn"
          type="button"
          onClick={() => {
            setMode((prev) => (prev === 'login' ? 'register' : 'login'));
            setError('');
          }}
        >
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
