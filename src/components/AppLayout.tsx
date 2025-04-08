
import { Sidebar } from "./Sidebar";
import { UserDropdown } from "./UserDropdown";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white sticky top-0 z-30 w-full border-b border-slate-200 px-4 py-3 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
            <UserDropdown />
          </div>
        </header>
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
