
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Relatorios = () => {
  return (
    <AppLayout title="Relatórios">
      <Card>
        <CardHeader className="flex items-center space-x-4 pb-2">
          <div className="rounded-lg bg-brand-teal/10 p-3">
            <BarChart3 className="h-6 w-6 text-brand-teal" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-slate-800">Relatórios e Análises</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
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
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Relatorios;
