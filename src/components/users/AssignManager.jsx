import React, { useEffect, useState } from 'react';

const AssignManager = ({ user, managers, onAssign }) => {
  const [managerId, setManagerId] = useState(user.managerId || '');

  useEffect(() => {
    setManagerId(user.managerId || '');
  }, [user.managerId]);

  return (
    <div className="assign-row">
      <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
        <option value="">No manager</option>
        {managers.map((manager) => (
          <option value={manager._id} key={manager._id}>
            {manager.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => onAssign(user._id, managerId)}>
        Assign
      </button>
    </div>
  );
};

export default AssignManager;
