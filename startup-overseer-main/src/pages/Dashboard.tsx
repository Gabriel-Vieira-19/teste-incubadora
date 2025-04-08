
import { AppLayout } from "@/components/AppLayout";
import { Building2, Users, DollarSign, BarChart3, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const revenueData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1500 },
  { name: "Mar", value: 1200 },
  { name: "Apr", value: 1800 },
  { name: "May", value: 2000 },
  { name: "Jun", value: 2400 },
];

const companiesData = [
  { name: "Tecnologia", value: 45 },
  { name: "Saúde", value: 20 },
  { name: "Educação", value: 15 },
  { name: "Finanças", value: 10 },
  { name: "Outros", value: 10 },
];

const COLORS = ["#00C3A0", "#0088FE", "#FFBB28", "#FF8042", "#8884d8"];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="stats-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
          
          <div className="flex items-center mt-2">
            {trend === "up" && <TrendingUp size={14} className="text-green-500 mr-1" />}
            {trend === "down" && <TrendingDown size={14} className="text-red-500 mr-1" />}
            <span className={`text-xs font-medium ${
              trend === "up" ? "text-green-500" : 
              trend === "down" ? "text-red-500" : 
              "text-slate-500"
            }`}>
              {change}
            </span>
          </div>
        </div>
        
        <div className="h-10 w-10 rounded-md bg-brand-teal/10 flex items-center justify-center">
          <Icon size={20} className="text-brand-teal" />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Empresas Incubadas" 
          value="48" 
          change="+4 neste mês" 
          icon={Building2}
          trend="up"
        />
        <StatCard 
          title="Total de Funcionários" 
          value="243" 
          change="+12 neste mês" 
          icon={Users}
          trend="up"
        />
        <StatCard 
          title="Despesas Mensais" 
          value="R$ 45.800" 
          change="-5% desde o último mês" 
          icon={DollarSign}
          trend="down"
        />
        <StatCard 
          title="Taxa de Sucesso" 
          value="86%" 
          change="+2% desde o último mês" 
          icon={BarChart3}
          trend="up"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-lg bg-card shadow-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-slate-800">Faturamento das Incubadas</h3>
            <div className="flex items-center text-sm text-slate-500">
              <Calendar size={14} className="mr-1" />
              <span>Últimos 6 meses</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C3A0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C3A0" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    borderColor: "#e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00C3A0" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-card shadow-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-slate-800">Setores das Empresas</h3>
          </div>
          
          <div className="h-80 flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={companiesData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {companiesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderColor: "#e2e8f0",
                      borderRadius: "6px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {companiesData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-slate-600 truncate">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 rounded-lg bg-card shadow-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg text-slate-800">Atividades Recentes</h3>
          <a href="#" className="text-sm font-medium text-brand-teal hover:underline">
            Ver todas
          </a>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div 
              key={index} 
              className="p-4 border border-slate-100 rounded-md hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                    <Building2 size={18} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {["Tech Solutions cadastrada", "StartupX atualizada", "DataFlow em progresso", "Nova empresa adicionada"][index]}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {["Hoje, 14:30", "Ontem, 09:15", "2 dias atrás", "3 dias atrás"][index]}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  {["Novo", "Atualizado", "Em progresso", "Novo"][index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
