import React from "react";
import type { StreamStatus } from "../types";

interface StatusBadgeProps {
  status: StreamStatus;
}

const COLORS: Record<StreamStatus, string> = {
  idle: "#888",
  streaming: "#1e88e5",
  done: "#2e7d32",
  error: "#c62828",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: "999px",
        fontSize: "12px",
        color: "#fff",
        background: COLORS[status],
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
