import StatsCard from './StatsCard';

const SummaryCards = () => {
  return (
    <section className="summary-grid fade-up">
      <StatsCard title="Pending" value="14" tone="amber" wide />
      <StatsCard title="In Progress" value="8" tone="blue" />
      <StatsCard title="Completed" value="31" tone="green" />
      <StatsCard title="Assigned Today" value="5" tone="purple" />
    </section>
  );
};

export default SummaryCards;
