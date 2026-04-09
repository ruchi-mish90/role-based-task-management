import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useAuth();

  const items = useMemo(() => {
    const base = [
      { to: '/', icon: '◻', label: 'Dash' },
      { to: '/tasks', icon: '✓', label: 'Tasks' },
      { to: '/analytics', icon: '📊', label: 'Analytics' },
    ];

    if (user?.role === 'admin') {
      base.push({ to: '/users', icon: '◎', label: 'Users' });
    }

    return base;
  }, [user?.role]);

  return (
    <aside className={`mini-sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <button className="collapse-toggle" onClick={() => setCollapsed((s) => !s)} type="button">
        {collapsed ? '»' : '«'}
      </button>

      <div className="sidebar-links">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className="side-link">
            <span>{item.icon}</span>
            {!collapsed && <small>{item.label}</small>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
