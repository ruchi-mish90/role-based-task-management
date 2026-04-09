import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import FloatingButton from './components/layout/FloatingButton';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Auth from './pages/Auth';
import Analytics from './pages/Analytics';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  const canViewUsers = user?.role === 'admin';

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />
      <Sidebar />

      <main className="main-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="/users" element={canViewUsers ? <Users /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <FloatingButton />
    </div>
  );
};

export default App;
