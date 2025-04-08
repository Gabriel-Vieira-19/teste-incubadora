
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { BarChart3 } from "lucide-react";

const Relatorios = () => {
  return (
    <AppLayout title="Relatórios">
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center space-x-4">
          <div className="rounded-lg bg-brand-teal/10 p-3">
            <BarChart3 className="h-6 w-6 text-brand-teal" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Relatórios e Análises</h2>
        </div>
        
        <p className="text-gray-600">
          Esta página exibirá gráficos e relatórios detalhados sobre empresas incubadas, 
          suas métricas de desempenho e análises comparativas.
        </p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-medium text-slate-800">Métricas por Segmento</h3>
            <div className="flex h-40 items-center justify-center text-slate-400">
              Gráfico de segmentos será exibido aqui
            </div>
          </div>
          
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-medium text-slate-800">Crescimento de Funcionários</h3>
            <div className="flex h-40 items-center justify-center text-slate-400">
              Gráfico de crescimento será exibido aqui
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Relatorios;
