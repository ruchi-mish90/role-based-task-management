import React, { useEffect, useState } from "react";
import SummaryCards from '../components/dashboard/SummaryCards';
import { fetchTasks } from '../services/taskService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchTasks({ page: 1, limit: 100 });
        const tasks = response.tasks || [];
        setStats({
          total: response.total || tasks.length,
          pending: tasks.filter((task) => task.status === 'pending').length,
          inProgress: tasks.filter((task) => task.status === 'in-progress').length,
          completed: tasks.filter((task) => task.status === 'completed').length,
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>Overview</h2>
        <p>Quick snapshot of current task status.</p>
      </header>

      {loading ? <p className="empty-msg">Loading dashboard...</p> : <SummaryCards stats={stats} />}
    </div>
  );
};

export default Dashboard;