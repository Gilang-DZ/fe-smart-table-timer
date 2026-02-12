
import React from 'react';
import { TableStatus } from '../types/table';

interface ActionButtonsProps {
  status: TableStatus;
  onStart: (mins: number) => void;
  onStop: () => void;
  onExtend: (mins: number) => void;
  showCustom: boolean;
  setShowCustom: (show: boolean) => void;
  customMinutes: number;
  setCustomMinutes: (mins: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onStart,
  onStop,
  onExtend,
  showCustom,
  setShowCustom,
  customMinutes,
  setCustomMinutes
}) => {
  if (status === TableStatus.AVAILABLE) {
    if (!showCustom) {
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onStart(60)}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-black py-4 rounded-lg text-xs transition-all uppercase tracking-tight active:scale-[0.98]"
            >
              1 Hour
            </button>
            <button 
              onClick={() => onStart(120)}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-black py-4 rounded-lg text-xs transition-all uppercase tracking-tight active:scale-[0.98]"
            >
              2 Hours
            </button>
          </div>
          <button 
            onClick={() => setShowCustom(true)}
            className="w-full bg-[#262626] hover:bg-[#333333] text-[#e5e5e5] font-black py-3 rounded-lg text-[10px] border border-[#404040] transition-all uppercase tracking-widest active:scale-[0.98]"
          >
            Custom
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3 bg-[#0a0a0a] p-3 rounded-lg border border-[#262626] w-full">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCustomMinutes(Math.max(15, customMinutes - 15))}
            className="w-10 h-10 flex items-center justify-center bg-[#262626] rounded text-[#e5e5e5] font-black border border-[#404040]"
          >
            -
          </button>
          <div className="flex-grow text-center">
            <span className="text-xl font-black text-white">{customMinutes}</span>
            <span className="text-[9px] block font-black text-[#525252] uppercase tracking-widest">MINS</span>
          </div>
          <button 
            onClick={() => setCustomMinutes(customMinutes + 15)}
            className="w-10 h-10 flex items-center justify-center bg-[#262626] rounded text-[#e5e5e5] font-black border border-[#404040]"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onStart(customMinutes)}
            className="bg-[#22c55e] text-[#052e16] font-black py-2.5 rounded text-[10px] uppercase tracking-widest"
          >
            Set
          </button>
          <button 
            onClick={() => setShowCustom(false)}
            className="bg-[#262626] text-[#737373] font-black py-2.5 rounded text-[10px] uppercase tracking-widest"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3 w-full">
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => onExtend(30)}
          className="bg-[#262626] hover:bg-[#333333] text-[#e5e5e5] font-black py-3.5 rounded-lg text-[10px] border border-[#404040] transition-all uppercase tracking-widest active:scale-[0.98]"
        >
          +30m
        </button>
        <button 
          onClick={() => onExtend(60)}
          className="bg-[#262626] hover:bg-[#333333] text-[#e5e5e5] font-black py-3.5 rounded-lg text-[10px] border border-[#404040] transition-all uppercase tracking-widest active:scale-[0.98]"
        >
          +60m
        </button>
      </div>
      <button 
        onClick={onStop}
        className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-[#450a0a] font-black py-4 rounded-lg text-xs transition-all uppercase tracking-tight shadow-lg active:scale-[0.98]"
      >
        Stop Session
      </button>
    </div>
  );
};

export default ActionButtons;
