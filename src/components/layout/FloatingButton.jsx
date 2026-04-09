import React from 'react';
const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button type="button" className="fab-btn" title="Go to tasks" onClick={() => navigate('/tasks')}>
      +
    </button>
  );
};

export default FloatingButton;
