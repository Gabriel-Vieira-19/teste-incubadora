
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Home, 
  Building2, 
  Users, 
  BarChart3, 
  Menu, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-brand-teal text-white" 
          : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
      )}
    >
      <Icon size={18} className={active ? "text-white" : "text-slate-500"} />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (isMobile && isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen]);

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", to: "/dashboard" },
    { icon: Building2, label: "Empresas", to: "/empresas" },
    { icon: Users, label: "Usuários", to: "/usuarios" },
    { icon: BarChart3, label: "Relatórios", to: "/relatorios" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md transition-all",
          isOpen && "left-[240px]"
        )}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:z-0"
        )}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Startup Overseer</h2>
          </div>

          <nav className="space-y-1 flex-grow">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
