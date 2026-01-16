import type { VisualizationSpec } from "vega-lite";

interface ExtractResult {
  spec: VisualizationSpec | null;
  error: string | null;
}

/**
 * Пытаемся вытащить Vega-Lite JSON из произвольного текста.
 * Может быть разбит на чанки и/или обёрнут в ```json.
 */
export function tryExtractVegaSpecFromText(text: string): ExtractResult {
  // убираем возможные ```json и ```
  const cleaned = text.replace(/```json|```/g, "");

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return { spec: null, error: null }; // ещё рано
  }

  const candidate = cleaned.slice(firstBrace, lastBrace + 1);

  try {
    const parsed = JSON.parse(candidate);
    return { spec: parsed as VisualizationSpec, error: null };
  } catch {
    // парс не удался — но приложение не падает, просто ждём дальше
    return { spec: null, error: null };
  }
}

/**
 * Простая валидация: наличие mark и encoding.
 */
export function validateVegaSpec(
  spec: VisualizationSpec | null
): string | null {
  if (!spec) return "Empty spec";

  const anySpec = spec as any;

  if (!anySpec.mark) {
    return "Vega spec is missing 'mark'";
  }
  if (!anySpec.encoding) {
    return "Vega spec is missing 'encoding'";
  }

  return null;
}
