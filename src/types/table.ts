export const TableStatus = {
  AVAILABLE: "AVAILABLE",
  IN_USE: "IN_USE",
  ENDING_SOON: "ENDING_SOON",
} as const;

export type TableStatus =
  (typeof TableStatus)[keyof typeof TableStatus];

// export interface Table {
//   id: number;
//   name: string;
//   status: TableStatus;
//   startTime?: number; // timestamp
//   endTime?: number;   // timestamp
// }

export interface Table {
  id: number;
  name: string;
  status: TableStatus;
  startTime?: number;
  endTime?: number;
  customerName?: string; // Tambahin ini
}

export type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
};
