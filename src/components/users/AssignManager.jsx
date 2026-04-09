import { useState } from 'react';

const AssignManager = ({ user, managers, onAssign }) => {
  const [managerId, setManagerId] = useState(user.managerId || '');

  return (
    <div className="assign-row">
      <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
        <option value="">No manager</option>
        {managers.map((manager) => (
          <option value={manager.id} key={manager.id}>
            {manager.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => onAssign(user.id, managerId)}>
        Assign
      </button>
    </div>
  );
};

export default AssignManager;
