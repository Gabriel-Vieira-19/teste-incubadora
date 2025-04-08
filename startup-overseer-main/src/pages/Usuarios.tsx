
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { User, Search, Plus, Shield, Users as UsersIcon, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable/DataTable";
import { ModalForm } from "@/components/ModalForm/ModalForm";
import { FormField } from "@/components/FormField/FormField";
import { Notification } from "@/components/Notification/Notification";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    role: "owner",
    department: "Diretoria",
    status: "active",
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@email.com",
    role: "manager",
    department: "RH",
    status: "active",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    role: "employee",
    department: "Tecnologia",
    status: "active",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    role: "manager",
    department: "Marketing",
    status: "active",
  },
  {
    id: 5,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    role: "employee",
    department: "Financeiro",
    status: "inactive",
  },
];

const roleOptions = [
  { value: "owner", label: "Proprietário" },
  { value: "manager", label: "Gestor" },
  { value: "employee", label: "Funcionário" },
];

const statusOptions = [
  { value: "active", label: "Ativo" },
  { value: "disabled", label: "Desativado" },
];

interface StatusChangeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onConfirm: () => void;
}

const StatusChangeConfirmation = ({ isOpen, onClose, userId, onConfirm }: StatusChangeConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Alteração de Status</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            Tem certeza que deseja desativar este usuário? Esta ação pode ser revertida posteriormente.
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

const Usuarios = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | undefined>(undefined);
  const [statusChangeUserId, setStatusChangeUserId] = useState<number | null>(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" as "success" | "error" | "info" | "warning" });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: number) => {
    setStatusChangeUserId(id);
  };

  const confirmStatusChange = () => {
    setUsers(users.map(user => 
      user.id === statusChangeUserId 
        ? { ...user, status: user.status === "active" ? "disabled" : "active" } 
        : user
    ));
    setStatusChangeUserId(null);
    showNotification("Status do usuário alterado com sucesso");
  };

  const [formData, setFormData] = useState({
    // User info
    name: "",
    email: "",
    role: "",
    department: "",
    status: "active",
    
    // Personal info
    phone: "",
    birthdate: "",
    position: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "active",
      phone: "",
      birthdate: "",
      position: ""
    });
  };

  const openNewUserModal = () => {
    resetForm();
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const openEditUserModal = (user: typeof mockUsers[0]) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      phone: "",
      birthdate: "",
      position: ""
    });
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...formData, id: user.id } : user
        )
      );
      showNotification("Usuário atualizado com sucesso");
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers([...users, newUser]);
      showNotification("Usuário cadastrado com sucesso");
    }
    
    setIsModalOpen(false);
  };

  const showNotification = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Shield size={16} className="text-purple-500" />;
      case "manager":
        return <UsersIcon size={16} className="text-blue-500" />;
      case "employee":
        return <User size={16} className="text-slate-500" />;
      default:
        return <User size={16} className="text-slate-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "Proprietário";
      case "manager":
        return "Gestor";
      case "employee":
        return "Funcionário";
      default:
        return role;
    }
  };

  const formTabs = [
    {
      value: "main",
      label: "Dados Principais",
      content: (
        <>
          <FormField
            id="name"
            label="Nome Completo"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="department"
            label="Departamento"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="role"
            label="Cargo"
            type="select"
            value={formData.role}
            onChange={handleInputChange}
            options={roleOptions}
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
      value: "personal",
      label: "Dados Pessoais",
      content: (
        <>
          <FormField
            id="phone"
            label="Telefone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="birthdate"
            label="Data de Nascimento"
            type="date"
            value={formData.birthdate}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            id="position"
            label="Função"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </>
      )
    }
  ];

  const columns = [
    {
      key: "name",
      label: "Nome",
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-brand-teal/10 flex items-center justify-center mr-3">
            <User size={16} className="text-brand-teal" />
          </div>
          <div>
            <span className="font-medium text-slate-800 block">{user.name}</span>
            <span className="text-xs text-slate-500">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "Departamento",
    },
    {
      key: "role",
      label: "Cargo",
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-1.5">
          {getRoleIcon(user.role)}
          <span>{getRoleLabel(user.role)}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: typeof mockUsers[0]) => (
        <StatusBadge 
          status={user.status} 
          variant={user.status as "active" | "disabled" | "inactive"}
          labels={{ active: "Ativo", inactive: "Inativo", disabled: "Desativado" }}
        />
      ),
    },
  ];

  return (
    <AppLayout title="Usuários">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-96 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
          />
        </div>
        
        <Button
          onClick={openNewUserModal}
          className="w-full md:w-auto bg-brand-teal text-white hover:opacity-90"
        >
          <Plus size={18} className="mr-2" />
          Novo Usuário
        </Button>
      </div>
      
      <DataTable
        columns={columns}
        data={filteredUsers}
        onEdit={openEditUserModal}
        onDelete={handleStatusChange}
        emptyMessage="Nenhum usuário encontrado"
      />
      
      {/* User Modal with Tabs */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? "Editar Usuário" : "Novo Usuário"}
        onSubmit={handleSubmit}
        submitLabel={selectedUser ? "Atualizar" : "Cadastrar"}
        tabs={formTabs}
      />
      
      {/* Status Change Confirmation Dialog */}
      <StatusChangeConfirmation
        isOpen={statusChangeUserId !== null}
        onClose={() => setStatusChangeUserId(null)}
        userId={statusChangeUserId}
        onConfirm={confirmStatusChange}
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

export default Usuarios;
