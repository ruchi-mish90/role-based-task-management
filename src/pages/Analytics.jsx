import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from 'recharts';
import { fetchAnalytics } from '../services/taskService';

const STATUS_COLORS = {
  pending: '#d97706',
  'in-progress': '#2563eb',
  completed: '#15803d',
};

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

const Analytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error-msg">{error}</p>;
  if (!data) return <p className="empty-msg">Loading analytics...</p>;

  const pieData = data.statusCounts.map((s) => ({
    name: s._id,
    value: s.count,
  }));

  const lineData = data.daily.map((d) => ({
    date: d._id.slice(5), // MM-DD
    tasks: d.count,
  }));

  const barData = data.leaderboard.map((u) => ({
    name: u.name,
    completed: u.completed,
  }));

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>Analytics</h2>
        <p>Progress overview and user rankings.</p>
      </header>

      <div className="analytics-grid">
        {/* Status Breakdown */}
        <div className="chart-card">
          <h4>Task Status Breakdown</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#6b7280'} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity */}
        <div className="chart-card">
          <h4>Tasks Created (Last 14 Days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Bar Chart */}
        <div className="chart-card chart-card--wide">
          <h4>Leaderboard — Completed Tasks</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="completed" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranking Table */}
        <div className="chart-card chart-card--wide">
          <h4>User Rankings</h4>
          {data.leaderboard.length === 0 ? (
            <p className="empty-msg">No completed tasks yet.</p>
          ) : (
            <table className="rank-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {data.leaderboard.map((u, i) => (
                  <tr key={u._id} className={i === 0 ? 'rank-top' : ''}>
                    <td>{RANK_MEDALS[i] || `#${i + 1}`}</td>
                    <td>{u.name}</td>
                    <td><span className={`role-pill role-${u.role}`}>{u.role}</span></td>
                    <td><strong>{u.completed}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
