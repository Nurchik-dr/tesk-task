export type StreamEvent =
  | { event: "token"; data: { delta: string } }
  | { event: "done"; data: any }
  | { event: "error"; data: { message: string } };

export type StreamStatus = "idle" | "streaming" | "done" | "error";
