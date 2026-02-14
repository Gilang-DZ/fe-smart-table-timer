/* =====================
   PRICING HELPERS
===================== */

export const PRICE_PER_HOUR = 50000;

export const calculateCurrentPrice = (
  startTime?: number,
  endTime?: number
): number => {
  if (!startTime || !endTime) return 0;

  const durationInHours = (endTime - startTime) / 3600000;
  return Math.round(durationInHours * PRICE_PER_HOUR);
};
