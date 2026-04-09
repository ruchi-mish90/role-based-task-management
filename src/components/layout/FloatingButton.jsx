import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="fab-btn"
      title="Go to tasks"
      onClick={() => navigate('/tasks')}
    >
      +
    </button>
  );
};

export default FloatingButton;