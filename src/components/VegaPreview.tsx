import React, { useEffect, useRef } from "react";
import embed from "vega-embed";
import type { TopLevelSpec } from "vega-lite";

interface VegaPreviewProps {
  spec: TopLevelSpec | null;
}

const SAMPLE_DATA = [
  { region: "Almaty", revenue: 120 },
  { region: "Astana", revenue: 90 },
  { region: "Shymkent", revenue: 70 }
];

const VegaPreview: React.FC<VegaPreviewProps> = ({ spec }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!spec || !containerRef.current) return;

    const fullSpec: TopLevelSpec = {
      ...spec,
      data: spec.data ?? { values: SAMPLE_DATA }
    };

    embed(containerRef.current, fullSpec, { actions: false })
      .catch((err: unknown) => {
        console.error("Vega embed error:", err);
      });
  }, [spec]);

  return (
    <div
      className="vega-preview"
      ref={containerRef}
    >
      {!spec && <span className="hint">Vega spec not found in stream yet</span>}
    </div>
  );
};

export default VegaPreview;
