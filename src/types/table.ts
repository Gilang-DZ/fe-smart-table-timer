export const TableStatus = {
  AVAILABLE: "AVAILABLE",
  IN_USE: "IN_USE",
  ENDING_SOON: "ENDING_SOON",
} as const;

export type TableStatus =
  (typeof TableStatus)[keyof typeof TableStatus];

export interface SessionLog {
  type: "START" | "EXTEND";
  minutes: number;
  timestamp: number;
  label?: string;
}

export interface Table {
  id: number;
  name: string;
  status: TableStatus;
  startTime?: number;
  endTime?: number;
  customerName?: string;
  sessionLogs?: SessionLog[]; // 🔥 NEW
}

export type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
};
