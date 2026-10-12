import TaskItem from "./TaskItem.jsx";

// Renders one TaskItem per task (B1)
export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return <p className="muted">No tasks yet. Add one above.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
