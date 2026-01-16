import React from "react";

interface ControlsProps {
    canPlay: boolean;   // можно ли нажать Play
    onPlay: () => void; // действие при Play
    onStop: () => void; // действие при Stop
}

const Controls: React.FC<ControlsProps> = ({ canPlay, onPlay, onStop }) => {
    return (
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <button
                className="btn btn-play"
                disabled={!canPlay}
                onClick={onPlay}
            >
                ▶ Play
            </button>

            <button
                className="btn btn-stop"
                onClick={onStop}
            >
                ⏹ Stop
            </button>

        </div>
    );
};

export default Controls;
