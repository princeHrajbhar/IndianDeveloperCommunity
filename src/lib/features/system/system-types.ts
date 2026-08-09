export type QueueJobState =
  | "waiting"
  | "active"
  | "completed"
  | "failed"
  | "delayed"
  | "paused"
  | "prioritized"
  | "waiting-children";

export interface QueueSummary {
  name: string;
  displayName: string;
  description?: string;
  kind: string;
  paused: boolean;
  counts: Record<QueueJobState, number>;
}

export interface QueueJob {
  id?: string;
  name: string;
  state: QueueJobState;
  data?: Record<string, unknown>;
  to?: string;
  subject?: string;
  template?: string;
  attemptsMade: number;
  attempts?: number;
  failedReason?: string;
  timestamp: number;
  processedOn?: number;
  finishedOn?: number;
  delay: number;
  progress?: unknown;
  priority?: number;
}
