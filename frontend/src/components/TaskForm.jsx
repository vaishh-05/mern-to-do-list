import { useState } from "react";

// Controlled input + submit button for adding a task (B3)
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();               // stop the browser page reload
    if (!title.trim()) return;
    const ok = await onAdd(title);
    if (ok) setTitle("");             // clear input only on success
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="What needs to be done?"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
