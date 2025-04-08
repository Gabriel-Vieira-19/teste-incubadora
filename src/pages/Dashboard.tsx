
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Building2, DollarSign, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="h-10 w-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm">
        <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <polyline points={isPositive ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
          </svg>
          {change}
        </span>
        <span className="text-gray-500 ml-2">desde o mês passado</span>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Empresas Ativas" 
          value="24" 
          change="8.2%" 
          isPositive={true} 
          icon={<Building2 className="text-green-600" size={20} />} 
        />
        <StatCard 
          title="Novos Usuários" 
          value="42" 
          change="12.5%" 
          isPositive={true} 
          icon={<Users className="text-blue-600" size={20} />} 
        />
        <StatCard 
          title="Faturamento Médio" 
          value="R$ 42.5K" 
          change="3.2%" 
          isPositive={false} 
          icon={<DollarSign className="text-yellow-600" size={20} />} 
        />
        <StatCard 
          title="Taxa de Sucesso" 
          value="78%" 
          change="5.1%" 
          isPositive={true} 
          icon={<BarChart3 className="text-purple-600" size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-lg font-medium">Desempenho das Empresas</CardTitle>
              <div className="flex space-x-2">
                <button className="text-xs font-medium bg-brand-teal text-white px-3 py-1 rounded-full">
                  Mês
                </button>
                <button className="text-xs font-medium text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100">
                  Trimestre
                </button>
                <button className="text-xs font-medium text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100">
                  Ano
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Aqui entraria um gráfico de desempenho</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Empresas por Estágio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full bg-gray-100 rounded flex items-center justify-center mb-4">
                <span className="text-gray-500">Aqui entraria um gráfico de pizza</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Seed (8)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Early-stage (12)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Scale-up (4)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-lg font-medium">Empresas Recentes</CardTitle>
            <a href="/empresas" className="text-brand-teal hover:underline text-sm font-medium">Ver todas</a>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Empresa</th>
                    <th className="py-3 px-4">Segmento</th>
                    <th className="py-3 px-4">Fundação</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: "Tech Solutions", segment: "Tecnologia", founded: "Jan 2023", active: true },
                    { name: "Health Plus", segment: "Saúde", founded: "Fev 2023", active: true },
                    { name: "EduTech", segment: "Educação", founded: "Mar 2023", active: true },
                    { name: "FinSmart", segment: "Finanças", founded: "Abr 2023", active: true },
                    { name: "GreenEnergy", segment: "Energia", founded: "Mai 2023", active: false }
                  ].map((company, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-brand-teal/10 flex items-center justify-center mr-3">
                            <Building2 className="text-brand-teal" size={16} />
                          </div>
                          <span className="font-medium text-slate-800">{company.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{company.segment}</td>
                      <td className="py-3 px-4 text-gray-600">{company.founded}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${company.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {company.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
