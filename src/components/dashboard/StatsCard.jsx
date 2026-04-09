const StatsCard = ({ title, value, tone = 'blue', wide = false }) => {
  return (
    <article className={`stats-card tone-${tone} ${wide ? 'wide' : ''}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </article>
  );
};

export default StatsCard;
