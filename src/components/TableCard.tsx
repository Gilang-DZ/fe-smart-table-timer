// import { useEffect, useState } from "react";
// import { TableStatus } from "../types/table";
// import type { Table } from "../types/table";
// import StatusIndicator from "./StatusIndicator";
// import CountdownTimer from "./CountdownTimer";
// import ActionButtons from "./ActionButtons";

// // --- KONFIGURASI HARGA (Bisa disesuaikan) ---
// const PRICE_PER_HOUR = 50000; 

// interface TableCardProps {
//   table: Table;
//   onUpdate: (id: number, updates: Partial<Table>) => void;
// }

// export default function TableCard({ table, onUpdate }: TableCardProps) {
//   const [now, setNow] = useState(Date.now());
//   const [customMinutes, setCustomMinutes] = useState<number>(30);
//   const [showCustom, setShowCustom] = useState(false);
//   const [customerNameInput, setCustomerNameInput] = useState("");

//   // 🔥 Loop untuk update UI (Timer & Progress Bar) setiap detik
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNow(Date.now());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // --- HELPERS ---
//   const formatTime = (timestamp?: number) => {
//     if (!timestamp) return "--:--";
//     return new Date(timestamp).toLocaleTimeString("id-ID", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getProgress = () => {
//     if (!table.startTime || !table.endTime) return 0;
//     const total = table.endTime - table.startTime;
//     const elapsed = now - table.startTime;
//     const percentage = (elapsed / total) * 100;
//     return Math.min(Math.max(percentage, 0), 100);
//   };

//   const calculateCurrentPrice = () => {
//     if (!table.startTime || !table.endTime) return 0;
//     const durationInHours = (table.endTime - table.startTime) / 3600000;
//     return Math.round(durationInHours * PRICE_PER_HOUR);
//   };

//   const getTimeLeft = () => {
//     if (!table.endTime) return "--:--";
//     const diff = table.endTime - now;
//     if (diff <= 0) return "00:00";
//     const mins = Math.floor(diff / 60000);
//     const secs = Math.floor((diff % 60000) / 1000);
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   // --- HANDLERS ---
//   const handleStart = (minutes: number) => {
//     const start = Date.now();
//     const end = start + minutes * 60000;
//     onUpdate(table.id, {
//       status: TableStatus.IN_USE,
//       startTime: start,
//       endTime: end,
//       // @ts-ignore (Tambahkan customerName di interface Table lo)
//       customerName: customerNameInput || "Guest", 
//     });
//     setShowCustom(false);
//     setCustomerNameInput("");
//   };

//   const handleStop = () => {
//     if (window.confirm(`Stop session untuk ${table.name}?`)) {
//       setShowCustom(false);
//       setCustomMinutes(30);
//       onUpdate(table.id, {
//         status: TableStatus.AVAILABLE,
//         startTime: undefined,
//         endTime: undefined,
//         // @ts-ignore
//         customerName: undefined,
//       });
//     }
//   };

//   const handleExtend = (minutes: number) => {
//     if (!table.endTime) return;
//     onUpdate(table.id, {
//       endTime: table.endTime + minutes * 60000,
//     });
//   };

//   const getBorderColor = () => {
//     switch (table.status) {
//       case TableStatus.AVAILABLE: return "border-green-500/20";
//       case TableStatus.ENDING_SOON: return "border-amber-500 animate-pulse";
//       case TableStatus.IN_USE: return "border-red-500/40";
//       default: return "border-neutral-800";
//     }
//   };

//   return (
//     <div className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center h-full bg-[#121212] ${getBorderColor()} shadow-2xl relative`}>
      
//       {/* HEADER SECTION */}
//       <div className="flex justify-between items-start mb-5 w-full">
//         <div>
//           <h3 className="text-xl font-black uppercase tracking-tighter text-white leading-none">
//             {table.name}
//           </h3>
//           <p className="text-[10px] font-bold text-neutral-500 mt-1.5 tracking-widest uppercase">
//             {/* @ts-ignore */}
//             {table.status !== TableStatus.AVAILABLE ? `User: ${table.customerName || 'Guest'}` : 'READY TO PLAY'}
//           </p>
//         </div>
//         <StatusIndicator status={table.status} />
//       </div>

//       {/* PROGRESS BAR SECTION */}
//       {table.status !== TableStatus.AVAILABLE && (
//         <div className="w-full mb-6">
//           <div className="flex justify-between items-end mb-1.5">
//             <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">Session Progress</span>
//             <span className="text-[10px] font-mono text-neutral-400">{Math.round(getProgress())}%</span>
//           </div>
//           <div className="w-full h-1.5 bg-neutral-800/50 rounded-full overflow-hidden">
//             <div 
//               className={`h-full transition-all duration-1000 rounded-full ${
//                 table.status === TableStatus.ENDING_SOON 
//                   ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
//                   : 'bg-gradient-to-r from-red-700 to-red-500'
//               }`}
//               style={{ width: `${getProgress()}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* INPUT CUSTOMER (Hanya saat Available) */}
//       {table.status === TableStatus.AVAILABLE && (
//         <div className="w-full mb-6">
//            <input 
//             type="text"
//             placeholder="Input Customer Name..."
//             className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all placeholder:text-neutral-700"
//             value={customerNameInput}
//             onChange={(e) => setCustomerNameInput(e.target.value)}
//           />
//         </div>
//       )}

//       {/* TIMER DISPLAY */}
//       <div className="py-2">
//         <CountdownTimer
//           timeLeft={getTimeLeft()}
//           endTime={table.endTime}
//           status={table.status}
//         />
//       </div>

//       {/* DETAIL INFO (Jam & Billing) */}
//       {table.status !== TableStatus.AVAILABLE && (
//         <div className="w-full mt-6 space-y-3">
//           <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
//             <div className="bg-[#121212] p-3 text-center">
//               <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Check In</p>
//               <p className="text-sm text-neutral-200 font-mono font-bold">{formatTime(table.startTime)}</p>
//             </div>
//             <div className="bg-[#121212] p-3 text-center">
//               <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Check Out</p>
//               <p className="text-sm text-neutral-200 font-mono font-bold">{formatTime(table.endTime)}</p>
//             </div>
//           </div>

//           <div className="bg-gradient-to-b from-neutral-900 to-black rounded-xl p-3 flex justify-between items-center border border-white/5 shadow-inner">
//             <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">Est. Billing</span>
//             <span className="text-sm font-black text-green-500 font-mono">
//               Rp {calculateCurrentPrice().toLocaleString('id-ID')}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* ACTION BUTTONS */}
//       <div className="mt-auto w-full pt-6">
//         <ActionButtons
//           status={table.status}
//           onStart={handleStart}
//           onStop={handleStop}
//           onExtend={handleExtend}
//           showCustom={showCustom}
//           setShowCustom={setShowCustom}
//           customMinutes={customMinutes}
//           setCustomMinutes={setCustomMinutes}
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { TableStatus } from "../types/table";
import type { Table } from "../types/table";
import StatusIndicator from "./StatusIndicator";
import CountdownTimer from "./CountdownTimer";
import ActionButtons from "./ActionButtons";
import ConfirmModal from "./ConfirmModal";



// --- MAIN TABLE CARD COMPONENT ---
const PRICE_PER_HOUR = 50000;

interface TableCardProps {
  table: Table;
  onUpdate: (id: number, updates: Partial<Table>) => void;
}

export default function TableCard({ table, onUpdate }: TableCardProps) {
  const [now, setNow] = useState(Date.now());
  const [customMinutes, setCustomMinutes] = useState<number>(30);
  const [showCustom, setShowCustom] = useState(false);
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- HELPERS ---
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  const getProgress = () => {
    if (!table.startTime || !table.endTime) return 0;
    const total = table.endTime - table.startTime;
    const elapsed = now - table.startTime;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const calculateCurrentPrice = () => {
    if (!table.startTime || !table.endTime) return 0;
    const durationInHours = (table.endTime - table.startTime) / 3600000;
    return Math.round(durationInHours * PRICE_PER_HOUR);
  };

  const getTimeLeft = () => {
    if (!table.endTime) return "--:--";
    const diff = table.endTime - now;
    if (diff <= 0) return "00:00";
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // --- HANDLERS ---
  const handleStart = (minutes: number) => {
    const start = Date.now();
    const end = start + minutes * 60000;
    onUpdate(table.id, {
      status: TableStatus.IN_USE,
      startTime: start,
      endTime: end,
      // @ts-ignore
      customerName: customerNameInput || "Guest",
    });
    setShowCustom(false);
    setCustomerNameInput("");
  };

  const confirmStop = () => {
    onUpdate(table.id, {
      status: TableStatus.AVAILABLE,
      startTime: undefined,
      endTime: undefined,
      // @ts-ignore
      customerName: undefined,
    });
    setIsConfirmOpen(false);
    setShowCustom(false);
  };

  const handleExtend = (minutes: number) => {
    if (!table.endTime) return;
    onUpdate(table.id, { endTime: table.endTime + minutes * 60000 });
  };

  const getBorderColor = () => {
    switch (table.status) {
      case TableStatus.AVAILABLE: return "border-green-500/20 shadow-green-500/5";
      case TableStatus.ENDING_SOON: return "border-amber-500 animate-pulse shadow-amber-500/20";
      case TableStatus.IN_USE: return "border-red-500/40 shadow-red-500/5";
      default: return "border-neutral-800";
    }
  };

  return (
    <>
      <div className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center h-full bg-[#121212] ${getBorderColor()} shadow-2xl relative overflow-hidden`}>
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-5 w-full">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white leading-none">
              {table.name}
            </h3>
            <p className="text-[10px] font-bold text-neutral-500 mt-1.5 tracking-widest uppercase">
              {/* @ts-ignore */}
              {table.status !== TableStatus.AVAILABLE ? `User: ${table.customerName || 'Guest'}` : 'READY TO PLAY'}
            </p>
          </div>
          <StatusIndicator status={table.status} />
        </div>

        {/* PROGRESS BAR */}
        {table.status !== TableStatus.AVAILABLE && (
          <div className="w-full mb-6">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">Session Progress</span>
              <span className="text-[10px] font-mono text-neutral-400">{Math.round(getProgress())}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800/50 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 rounded-full ${
                  table.status === TableStatus.ENDING_SOON ? 'bg-amber-500' : 'bg-red-600'
                }`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* INPUT CUSTOMER NAME */}
        {table.status === TableStatus.AVAILABLE && (
          <div className="w-full mb-6">
             <input 
              type="text"
              placeholder="Customer Name..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all placeholder:text-neutral-700"
              value={customerNameInput}
              onChange={(e) => setCustomerNameInput(e.target.value)}
            />
          </div>
        )}

        {/* TIMER DISPLAY */}
        <div className="py-2">
          <CountdownTimer timeLeft={getTimeLeft()} endTime={table.endTime} status={table.status} />
        </div>

        {/* INFO SECTION */}
        {table.status !== TableStatus.AVAILABLE && (
          <div className="w-full mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <div className="bg-[#121212] p-3 text-center">
                <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Check In</p>
                <p className="text-sm text-neutral-200 font-mono font-bold">{formatTime(table.startTime)}</p>
              </div>
              <div className="bg-[#121212] p-3 text-center">
                <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Check Out</p>
                <p className="text-sm text-neutral-200 font-mono font-bold">{formatTime(table.endTime)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-neutral-900 to-black rounded-xl p-3 flex justify-between items-center border border-white/5">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">Billing</span>
              <span className="text-sm font-black text-green-500 font-mono">
                Rp {calculateCurrentPrice().toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-auto w-full pt-6">
          <ActionButtons
            status={table.status}
            onStart={handleStart}
            onStop={() => setIsConfirmOpen(true)}
            onExtend={handleExtend}
            showCustom={showCustom}
            setShowCustom={setShowCustom}
            customMinutes={customMinutes}
            setCustomMinutes={setCustomMinutes}
          />
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        tableName={table.name}
        onConfirm={confirmStop}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}