
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "active" | "inactive" | "pending" | "disabled" | "default";
  className?: string;
  labels?: Record<string, string>;
}

export function StatusBadge({
  status,
  variant = "default",
  className,
  labels = {
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    disabled: "Desativado"
  }
}: StatusBadgeProps) {
  const getVariantStyles = (): string => {
    switch (variant) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-slate-100 text-slate-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "disabled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const displayStatus = labels[status] || status;
  const variantStyles = getVariantStyles();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles,
        className
      )}
    >
      {displayStatus}
    </span>
  );
}
