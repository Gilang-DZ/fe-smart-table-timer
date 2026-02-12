
import React from 'react';
import { TableStatus } from '../types/table';

interface CountdownTimerProps {
  timeLeft: string;
  endTime?: number;
  status: TableStatus;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft, endTime, status }) => {
  const getTextColor = () => {
    switch (status) {
      case TableStatus.AVAILABLE: return "text-[#22c55e]";
      case TableStatus.ENDING_SOON: return "text-[#f59e0b]";
      case TableStatus.IN_USE: return "text-[#ef4444]";
      default: return "text-[#737373]";
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-6 sm:py-8 border-y border-[#262626] my-4 w-full">
      <div className={`text-5xl sm:text-6xl font-black font-mono tracking-tighter tabular-nums leading-none ${getTextColor()}`}>
        {timeLeft}
      </div>
      {endTime && (
        <div className="text-[10px] font-black uppercase tracking-widest text-[#525252] mt-3">
          Finish: {new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
