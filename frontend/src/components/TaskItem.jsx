import { useState } from "react";

// One row: checkbox (B4), title with strike-through, edit, delete (B5)
export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const saveEdit = async () => {
    if (draft.trim() === task.title) return setEditing(false);
    const ok = await onUpdate(task._id, { title: draft });
    if (ok) setEditing(false);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />

      {editing ? (
        <>
          <input
            className="edit-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          />
          <button onClick={saveEdit}>Save</button>
          <button className="secondary" onClick={() => { setDraft(task.title); setEditing(false); }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className={task.completed ? "title done" : "title"}>{task.title}</span>
          <button className="secondary" onClick={() => setEditing(true)}>Edit</button>
          <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </li>
  );
}
