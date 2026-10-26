import React from "react";
import { PriorityBadge } from "./PriorityBadge";

export function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? "done" : ""}`}>
      <div>
        <h4>{task.title}</h4>
        <div className="meta">
          <span>{task.category}</span>
          <PriorityBadge priority={task.priority} />
          <span>{task.completed ? "✓ Zakończone" : "⏳ W trakcie"}</span>
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>Edytuj</button>
        <button className="btn btn-danger" onClick={() => onDelete(task)}>Usuń</button>
      </div>
    </div>
  );
}
