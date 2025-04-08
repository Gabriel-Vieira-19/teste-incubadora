
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Usuarios = () => {
  return (
    <AppLayout title="Usuários">
      <Card>
        <CardHeader className="flex items-center space-x-4 pb-2">
          <div className="rounded-lg bg-brand-teal/10 p-3">
            <Users className="h-6 w-6 text-brand-teal" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-slate-800">Gerenciamento de Usuários</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-600 mb-8">
            Esta página exibirá a lista de usuários do sistema e permitirá gerenciar suas permissões.
          </p>
          
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissão
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "João Doe", role: "Administrador", email: "joao@exemplo.com", permission: "Admin", active: true, initials: "JD" },
                  { name: "Maria Silva", role: "Gerente", email: "maria@exemplo.com", permission: "Gerente", active: true, initials: "MS" },
                  { name: "Pedro Lima", role: "Usuário", email: "pedro@exemplo.com", permission: "Usuário", active: false, initials: "PL" }
                ].map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{user.initials}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.permission}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {user.active ? 'Ativo' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" className="text-brand-teal hover:text-brand-teal/80 mr-3">Editar</Button>
                      <Button variant="ghost" className="text-red-600 hover:text-red-900">Remover</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Usuarios;
