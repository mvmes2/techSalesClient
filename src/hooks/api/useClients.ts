'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/api-client';
import { useToast } from '@/hooks/useToast';
import { removeRandomCharsFromToken } from '@/helpers/jwt-token/overshadowedToken';
import { useDecode } from '@/helpers/decodeToken/decodeJwt';
import jwt from 'jsonwebtoken';

// Tipos
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  cpf?: string;
  cnpj?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

interface ClientFormData {
  customer_name: string;
  customer_email: string;
  customer_phone_number: string;
  customer_address?: string;
  customer_address_number?: string;
  customer_neighborhood?: string;
  customer_cep?: string;
  customer_cpf?: string;
  customer_cnpj?: string;
}

// Chaves para o cache do React Query
export const clientsKeys = {
  all: ['clients'] as const,
  lists: () => [...clientsKeys.all, 'list'] as const,
  list: (filters: string) => [...clientsKeys.lists(), { filters }] as const,
  details: () => [...clientsKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientsKeys.details(), id] as const,
};

// Hook para buscar todos os clientes
export function useClients() {
  const {  decodeAndParseToken } = useDecode();
  return useQuery({
    queryKey: clientsKeys.lists(),
    queryFn: async () => {
      const response = await apiGet<{ customers: string }>('/customers');

      // Decodificar o token JWT que contém os clientes
      try {
        const token = response.data.customers;
       const decoded = decodeAndParseToken(token);


        if (decoded) {
          // Parse dos dados JSON dentro do token
          const clients = decoded

          return clients;
        }

        return [];
      } catch (error) {
        console.error('Erro ao decodificar token de clientes:', error);
        return [];
      }
    },
  });
}

// Hook para buscar um cliente específico
export function useClient(id: string) {
  return useQuery({
    queryKey: clientsKeys.detail(id),
    queryFn: async () => {
      try {
        const response = await apiGet<{ customer: string }>(`/customer/${id}`);

        // Decodificar o token JWT que contém o cliente
        try {
          const token = response.data.customer;
          const unshadowedToken = removeRandomCharsFromToken(token);
          const decoded = jwt.decode(unshadowedToken) as { data: string } | null;

          if (decoded && decoded.data) {
            // Parse dos dados JSON dentro do token
            const client = JSON.parse(decoded.data) as Client;
            return client;
          }

          throw new Error('Cliente não encontrado');
        } catch (error) {
          console.error('Erro ao decodificar token do cliente:', error);
          throw new Error('Erro ao processar dados do cliente');
        }
      } catch (error: any) {
        // Tratamento específico para erro 404
        if (error.response && error.response.status === 404) {
          throw new Error('Cliente não encontrado');
        }

        // Outros erros de API
        console.error('Erro ao buscar cliente:', error);
        throw new Error('Erro ao carregar dados do cliente');
      }
    },
    enabled: !!id, // Só executa se o ID for fornecido
    retry: false, // Não tenta novamente em caso de erro 404
  });
}

// Hook para criar um novo cliente
export function useCreateClient() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (data: ClientFormData) => {
      const response = await apiPost<Client>('/customer', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
      notifySuccess('Cliente cadastrado com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      notifyError(error.response?.data?.message || 'Erro ao cadastrar cliente.');
    },
  });
}

// Hook para atualizar um cliente
export function useUpdateClient() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ClientFormData }) => {
      const response = await apiPut<Client>(`/customer/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: clientsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
      notifySuccess('Cliente atualizado com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      notifyError(error.response?.data?.message || 'Erro ao atualizar cliente.');
    },
  });
}

// Hook para excluir um cliente
export function useDeleteClient() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiDelete<{ success: boolean }>(`/customer/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
      notifySuccess('Cliente excluído com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      notifyError(error.response?.data?.message || 'Erro ao excluir cliente.');
    },
  });
}
