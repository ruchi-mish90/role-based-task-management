import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <p className="empty-msg">No tasks found for this view.</p>;
  }

  return (
    <section className="task-grid fade-up">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
};

export default TaskList;
