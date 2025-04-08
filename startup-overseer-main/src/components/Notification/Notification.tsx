
import React, { useEffect } from "react";
import { CheckCircle2, X, AlertTriangle, Info } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: NotificationType;
  duration?: number;
}

export function Notification({
  isOpen,
  onClose,
  message,
  type = "success",
  duration = 3000
}: NotificationProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: <CheckCircle2 size={20} className="text-green-500 mr-3" />
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: <X size={20} className="text-red-500 mr-3" />
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          icon: <AlertTriangle size={20} className="text-amber-500 mr-3" />
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <Info size={20} className="text-blue-500 mr-3" />
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed bottom-4 right-4 ${styles.bg} border ${styles.border} rounded-lg shadow-lg p-4 animate-in fade-in-0 slide-in-from-right-5 z-50`}>
      <div className="flex items-center">
        {styles.icon}
        <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
        <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
