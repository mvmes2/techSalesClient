'use client';

import React, { useState } from 'react';
import {
  ClientsContainer,
  ClientsHeader,
  ClientsTitle,
  ClientsActions,
  ClientsTable,
  ClientsTableHeader,
  ClientsTableBody,
  ClientsTableRow,
  ClientsTableCell,
  ClientsTableHeaderCell,
  EmptyState,
  SearchContainer,
  SearchInput
} from '@/styles/pages/clients.styles';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiUsers, FiUserPlus } from 'react-icons/fi';
import { useClients, useDeleteClient } from '@/hooks/api/useClients';
import ClientForm from '@/components/clients/ClientForm';
import SimpleClientForm from '@/components/clients/SimpleClientForm';
import { useCustomerContext } from "@/context/customerContext";
import { useRouter } from "next/navigation";
export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { push } = useRouter();
  const { setCustomerInfo } = useCustomerContext();

  const { data: clients = [], isLoading, isError } = useClients();
  const deleteClient = useDeleteClient();

  const handleOpenModal = (client?: any) => {
    setSelectedClient(client || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteClient.mutate(id);
    }
  };

  const handleViewClient = (client: any) => {
    setCustomerInfo(client);
    push(`/clientes/${client.id}`);
  };

  // Garantir que clients é um array antes de chamar filter
  const filteredClients = Array.isArray(clients)
    ? clients.filter((client: any) =>
        client.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.customer_phone_number?.includes(searchTerm)
      )
    : [];

  return (
    <ClientsContainer>
      <ClientsHeader>
        <ClientsTitle>Clientes</ClientsTitle>
        <ClientsActions>
          <SearchContainer>
            <FiSearch size={18} />
            <SearchInput
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <Button
            onClick={() => handleOpenModal()}
            startIcon={<FiUserPlus />}
          >
            Novo Cliente
          </Button>
        </ClientsActions>
      </ClientsHeader>

      <Card>
        {isLoading ? (
          <EmptyState>
            <div className="loading-spinner" />
            <p>Carregando clientes...</p>
          </EmptyState>
        ) : isError ? (
          <EmptyState>
            <FiUsers size={48} />
            <p>Erro ao carregar clientes. Tente novamente mais tarde.</p>
          </EmptyState>
        ) : filteredClients.length === 0 ? (
          <EmptyState>
            <FiUsers size={48} />
            <p>Nenhum cliente encontrado.</p>
            <Button
              variant="outlined"
              onClick={() => handleOpenModal()}
              startIcon={<FiUserPlus />}
            >
              Adicionar Cliente
            </Button>
          </EmptyState>
        ) : (
          <ClientsTable>
            <ClientsTableHeader>
              <tr>
                <ClientsTableHeaderCell>Nome</ClientsTableHeaderCell>
                <ClientsTableHeaderCell>Email</ClientsTableHeaderCell>
                <ClientsTableHeaderCell>Telefone</ClientsTableHeaderCell>
                <ClientsTableHeaderCell>Ações</ClientsTableHeaderCell>
              </tr>
            </ClientsTableHeader>
            <ClientsTableBody>
              {filteredClients.map((client: any) => (
                <ClientsTableRow key={client.id}>
                  <ClientsTableCell>{client.customer_name}</ClientsTableCell>
                  <ClientsTableCell>{client.customer_email}</ClientsTableCell>
                  <ClientsTableCell>{client.customer_phone_number || '-'}</ClientsTableCell>
                  <ClientsTableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewClient(client)}
                    >
                      Ver detalhes
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleOpenModal(client)}
                      startIcon={<FiEdit2 />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClient(client.id)}
                      startIcon={<FiTrash2 />}
                    >
                      Excluir
                    </Button>
                  </ClientsTableCell>
                </ClientsTableRow>
              ))}
            </ClientsTableBody>
          </ClientsTable>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedClient ? 'Editar Cliente' : 'Novo Cliente'}
      >
        {selectedClient ? (
          <SimpleClientForm
            client={selectedClient}
            onClose={handleCloseModal}
          />
        ) : (
          <ClientForm
            client={selectedClient}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </ClientsContainer>
  );
}
