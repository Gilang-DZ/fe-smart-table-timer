/* =====================
   TIME HELPERS
===================== */

export const formatTime = (timestamp?: number): string => {
  if (!timestamp) return "--:--";

  return new Date(timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeLeft = (
  endTime?: number,
  now: number = Date.now()
): string => {
  if (!endTime) return "--:--";

  const diff = endTime - now;
  if (diff <= 0) return "00:00";

  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const getProgress = (
  startTime?: number,
  endTime?: number,
  now: number = Date.now()
): number => {
  if (!startTime || !endTime) return 0;

  const total = endTime - startTime;
  const elapsed = now - startTime;

  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
};
