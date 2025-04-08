
import React, { useState } from "react";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  submitLabel?: string;
  formContent?: React.ReactNode;
  additionalContent?: React.ReactNode;
  additionalTabLabel?: string;
  size?: "sm" | "md" | "lg";
  isSubmitting?: boolean;
  showTabs?: boolean;
  tabs?: TabItem[];
}

export function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitLabel = "Salvar",
  formContent,
  additionalContent,
  additionalTabLabel = "Informações Adicionais",
  size = "md",
  isSubmitting = false,
  showTabs = true,
  tabs
}: ModalFormProps) {
  const [activeTab, setActiveTab] = useState("main");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };
  
  // Determine width class based on size prop
  const maxWidthClass = size === "sm" ? "max-w-md" : 
                        size === "md" ? "max-w-xl" : 
                        "max-w-2xl";
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`bg-white rounded-lg shadow-lg ${maxWidthClass} w-full m-4`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 relative">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {tabs ? (
            <div className="px-6 py-4">
              {/* Tabs Navigation */}
              <div className="flex border border-gray-200 rounded mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    className={`flex-1 py-2 px-4 text-center ${
                      activeTab === tab.value
                        ? "bg-gray-100 font-medium"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              {tabs.map((tab) => (
                <div
                  key={tab.value}
                  className={activeTab === tab.value ? "block" : "hidden"}
                >
                  {tab.content}
                </div>
              ))}
            </div>
          ) : showTabs && additionalContent ? (
            <div className="px-6 py-4">
              {/* Default Tabs Navigation */}
              <div className="flex border border-gray-200 rounded mb-4">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "main"
                      ? "bg-gray-100 font-medium"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("main")}
                >
                  Dados Principais
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "additional"
                      ? "bg-gray-100 font-medium"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("additional")}
                >
                  {additionalTabLabel}
                </button>
              </div>
              
              {/* Default Tab Content */}
              <div className={activeTab === "main" ? "block" : "hidden"}>
                {formContent}
              </div>
              <div className={activeTab === "additional" ? "block" : "hidden"}>
                {additionalContent}
              </div>
            </div>
          ) : (
            <div className="px-6 py-4">{formContent}</div>
          )}
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
