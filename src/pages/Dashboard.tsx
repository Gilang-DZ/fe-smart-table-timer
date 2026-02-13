// import { useState, useEffect } from "react";
// import HeaderBar from "../components/HeaderBar";
// import TableGrid from "../components/TableGrid";
// import { TableStatus } from "../types/table";
// import type { Table } from "../types/table";

// type DashboardProps = {
//   onLogout: () => void;
// };

// const INITIAL_TABLES: Table[] = Array.from({ length: 15 }, (_, i) => ({
//   id: i + 1,
//   name: `Table ${i + 1}`,
//   status: TableStatus.AVAILABLE,
// }));

// export default function Dashboard({ onLogout }: DashboardProps) {
//   const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);

//   const updateTable = (id: number, updates: Partial<Table>) => {
//     setTables((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
//     );
//   };

//   // 🔥 GLOBAL TIMER ENGINE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTables((prev) =>
//         prev.map((table) => {
//           if (!table.endTime) return table;

//           const remaining = table.endTime - Date.now();

//           // Session finished
//           if (remaining <= 0) {
//             return {
//               ...table,
//               status: TableStatus.AVAILABLE,
//               startTime: undefined,
//               endTime: undefined,
//             };
//           }

//           // 15 minutes warning
//           if (remaining <= 15 * 60 * 1000) {
//             if (table.status !== TableStatus.ENDING_SOON) {
//               return { ...table, status: TableStatus.ENDING_SOON };
//             }
//           } else {
//             if (table.status !== TableStatus.IN_USE) {
//               return { ...table, status: TableStatus.IN_USE };
//             }
//           }

//           return table;
//         })
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const inUseCount = tables.filter(
//     (t) => t.status !== TableStatus.AVAILABLE
//   ).length;

//   return (
//     <div className="flex flex-col min-h-screen bg-[#0c0c0c]">
//       <HeaderBar onLogout={onLogout} />

//       <main className="flex-grow p-6">
//         <div className="mb-10 flex justify-between items-end">
//           <div>
//             <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">
//               Live Floor Overview
//             </h2>
//             <h3 className="text-4xl font-black text-white">
//               Reception Dashboard
//             </h3>
//           </div>

//           <div className="flex gap-6 bg-[#171717] border border-[#262626] px-6 py-4 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500 uppercase">Total</p>
//               <p className="text-xl font-bold text-white">
//                 {tables.length}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-red-500 uppercase">Occupied</p>
//               <p className="text-xl font-bold text-red-500">
//                 {inUseCount}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-green-500 uppercase">Available</p>
//               <p className="text-xl font-bold text-green-500">
//                 {tables.length - inUseCount}
//               </p>
//             </div>
//           </div>
//         </div>

//         <TableGrid tables={tables} onUpdateTable={updateTable} />
//       </main>

//       {/* {/* <footer className="px-8 py-6 border-t border-[#171717] text-center text-[#404040] text-[10px] font-bold uppercase tracking-widest">
//         Operational View Only • Smart Table Timer MVP
//       </footer>
//        */}
//       <footer className="px-8 py-6 border-t border-[#171717] text-center text-[#404040] text-[10px] font-bold uppercase tracking-widest">
//         Operational View Only
//       </footer>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import TableGrid from "../components/TableGrid";
import { TableStatus } from "../types/table";
import type { Table } from "../types/table";

type DashboardProps = {
  onLogout: () => void;
};

const INITIAL_TABLES: Table[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  status: TableStatus.AVAILABLE,
}));

export default function Dashboard({ onLogout }: DashboardProps) {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);

  const updateTable = (id: number, updates: Partial<Table>) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  // 🔥 GLOBAL TIMER ENGINE
  useEffect(() => {
    const interval = setInterval(() => {
      setTables((prev) =>
        prev.map((table) => {
          if (!table.endTime) return table;
          const remaining = table.endTime - Date.now();

          if (remaining <= 0) {
            return {
              ...table,
              status: TableStatus.AVAILABLE,
              startTime: undefined,
              endTime: undefined,
            };
          }

          if (remaining <= 15 * 60 * 1000) {
            if (table.status !== TableStatus.ENDING_SOON) {
              return { ...table, status: TableStatus.ENDING_SOON };
            }
          } else {
            if (table.status !== TableStatus.IN_USE) {
              return { ...table, status: TableStatus.IN_USE };
            }
          }
          return table;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const inUseCount = tables.filter(
    (t) => t.status !== TableStatus.AVAILABLE
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c]">
      <HeaderBar onLogout={onLogout} />

      <main className="flex-grow p-4 sm:p-6">
        {/* HEADER SECTION: Stacked on mobile, row on desktop */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:justify-between md:items-end">
          <div>
            <h2 className="text-[10px] sm:text-xs font-black tracking-widest text-gray-500 uppercase">
              Live Floor Overview
            </h2>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Reception Dashboard
            </h3>
          </div>

          {/* STATS CARD: Grid 3 columns with better padding for mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 bg-[#171717] border border-[#262626] p-4 sm:px-6 sm:py-4 rounded-xl">
            <div className="flex flex-col justify-center items-center md:items-start">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase">Total</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                {tables.length}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center md:items-start border-x border-[#262626] md:border-none px-2">
              <p className="text-[10px] sm:text-xs text-red-500 uppercase">Occupied</p>
              <p className="text-lg sm:text-xl font-bold text-red-500">
                {inUseCount}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center md:items-start">
              <p className="text-[10px] sm:text-xs text-green-500 uppercase">Available</p>
              <p className="text-lg sm:text-xl font-bold text-green-500">
                {tables.length - inUseCount}
              </p>
            </div>
          </div>
        </div>

        {/* GRID SECTION */}
        <TableGrid tables={tables} onUpdateTable={updateTable} />
      </main>

      <footer className="px-8 py-6 border-t border-[#171717] text-center text-[#404040] text-[10px] font-bold uppercase tracking-widest">
        Operational View Only
      </footer>
    </div>
  );
}