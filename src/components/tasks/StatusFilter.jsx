import React from 'react';
const StatusFilter = ({ value, onChange }) => {
  return (
    <label className="status-filter">
      <span>Status</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </label>
  );
};

export default StatusFilter;
