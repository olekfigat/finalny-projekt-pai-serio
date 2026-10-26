import React from "react";

export function PriorityBadge({ priority }) {
  return (
    <span className={`badge badge-${priority.toLowerCase()}`}>{priority}</span>
  );
}
