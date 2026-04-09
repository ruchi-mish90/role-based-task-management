import React, { useMemo, useState } from 'react';
import Pagination from '../components/tasks/Pagination';
import SearchBar from '../components/tasks/SearchBar';
import StatusFilter from '../components/tasks/StatusFilter';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { createTask, fetchTasks, removeTask, updateTask } from '../services/taskService';

const PAGE_SIZE = 6;

const Tasks = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchTasks({ search, status, page, limit: PAGE_SIZE });
      setTasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
    } catch (loadError) {
      setError(loadError.message || 'Could not load tasks');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSaveTask = async (payload) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, payload);
      } else {
        await createTask(payload);
      }

      setOpenModal(false);
      setEditingTask(null);
      await loadTasks();
    } catch (saveError) {
      setError(saveError.message || 'Could not save task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      await loadTasks();
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete task');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>Tasks</h2>
        <p>Create, filter, and manage tasks.</p>
      </header>

      <section className="toolbar panel">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <StatusFilter
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />
        <button className="primary-btn" type="button" onClick={() => setOpenModal(true)}>
          + New Task
        </button>
      </section>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p className="empty-msg">Loading tasks...</p>
      ) : (
        <>
          <TaskList tasks={tasks} onEdit={startEdit} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </>
      )}

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
