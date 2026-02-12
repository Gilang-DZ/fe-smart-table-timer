import { useEffect, useState } from "react";
import { TableStatus } from "../types/table";
import type { Table } from "../types/table";
import StatusIndicator from "./StatusIndicator";
import CountdownTimer from "./CountdownTimer";
import ActionButtons from "./ActionButtons";

interface TableCardProps {
  table: Table;
  onUpdate: (id: number, updates: Partial<Table>) => void;
}

export default function TableCard({ table, onUpdate }: TableCardProps) {
  const [now, setNow] = useState(Date.now());
  const [customMinutes, setCustomMinutes] = useState<number>(30);
  const [showCustom, setShowCustom] = useState(false);

  // 🔥 UI refresh only
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeLeft = () => {
    if (!table.endTime) return "--:--";

    const diff = table.endTime - now;

    if (diff <= 0) return "00:00";

    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = (minutes: number) => {
    const start = Date.now();
    const end = start + minutes * 60000;

    onUpdate(table.id, {
      status: TableStatus.IN_USE,
      startTime: start,
      endTime: end,
    });

    setShowCustom(false);
  };

  const handleStop = () => {
    setShowCustom(false);
    setCustomMinutes(30);

    onUpdate(table.id, {
      status: TableStatus.AVAILABLE,
      startTime: undefined,
      endTime: undefined,
    });
  };

  const handleExtend = (minutes: number) => {
    if (!table.endTime) return;

    onUpdate(table.id, {
      endTime: table.endTime + minutes * 60000,
    });
  };

  const getBorderColor = () => {
    switch (table.status) {
      case TableStatus.AVAILABLE:
        return "border-[#22c55e]";
      case TableStatus.ENDING_SOON:
        return "border-[#f59e0b]";
      case TableStatus.IN_USE:
        return "border-[#ef4444]";
      default:
        return "border-[#262626]";
    }
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center h-full bg-[#171717] ${getBorderColor()} shadow-lg`}
    >
      <div className="flex justify-between items-center mb-6 w-full">
        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
          {table.name}
        </h3>
        <StatusIndicator status={table.status} />
      </div>

      <CountdownTimer
        timeLeft={getTimeLeft()}
        endTime={table.endTime}
        status={table.status}
      />

      <ActionButtons
        status={table.status}
        onStart={handleStart}
        onStop={handleStop}
        onExtend={handleExtend}
        showCustom={showCustom}
        setShowCustom={setShowCustom}
        customMinutes={customMinutes}
        setCustomMinutes={setCustomMinutes}
      />
    </div>
  );
}
