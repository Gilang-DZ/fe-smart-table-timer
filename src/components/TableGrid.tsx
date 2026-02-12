
import React from 'react';
import type { Table } from '../types/table';
import TableCard from './TableCard';

interface TableGridProps {
  tables: Table[];
  onUpdateTable: (id: number, updates: Partial<Table>) => void;
}

const TableGrid: React.FC<TableGridProps> = ({ tables, onUpdateTable }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
      {tables.map(table => (
        <TableCard 
          key={table.id} 
          table={table} 
          onUpdate={onUpdateTable} 
        />
      ))}
    </div>
  );
};

export default TableGrid;
