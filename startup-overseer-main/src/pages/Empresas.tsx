
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Building2, Search, Plus, Ban, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable/DataTable";
import { ModalForm } from "@/components/ModalForm/ModalForm";
import { FormField } from "@/components/FormField/FormField";
import { Notification } from "@/components/Notification/Notification";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: "Tech Solutions",
    segment: "Tecnologia",
    employees: 12,
    stage: "Scale-up",
    status: "active",
    cep: "12345-678",
    street: "Rua da Tecnologia",
    number: "123",
    complement: "Andar 4",
    neighborhood: "Distrito Tech",
    city: "São Paulo",
    state: "SP"
  },
  {
    id: 2,
    name: "Health Plus",
    segment: "Saúde",
    employees: 8,
    stage: "Early-stage",
    status: "active",
    cep: "54321-876",
    street: "Avenida da Saúde",
    number: "456",
    complement: "Sala 201",
    neighborhood: "Centro Médico",
    city: "Rio de Janeiro",
    state: "RJ"
  },
  {
    id: 3,
    name: "EduTech",
    segment: "Educação",
    employees: 5,
    stage: "Seed",
    status: "active",
    cep: "98765-432",
    street: "Rua da Educação",
    number: "789",
    complement: "",
    neighborhood: "Campus Universitário",
    city: "Belo Horizonte",
    state: "MG"
  },
  {
    id: 4,
    name: "FinSmart",
    segment: "Finanças",
    employees: 7,
    stage: "Early-stage",
    status: "active",
    cep: "45678-901",
    street: "Avenida Financeira",
    number: "1010",
    complement: "Torre B, 10º andar",
    neighborhood: "Centro Financeiro",
    city: "São Paulo",
    state: "SP"
  },
  {
    id: 5,
    name: "GreenEnergy",
    segment: "Energia",
    employees: 9,
    stage: "Scale-up",
    status: "inactive",
    cep: "34567-890",
    street: "Rua das Energias Renováveis",
    number: "2022",
    complement: "Galpão 3",
    neighborhood: "Eco Park",
    city: "Curitiba",
    state: "PR"
  },
];

const stageOptions = [
  { value: "Seed", label: "Seed" },
  { value: "Early-stage", label: "Early-stage" },
  { value: "Scale-up", label: "Scale-up" },
];

const statusOptions = [
  { value: "active", label: "Ativo" },
  { value: "disabled", label: "Desativado" },
];

interface StatusChangeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number | null;
  onConfirm: () => void;
}

interface CompanyDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  company: typeof mockCompanies[0] | null;
}

const StatusChangeConfirmation = ({ isOpen, onClose, companyId, onConfirm }: StatusChangeConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Alteração de Status</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            Tem certeza que deseja desativar esta empresa? Esta ação pode ser revertida posteriormente.
          </p>
        </div>
        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
          >
            Desativar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CompanyDetailsDialog = ({ isOpen, onClose, company }: CompanyDetailsDialogProps) => {
  if (!company) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes da Empresa</DialogTitle>
          <DialogDescription>
            Informações completas sobre {company.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome</h3>
              <p className="mt-1 text-sm text-gray-900">{company.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Segmento</h3>
              <p className="mt-1 text-sm text-gray-900">{company.segment}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Funcionários</h3>
              <p className="mt-1 text-sm text-gray-900">{company.employees}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Estágio</h3>
              <p className="mt-1 text-sm text-gray-900">{company.stage}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <div className="mt-1">
                <StatusBadge 
                  status={company.status} 
                  variant={company.status as "active" | "disabled"}
                  labels={{ active: "Ativo", disabled: "Desativado" }}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Endereço</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-gray-500">CEP</h4>
                <p className="mt-1 text-sm text-gray-900">{company.cep}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-500">Bairro</h4>
                <p className="mt-1 text-sm text-gray-900">{company.neighborhood}</p>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h4 className="text-xs font-medium text-gray-500">Logradouro</h4>
                <p className="mt-1 text-sm text-gray-900">{company.street}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-500">Número</h4>
                <p className="mt-1 text-sm text-gray-900">{company.number}</p>
              </div>
            </div>
            
            {company.complement && (
              <div className="mt-2">
                <h4 className="text-xs font-medium text-gray-500">Complemento</h4>
                <p className="mt-1 text-sm text-gray-900">{company.complement}</p>
              </div>
            )}
            
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-gray-500">Cidade</h4>
                <p className="mt-1 text-sm text-gray-900">{company.city}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-500">Estado</h4>
                <p className="mt-1 text-sm text-gray-900">{company.state}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Empresas = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [statusChangeCompanyId, setStatusChangeCompanyId] = useState<number | null>(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" as "success" | "error" | "info" | "warning" });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.segment.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: number) => {
    setStatusChangeCompanyId(id);
  };

  const confirmStatusChange = () => {
    setCompanies(companies.map(company => 
      company.id === statusChangeCompanyId 
        ? { ...company, status: company.status === "active" ? "disabled" : "active" } 
        : company
    ));
    setStatusChangeCompanyId(null);
    showNotification("Status da empresa alterado com sucesso");
  };

  const [formData, setFormData] = useState({
    // Main info
    name: "",
    segment: "",
    employees: "",
    stage: "",
    status: "active",
    
    // Address info
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      segment: "",
      employees: "",
      stage: "",
      status: "active",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: ""
    });
  };

  const openNewCompanyModal = () => {
    resetForm();
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const openEditCompanyModal = (company: typeof mockCompanies[0]) => {
    // For editing, we populate all fields including address
    setFormData({
      name: company.name,
      segment: company.segment,
      employees: company.employees.toString(),
      stage: company.stage,
      status: company.status,
      cep: company.cep || "",
      street: company.street || "",
      number: company.number || "",
      complement: company.complement || "",
      neighborhood: company.neighborhood || "",
      city: company.city || "",
      state: company.state || ""
    });
    setSelectedCompany(company);
    setIsModalOpen(true);
  };
  
  const openCompanyDetails = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
    setIsDetailsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedData = {
      ...formData,
      employees: parseInt(formData.employees.toString(), 10),
    };
    
    if (selectedCompany) {
      // Update existing company
      setCompanies(
        companies.map((company) =>
          company.id === selectedCompany.id ? { ...formattedData, id: company.id } : company
        )
      );
      showNotification("Empresa atualizada com sucesso");
    } else {
      // Add new company
      const newCompany = {
        ...formattedData,
        id: companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1,
      };
      setCompanies([...companies, newCompany]);
      showNotification("Empresa cadastrada com sucesso");
    }
    
    setIsModalOpen(false);
  };

  const showNotification = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const formTabs = [
    {
      value: "main",
      label: "Dados Principais",
      content: (
        <>
          <FormField
            id="name"
            label="Nome da Empresa"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="segment"
            label="Segmento"
            value={formData.segment}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="employees"
            label="Número de Funcionários"
            type="number"
            value={formData.employees}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="stage"
            label="Estágio"
            type="select"
            value={formData.stage}
            onChange={handleInputChange}
            options={stageOptions}
            required
          />
          
          <FormField
            id="status"
            label="Status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            options={statusOptions}
            required
          />
        </>
      )
    },
    {
      value: "address",
      label: "Endereço",
      content: (
        <>
          <FormField
            id="cep"
            label="CEP"
            value={formData.cep}
            onChange={handleInputChange}
            required
          />
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <FormField
                id="street"
                label="Logradouro"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <FormField
                id="number"
                label="Número"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <FormField
            id="complement"
            label="Complemento"
            value={formData.complement}
            onChange={handleInputChange}
          />
          
          <FormField
            id="neighborhood"
            label="Bairro"
            value={formData.neighborhood}
            onChange={handleInputChange}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="city"
              label="Cidade"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            
            <FormField
              id="state"
              label="Estado"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )
    }
  ];

  const columns = [
    {
      key: "name",
      label: "Empresa",
      render: (company: typeof mockCompanies[0]) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-brand-teal/10 flex items-center justify-center mr-3">
            <Building2 size={16} className="text-brand-teal" />
          </div>
          <span className="font-medium text-slate-800">{company.name}</span>
        </div>
      ),
    },
    {
      key: "segment",
      label: "Segmento",
    },
    {
      key: "employees",
      label: "Funcionários",
    },
    {
      key: "stage",
      label: "Estágio",
    },
    {
      key: "status",
      label: "Status",
      render: (company: typeof mockCompanies[0]) => (
        <StatusBadge 
          status={company.status} 
          variant={company.status as "active" | "disabled"}
          labels={{ active: "Ativo", disabled: "Desativado" }}
        />
      ),
    },
  ];

  return (
    <AppLayout title="Empresas">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar empresas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-96 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
          />
        </div>
        
        <Button
          onClick={openNewCompanyModal}
          className="w-full md:w-auto bg-brand-teal text-white hover:opacity-90"
        >
          <Plus size={18} className="mr-2" />
          Nova Empresa
        </Button>
      </div>
      
      <DataTable
        columns={columns}
        data={filteredCompanies}
        onEdit={openEditCompanyModal}
        onDelete={handleStatusChange}
        onViewDetails={openCompanyDetails}
        emptyMessage="Nenhuma empresa encontrada"
      />
      
      {/* Company Modal with Tabs */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCompany ? "Editar Empresa" : "Nova Empresa"}
        onSubmit={handleSubmit}
        submitLabel={selectedCompany ? "Atualizar" : "Cadastrar"}
        tabs={formTabs}
      />
      
      {/* Status Change Confirmation Dialog */}
      <StatusChangeConfirmation
        isOpen={statusChangeCompanyId !== null}
        onClose={() => setStatusChangeCompanyId(null)}
        companyId={statusChangeCompanyId}
        onConfirm={confirmStatusChange}
      />
      
      {/* Details Dialog */}
      <CompanyDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        company={selectedCompany}
      />
      
      {/* Notification */}
      <Notification
        isOpen={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        message={notification.message}
        type={notification.type}
      />
    </AppLayout>
  );
};

export default Empresas;
