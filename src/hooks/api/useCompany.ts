'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut } from '@/lib/api/api-client';
import { useToast } from '@/hooks/useToast';
import { useAuthContext } from '@/context/authContext';
import { useDecode } from '@/helpers/decodeToken/decodeJwt';

// Tipos
export interface CompanyUser {
  user: any;
  company: any;
}

// Chaves para o cache do React Query
export const companyKeys = {
  all: ['company'] as const,
  details: () => [...companyKeys.all, 'detail'] as const,
  companyUser: () => [...companyKeys.all, 'company-user'] as const,
};

// Hook para buscar informações da empresa e do usuário
export function useCompanyUser() {
  const { decodeUserJwtTokenAndUpdateAuthInfo } = useDecode();

  return useQuery({
    queryKey: companyKeys.companyUser(),
    queryFn: async () => {
      const response = await apiGet<CompanyUser>('/company/company-user');
      
      // Atualiza as informações do usuário no contexto
      if (response.data?.user) {
        decodeUserJwtTokenAndUpdateAuthInfo(response.data.user);
      }
      
      return response.data;
    },
  });
}

// Hook para atualizar informações da empresa
export function useUpdateCompany() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiPut('/company', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.companyUser() });
      notifySuccess('Informações da empresa atualizadas com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      notifyError(error.response?.data?.message || 'Erro ao atualizar informações da empresa.');
    },
  });
}

// Hook para atualizar informações do usuário
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiPut('/user', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.companyUser() });
      notifySuccess('Informações do usuário atualizadas com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      notifyError(error.response?.data?.message || 'Erro ao atualizar informações do usuário.');
    },
  });
}
