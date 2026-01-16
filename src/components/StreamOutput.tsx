import React from "react";

interface StreamOutputProps {
  text: string;
}

const StreamOutput: React.FC<StreamOutputProps> = ({ text }) => {
  return (
    <div style={{ marginTop: "16px" }}>
      <h3>Streaming output</h3>
      <div
        style={{
          marginTop: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "8px",
          minHeight: "120px",
          maxHeight: "240px",
          overflow: "auto",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        {text || <span style={{ color: "#999" }}>Waiting for stream...</span>}
      </div>
    </div>
  );
};

export default StreamOutput;
