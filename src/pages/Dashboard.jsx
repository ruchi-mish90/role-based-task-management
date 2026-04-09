import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';

const Dashboard = () => {
  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>Overview</h2>
        <p>Quick snapshot of your role-based workspace.</p>
      </header>

      <SummaryCards />
    </div>
  );
};

export default Dashboard;
