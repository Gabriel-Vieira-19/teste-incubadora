
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-amber-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-slate-800">404</h1>
        <p className="text-xl text-slate-600 mb-6">
          Oops! Página não encontrada
        </p>
        
        <p className="text-slate-500 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link
          to="/"
          className="px-5 py-3 bg-brand-teal text-white rounded-md inline-flex justify-center shadow-button hover:opacity-90 transition-all"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
