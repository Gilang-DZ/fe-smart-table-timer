import React, { useEffect, useState } from "react";
import { TableStatus } from "../types/table";

interface ActionButtonsProps {
  status: TableStatus;
  onStart: (mins: number, price?: number, label?: string) => void;
  onStop: () => void;
  onExtend: (mins: number) => void;
  disableStart?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onStart,
  onStop,
  onExtend,
  disableStart = false,
}) => {
  /* =========================
     REAL TIME CLOCK
  ========================== */
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000); // realtime update

    return () => clearInterval(interval);
  }, []);

  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  /* =========================
     PACKAGE TIME RULES
  ========================== */
  const SIANG_START = 10 * 60; // 10:00
  const SIANG_END = 18 * 60;   // 18:00

  const MALAM_START = 18 * 60; // 18:00
  const MALAM_END = 3 * 60;    // 03:00 (next day)

  const isSiang =
    totalMinutes >= SIANG_START && totalMinutes < SIANG_END;

  const isMalam =
    totalMinutes >= MALAM_START || totalMinutes < MALAM_END;

  const siangDisabled = disableStart || !isSiang;
  const malamDisabled = disableStart || !isMalam;

  /* =========================
     COUNTDOWN (ACTIVE ONLY)
  ========================== */
  const getRemaining = (end: number) => {
    let diff = end - totalMinutes;
    if (diff < 0) diff += 24 * 60;

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    return `${h}j ${m}m`;
  };

  const siangRemaining = isSiang ? getRemaining(SIANG_END) : null;
  const malamRemaining = isMalam ? getRemaining(MALAM_END) : null;

  const isSiangEndingSoon =
    isSiang && SIANG_END - totalMinutes <= 30;

  const isMalamEndingSoon =
    isMalam &&
    ((MALAM_END - totalMinutes + 1440) % 1440) <= 30;

  /* =========================
     AVAILABLE
  ========================== */
  if (status === TableStatus.AVAILABLE) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-2 gap-2">

          {/* 1 HOUR */}
          <button
            disabled={disableStart}
            onClick={() => onStart(60)}
            className={`font-black py-4 rounded-lg text-xs uppercase transition-all ${
              disableStart
                ? "bg-neutral-700 text-neutral-500"
                : "bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16]"
            }`}
          >
            1 Hour
          </button>

          {/* 2 HOURS */}
          <button
            disabled={disableStart}
            onClick={() => onStart(120)}
            className={`font-black py-4 rounded-lg text-xs uppercase transition-all ${
              disableStart
                ? "bg-neutral-700 text-neutral-500"
                : "bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16]"
            }`}
          >
            2 Hours
          </button>

          {/* 🌞 PAKET SIANG */}
          <button
            disabled={siangDisabled}
            onClick={() => onStart(180, 100000, "Paket Siang")}
            className={`relative font-black py-4 rounded-lg text-xs uppercase transition-all ${
              siangDisabled
                ? "bg-neutral-800 text-neutral-600"
                : "bg-[#facc15] text-black shadow-lg animate-pulse"
            }`}
          >
            Paket Siang
            <span className="block text-[9px] font-bold">
              3 JAM • 100K
            </span>

            {isSiang && (
              <>
                <span className="block text-[8px] font-bold mt-1">
                  ACTIVE NOW
                </span>
                <span className="block text-[8px] opacity-80">
                  Sisa: {siangRemaining}
                </span>
                {isSiangEndingSoon && (
                  <span className="block text-[8px] text-red-600 font-bold">
                    ⚠ Ending Soon
                  </span>
                )}
              </>
            )}
          </button>

          {/* 🌙 PAKET MALAM */}
          <button
            disabled={malamDisabled}
            onClick={() => onStart(180, 110000, "Paket Malam")}
            className={`relative font-black py-4 rounded-lg text-xs uppercase transition-all ${
              malamDisabled
                ? "bg-neutral-800 text-neutral-600"
                : "bg-[#a855f7] text-white shadow-lg animate-pulse"
            }`}
          >
            Paket Malam
            <span className="block text-[9px] font-bold">
              3 JAM • 110K
            </span>

            {isMalam && (
              <>
                <span className="block text-[8px] font-bold mt-1">
                  ACTIVE NOW
                </span>
                <span className="block text-[8px] opacity-80">
                  Sisa: {malamRemaining}
                </span>
                {isMalamEndingSoon && (
                  <span className="block text-[8px] text-red-400 font-bold">
                    ⚠ Ending Soon
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     IN USE
  ========================== */
  return (
    <div className="space-y-2 w-full">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onExtend(30)}
          className="bg-[#262626] hover:bg-[#333333] text-[#e5e5e5] font-black py-3.5 rounded-lg text-[10px]"
        >
          +30m
        </button>

        <button
          onClick={() => onExtend(60)}
          className="bg-[#262626] hover:bg-[#333333] text-[#e5e5e5] font-black py-3.5 rounded-lg text-[10px]"
        >
          +60m
        </button>
      </div>

      <button
        onClick={onStop}
        className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-[#450a0a] font-black py-4 rounded-lg text-xs shadow-lg"
      >
        Stop Session
      </button>
    </div>
  );
};

export default ActionButtons;
