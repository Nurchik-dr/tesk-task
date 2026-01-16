import React, { useEffect, useRef } from "react";
import embed from "vega-embed";
import type { VisualizationSpec } from "vega-lite";

interface VegaPreviewProps {
  spec: VisualizationSpec | null;
}

const SAMPLE_DATA = [
  { region: "Almaty", revenue: 120 },
  { region: "Astana", revenue: 90 },
  { region: "Shymkent", revenue: 70 },
];

const VegaPreview: React.FC<VegaPreviewProps> = ({ spec }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!spec || !containerRef.current) return;

    const fullSpec: VisualizationSpec = {
      ...spec,
      data: spec.data ?? { values: SAMPLE_DATA }
    };

    embed(containerRef.current, fullSpec, { actions: false }).catch((err: unknown) => {
      console.error(err);
    });

  }, [spec]);

  return (
    <div style={{ marginTop: "16px" }}>
      <h3>Vega chart preview</h3>
      <div
        ref={containerRef}
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "8px",
          minHeight: "200px",
          color: "#ccc"
        }}
      >
        {!spec && "Vega spec not found in stream yet"}
      </div>
    </div>
  );
};

export default VegaPreview;
