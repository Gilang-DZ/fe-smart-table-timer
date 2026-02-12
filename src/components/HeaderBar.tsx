import React, { useState, useEffect } from "react";

interface HeaderBarProps {
  onLogout?: () => void; // OPTIONAL
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#171717] border-b border-[#262626] px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#22c55e] w-8 h-8 flex items-center justify-center rounded-md">
          <div className="w-3.5 h-3.5 border-[3px] border-[#171717] rounded-full"></div>
        </div>
        <div>
          <h1 className="text-sm font-black tracking-tight uppercase text-white">
            Smart 805 Timer
          </h1>
          <p className="text-[10px] text-[#737373] font-black uppercase tracking-widest">
            Billiard 805 • Parung
          </p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-[#737373] font-black uppercase tracking-[0.15em] mb-0.5">
              Current Date
            </p>
            <p className="text-xs font-bold uppercase text-[#e5e5e5]">
              {currentTime.toLocaleDateString([], {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>
          <div className="text-right sm:border-l sm:border-[#262626] sm:pl-8">
            <p className="text-[10px] text-[#737373] font-black uppercase tracking-[0.15em] mb-0.5">
              Terminal Time
            </p>
            <p className="text-xl font-black font-mono tracking-tighter text-[#22c55e]">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        </div>

        {/* Logout hanya muncul kalau onLogout dikasih */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="bg-[#262626] hover:bg-[#333333] text-[#a3a3a3] hover:text-white px-4 py-2 rounded-lg text-[10px] font-black transition-colors border border-[#404040] uppercase tracking-widest"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
