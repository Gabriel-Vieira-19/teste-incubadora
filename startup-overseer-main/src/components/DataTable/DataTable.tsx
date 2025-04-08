
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Edit, Ban, MoreHorizontal } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number | string) => void;
  onViewDetails?: (item: any) => void;
  emptyMessage?: string;
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onViewDetails,
  emptyMessage = "Nenhum item encontrado"
}: DataTableProps) {
  const handleRowDoubleClick = (item: any) => {
    if (onViewDetails) {
      onViewDetails(item);
    }
  };

  return (
    <div className="table-wrapper overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow 
                key={item.id} 
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                onDoubleClick={() => handleRowDoubleClick(item)}
              >
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.key}`} className="px-4 py-4 whitespace-nowrap">
                    {column.render ? column.render(item) : item[column.key]}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-4 whitespace-nowrap text-sm text-slate-700 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-slate-500 hover:text-brand-teal transition-colors"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-slate-500 hover:text-red-500 transition-colors"
                      aria-label="Alterar Status"
                    >
                      <Ban size={16} />
                    </button>
                    <button
                      onClick={() => onViewDetails && onViewDetails(item)}
                      className="p-1 text-slate-500 hover:text-slate-700 transition-colors"
                      aria-label="Mais opções"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-slate-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
