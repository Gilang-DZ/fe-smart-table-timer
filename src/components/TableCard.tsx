import { useEffect, useRef, useState } from "react";
import { TableStatus } from "../types/table";
import type { Table } from "../types/table";

import StatusIndicator from "./StatusIndicator";
import CountdownTimer from "./CountdownTimer";
import ActionButtons from "./ActionButtons";
import BillingModal from "./BillingModal";

import {
  formatTime,
  getTimeLeft,
  getProgress,
  calculateCurrentPrice,
  getBorderColor,
} from "../utils";

interface TableCardProps {
  table: Table;
  onUpdate: (id: number, updates: Partial<Table>) => void;
}

export default function TableCard({ table, onUpdate }: TableCardProps) {
  const [now, setNow] = useState(Date.now());
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [isBillingOpen, setIsBillingOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isNameValid = customerNameInput.trim().length > 0;

  /* =====================
     START SESSION
  ===================== */
  const handleStart = (
    minutes: number,
    _price?: number,
    label?: string
  ) => {
    const trimmedName = customerNameInput.trim();

    if (!trimmedName) {
      setNameError("Customer name wajib diisi.");
      inputRef.current?.focus();
      return;
    }

    const start = Date.now();
    const end = start + minutes * 60000;

    onUpdate(table.id, {
      status: TableStatus.IN_USE,
      startTime: start,
      endTime: end,
      customerName: trimmedName,
      sessionLogs: [
        {
          type: "START",
          minutes,
          timestamp: start,
          label,
        },
      ],
    });

    setCustomerNameInput("");
    setNameError(null);
  };

  /* =====================
     EXTEND SESSION
  ===================== */
  const handleExtend = (minutes: number) => {
    if (!table.endTime) return;

    onUpdate(table.id, {
      endTime: table.endTime + minutes * 60000,
      sessionLogs: [
        ...(table.sessionLogs || []),
        {
          type: "EXTEND",
          minutes,
          timestamp: Date.now(),
        },
      ],
    });
  };

  /* =====================
     FINALIZE BILLING
  ===================== */
  const confirmBilling = () => {
    onUpdate(table.id, {
      status: TableStatus.AVAILABLE,
      startTime: undefined,
      endTime: undefined,
      customerName: undefined,
      sessionLogs: undefined,
    });

    setIsBillingOpen(false);
  };

  return (
    <>
      <div
        className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center h-full bg-[#121212] ${getBorderColor(
          table.status
        )} shadow-2xl`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-5 w-full">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">
              {table.name}
            </h3>
            <p className="text-[10px] font-bold text-neutral-500 mt-1 tracking-widest uppercase">
              {table.status !== TableStatus.AVAILABLE
                ? `User: ${table.customerName || "Guest"}`
                : "READY TO PLAY"}
            </p>
          </div>
          <StatusIndicator status={table.status} />
        </div>

        {/* PROGRESS */}
        {table.status !== TableStatus.AVAILABLE && (
          <div className="w-full mb-4">
            <div className="w-full h-1 bg-neutral-800/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  table.status === TableStatus.ENDING_SOON
                    ? "bg-amber-500"
                    : "bg-red-600"
                }`}
                style={{
                  width: `${getProgress(
                    table.startTime,
                    table.endTime,
                    now
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* INPUT */}
        {table.status === TableStatus.AVAILABLE && (
          <div className="w-full mb-5">
            <input
              ref={inputRef}
              type="text"
              placeholder="Customer Name..."
              value={customerNameInput}
              onChange={(e) => setCustomerNameInput(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
            />
            {nameError && (
              <p className="text-[10px] text-red-500 mt-1">
                {nameError}
              </p>
            )}
          </div>
        )}

        {/* TIMER */}
        <CountdownTimer
          timeLeft={getTimeLeft(table.endTime, now)}
          endTime={table.endTime}
          status={table.status}
        />

        {/* INFO + LOG */}
        {table.status !== TableStatus.AVAILABLE && (
          <div className="w-full mt-5 space-y-3">
            {/* CHECK IN / OUT */}
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <div className="bg-[#121212] p-3 text-center">
                <p className="text-[9px] text-neutral-500 uppercase font-bold">
                  Check In
                </p>
                <p className="text-sm text-neutral-200 font-mono font-bold">
                  {formatTime(table.startTime)}
                </p>
              </div>

              <div className="bg-[#121212] p-3 text-center">
                <p className="text-[9px] text-neutral-500 uppercase font-bold">
                  Check Out
                </p>
                <p className="text-sm text-neutral-200 font-mono font-bold">
                  {formatTime(table.endTime)}
                </p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="bg-neutral-900 rounded-xl p-3 flex justify-between items-center border border-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">
                Running Total
              </span>
              <span className="text-sm font-black text-green-500 font-mono">
                Rp{" "}
                {calculateCurrentPrice(
                  table.startTime,
                  table.endTime
                ).toLocaleString("id-ID")}
              </span>
            </div>

            {/* SESSION LOG */}
            {table.sessionLogs && table.sessionLogs.length > 0 && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 font-mono text-[10px] text-neutral-300">
                <p className="text-[9px] text-neutral-500 uppercase tracking-widest mb-2">
                  Session Log
                </p>

                <div className="space-y-1">
                  {table.sessionLogs.map((log, i) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {log.type === "START"
                          ? `START ${log.label ? `(${log.label})` : ""}`
                          : "EXTEND"}
                      </span>
                      <span>
                        +{log.minutes}m • {formatTime(log.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-auto w-full pt-6">
          <ActionButtons
            status={table.status}
            onStart={handleStart}
            onStop={() => setIsBillingOpen(true)}
            onExtend={handleExtend}
            disableStart={!isNameValid}
          />
        </div>
      </div>

      <BillingModal
        isOpen={isBillingOpen}
        table={table}
        onConfirm={confirmBilling}
        onCancel={() => setIsBillingOpen(false)}
      />
    </>
  );
}
