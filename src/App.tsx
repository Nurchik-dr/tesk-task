import React, { useState } from "react";
import FileLoader from "./components/FileLoader";
import Controls from "./components/Controls";
import StatusBadge from "./components/StatusBadge";
import VegaPreview from "./components/VegaPreview";
import { useStreamPlayer } from "./hooks/useStreamPlayer";
import type { StreamEvent } from "./types";
import { tryExtractVegaSpecFromText, validateVegaSpec } from "./utils/vegaSpec";
import type { TopLevelSpec } from "vega-lite";
import "./App.css";

const App: React.FC = () => {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [vegaSpec, setVegaSpec] = useState<TopLevelSpec | null>(null);
  const [vegaValidationError, setVegaValidationError] = useState<string | null>(
    null
  );

  const { status, output, errorMessage, play, stop } = useStreamPlayer(events, {
    onTextUpdate: (text) => {
      const { spec } = tryExtractVegaSpecFromText(text);
      if (spec) {
        const validationError = validateVegaSpec(spec);
        if (validationError) {
          setVegaValidationError(validationError);
        } else {
          setVegaValidationError(null);
          setVegaSpec(spec);
        }
      }
    },
  });

  const handleFileLoaded = (loadedEvents: StreamEvent[]) => {
    setEvents(loadedEvents);
    setVegaSpec(null);
    setVegaValidationError(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">AI Explore</h1>
      <p className="app-subtitle">Эмуляция LLM streaming и рендер Vega-Lite спек.</p>

      <div className="file-input-wrapper">
        <FileLoader onLoaded={handleFileLoaded} />
      </div>

      <div className="controls-row">
        <Controls
          canPlay={!!events.length && status !== "streaming"}
          onPlay={play}
          onStop={stop}
        />

        <div className="status">
          <span>Status:</span>
          <StatusBadge status={status} />
        </div>
      </div>

      {errorMessage && (
        <p className="hint" style={{ color: "#ef4444", marginTop: "8px" }}>
          {errorMessage}
        </p>
      )}

      {vegaValidationError && (
        <p className="hint" style={{ color: "#f59e0b", marginTop: "8px" }}>
          Vega validation: {vegaValidationError}
        </p>
      )}

      <div className="card">
        <div className="card-title">Streaming output</div>
        <div className="stream-output">
          {output || <span className="hint">Waiting for stream...</span>}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Vega chart preview</div>
        <VegaPreview spec={vegaSpec} />
      </div>
    </div>
  );
};

export default App;
