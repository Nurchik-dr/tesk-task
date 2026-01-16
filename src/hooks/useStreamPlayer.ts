import { useCallback, useRef, useState } from "react";
import type { StreamEvent, StreamStatus } from "../types";
import { randomDelay, sleep } from "../utils/sleep";

interface UseStreamPlayerOptions {
  onTextUpdate?: (fullText: string) => void;
}

interface UseStreamPlayerResult {
  status: StreamStatus;
  output: string;
  errorMessage: string | null;
  play: () => Promise<void>;
  stop: () => void;
}

export function useStreamPlayer(
  events: StreamEvent[],
  options?: UseStreamPlayerOptions
): UseStreamPlayerResult {
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stopRef = useRef(false);

  const play = useCallback(async () => {
    if (!events.length || status === "streaming") return;

    stopRef.current = false;
    setStatus("streaming");
    setOutput("");
    setErrorMessage(null);

    let text = "";

    for (const ev of events) {
      if (stopRef.current) {
        setStatus("idle");
        return;
      }

      if (ev.event === "token") {
        text += ev.data.delta;
        setOutput(text);
        options?.onTextUpdate?.(text);
      } else if (ev.event === "error") {
        setStatus("error");
        setErrorMessage(ev.data?.message ?? "Unknown error");
        return;
      } else if (ev.event === "done") {
        setStatus("done");
        break;
      }

      await sleep(randomDelay(50, 150));
    }

    if (!stopRef.current && status !== "error") {
      setStatus("done");
    }
  }, [events, options, status]);

  const stop = useCallback(() => {
    stopRef.current = true;
    setStatus("idle");
  }, []);

  return { status, output, errorMessage, play, stop };
}
