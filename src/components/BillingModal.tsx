import React from "react";
import type { Table } from "../types/table";
import { formatTime, calculateCurrentPrice } from "../utils";

interface BillingModalProps {
  isOpen: boolean;
  table: Table;
  onConfirm: () => void;
  onCancel: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({
  isOpen,
  table,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !table.startTime) return null;

  const now = Date.now();
  const finalEndTime =
    table.endTime && table.endTime > now ? table.endTime : now;

  const durationMs = finalEndTime - table.startTime;
  const durationMinutes = Math.ceil(durationMs / 60000);

  const totalPrice = calculateCurrentPrice(
    table.startTime,
    finalEndTime
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-[#262626] shadow-2xl p-6">
        <h2 className="text-xl font-black text-white mb-5 uppercase tracking-tight">
          Billing Summary
        </h2>

        <div className="space-y-3 text-sm">
          <Row label="Table" value={table.name} />
          <Row label="Customer" value={table.customerName || "Guest"} />
          <Row label="Check In" value={formatTime(table.startTime)} />
          <Row label="Check Out" value={formatTime(finalEndTime)} />
          <Row label="Duration" value={`${durationMinutes} minutes`} />
        </div>

        <div className="mt-6 bg-gradient-to-r from-neutral-900 to-black border border-white/5 rounded-xl p-4 flex justify-between items-center">
          <span className="text-xs text-neutral-400 font-bold uppercase">
            Total
          </span>
          <span className="text-lg font-black text-green-500 font-mono">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="bg-[#262626] text-[#737373] font-black py-3 rounded-xl text-xs uppercase tracking-widest"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-black py-3 rounded-xl text-xs uppercase tracking-widest"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-neutral-300">
    <span className="text-neutral-500 font-bold uppercase text-[10px]">
      {label}
    </span>
    <span className="font-mono font-bold">{value}</span>
  </div>
);

export default BillingModal;
