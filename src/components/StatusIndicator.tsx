
import React from 'react';
import { TableStatus } from '../types/table';

interface StatusIndicatorProps {
  status: TableStatus;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case TableStatus.AVAILABLE:
        return "bg-[#22c55e] text-[#052e16]";
      case TableStatus.ENDING_SOON:
        return "bg-[#f59e0b] text-[#451a03]";
      case TableStatus.IN_USE:
        return "bg-[#ef4444] text-[#450a0a]";
      default:
        return "bg-[#262626] text-[#a3a3a3]";
    }
  };

  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded leading-none ${getStatusStyles()}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusIndicator;
