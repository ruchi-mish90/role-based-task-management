import React, { useMemo, useState } from 'react';
import Pagination from '../components/tasks/Pagination';
import SearchBar from '../components/tasks/SearchBar';
import StatusFilter from '../components/tasks/StatusFilter';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';

const demoTasks = [
  { _id: 't1', title: 'Finish API docs', description: 'Write endpoint docs for manager view', status: 'pending' },
  { _id: 't2', title: 'Refactor auth', description: 'Clean middleware naming and logs', status: 'in-progress' },
  { _id: 't3', title: 'Push deployment', description: 'Ship on Friday with smoke checks', status: 'completed' },
];

const Tasks = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState(demoTasks);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = status ? task.status === status : true;
      const searchMatch = `${task.title} ${task.description}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [tasks, search, status]);

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const sliced = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSaveTask = (payload) => {
    if (editingTask) {
      setTasks((prev) => prev.map((task) => (task._id === editingTask._id ? { ...task, ...payload } : task)));
    } else {
      setTasks((prev) => [{ _id: `t${Date.now()}`, ...payload }, ...prev]);
    }

    setOpenModal(false);
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>Tasks</h2>
        <p>Search, filter, and manage tasks with smooth interactions.</p>
      </header>

      <section className="toolbar glass-strip">
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter value={status} onChange={setStatus} />
        <button className="glow-btn" type="button" onClick={() => setOpenModal(true)}>
          + New Task
        </button>
      </section>

      <TaskList tasks={sliced} onEdit={startEdit} onDelete={handleDelete} />
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />

      <TaskModal
        open={openModal}
        task={editingTask}
        onClose={() => {
          setOpenModal(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
      />
    </div>
  );
};

export default Tasks;
