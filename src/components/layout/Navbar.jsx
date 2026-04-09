import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const pageNames = {
  '/': 'Dashboard',
  '/tasks': 'Tasks',
  '/users': 'Users',
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-float fade-down">
      <div className="nav-left">
        <p className="brand-title">RBAC Task Manager</p>
        <span className="brand-sub">Internal team workspace</span>
      </div>

      <div className="nav-center">{pageNames[pathname] || 'Workspace'}</div>

      <div className="nav-right">
        <span className={`role-pill role-${user?.role || 'user'}`}>{user?.role || 'guest'}</span>
        <button className="chip-btn" type="button">
          <span className="avatar-dot" />
          {user?.name || 'Visitor'}
        </button>
        <button className="logout-btn" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
