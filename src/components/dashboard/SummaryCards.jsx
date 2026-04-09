import React from 'react';
import StatsCard from './StatsCard';

const SummaryCards = ({ stats }) => {
  return (
    <section className="summary-grid">
      <StatsCard title="Total Tasks" value={stats.total} tone="blue" />
      <StatsCard title="Pending" value={stats.pending} tone="amber" />
      <StatsCard title="In Progress" value={stats.inProgress} tone="purple" />
      <StatsCard title="Completed" value={stats.completed} tone="green" />
    </section>
  );
};

export default SummaryCards;
