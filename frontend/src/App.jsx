import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, addTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // B2: fetch all tasks once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // B3: POST the new task, then append it to state (no reload)
  const handleAdd = async (title) => {
    try {
      setError("");
      const created = await addTask(title);
      setTasks((prev) => [...prev, created]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B4: PUT the changed fields, then replace that task in state
  const handleUpdate = async (id, changes) => {
    try {
      setError("");
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B5: DELETE on the server, then drop it from state
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="container">
      <h1>To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted">Loading tasks...</p>
      ) : (
        <>
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          <p className="muted">{remaining} of {tasks.length} tasks remaining</p>
        </>
      )}
    </main>
  );
}
