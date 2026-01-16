import React from "react";
import type { StreamEvent } from "../types";

interface FileLoaderProps {
  onLoaded: (events: StreamEvent[]) => void;
}

const FileLoader: React.FC<FileLoaderProps> = ({ onLoaded }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const text = String(reader.result || "");
      const lines = text.split("\n").filter(Boolean);

      const events: StreamEvent[] = [];

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          events.push(parsed as StreamEvent);
        } catch (err) {
          console.error("Failed to parse line:", line, err);
        }
      }

      onLoaded(events);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <label>
        <span>Load dump (.jsonl): </span>
        <input type="file" accept=".jsonl" onChange={handleChange} />
      </label>
    </div>
  );
};

export default FileLoader;
