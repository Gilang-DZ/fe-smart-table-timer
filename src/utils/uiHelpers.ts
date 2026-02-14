import { TableStatus } from "../types/table";

/* =====================
   UI HELPERS
===================== */

export const getBorderColor = (status: TableStatus): string => {
  switch (status) {
    case TableStatus.AVAILABLE:
      return "border-green-500/20 shadow-green-500/5";

    case TableStatus.ENDING_SOON:
      return "border-amber-500 animate-pulse shadow-amber-500/20";

    case TableStatus.IN_USE:
      return "border-red-500/40 shadow-red-500/5";

    default:
      return "border-neutral-800";
  }
};
