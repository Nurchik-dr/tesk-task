import type { TopLevelSpec } from "vega-lite";

interface ExtractResult {
  spec: TopLevelSpec | null;
  error: string | null;
}

export function tryExtractVegaSpecFromText(text: string): ExtractResult {
  const cleaned = text.replace(/```json|```/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return { spec: null, error: null };
  }

  const candidate = cleaned.slice(start, end + 1);

  try {
    const parsed = JSON.parse(candidate);
    return { spec: parsed as TopLevelSpec, error: null };
  } catch {
    return { spec: null, error: null };
  }
}

export function validateVegaSpec(spec: TopLevelSpec | null): string | null {
  if (!spec) return "Empty spec";

  const anySpec = spec as any;

  if (!anySpec.mark) return "Vega spec missing 'mark'";
  if (!anySpec.encoding) return "Vega spec missing 'encoding'";

  return null;
}
