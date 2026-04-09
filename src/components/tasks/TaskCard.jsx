import React from 'react';
const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <article className="task-card">
      <div className="task-head">
        <h4>{task.title}</h4>
        <span className={`status-badge ${task.status}`}>{task.status}</span>
      </div>
      <p>{task.description}</p>

      <div className="task-actions">
        <button type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(task._id)} className="danger">
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
