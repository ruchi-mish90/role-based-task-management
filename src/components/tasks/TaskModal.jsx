import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  status: 'pending',
};

const TaskModal = ({ open, task, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
      });
      return;
    }

    setForm(emptyForm);
  }, [task]);

  if (!open) return null;

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <form className="glass-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSave}>
        <h3>{task ? 'Update Task' : 'Create Task'}</h3>

        <input
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Task title"
          required
        />

        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          placeholder="Task description"
        />

        <select value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="glow-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
