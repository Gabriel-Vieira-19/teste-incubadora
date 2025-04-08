
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading and authentication
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, would validate credentials against an API
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side with illustration or brand messaging */}
      <div className="hidden md:flex md:w-[70%] bg-brand-teal items-center justify-center">
        <div className="max-w-lg text-white p-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-6">Startup Overseer</h1>
          <p className="text-xl mb-8 opacity-90">
            Sistema de gestão para empresas incubadas
          </p>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-lg font-medium">
              "Uma plataforma completa para o gerenciamento eficiente das suas empresas incubadas."
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-full md:w-[30%] flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-brand-teal text-white flex items-center justify-center mb-4">
              <Building2 size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Bem-vindo(a)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Faça login para acessar a plataforma
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-teal hover:opacity-80">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-button text-sm font-medium text-white bg-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
