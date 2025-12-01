'use client';

import { useMutation } from '@tanstack/react-query';
import { apiPost } from '@/lib/api/api-client';
import { useAuthContext } from '@/context/authContext';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { removeRandomCharsFromToken } from '@/helpers/jwt-token/overshadowedToken';
import { delay } from '@/helpers/delay/delay';
import { browserStorage } from '@/utils/browserStorage';

// Tipos
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user_token: string;
  session: {
    session_access_token: string;
  };
}

interface RecoverPasswordData {
  email: string;
}

interface RegisterData {
  company: {
    company_name: string;
    cnpj: string;
    owner_name: string;
    owner_email: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
    user_cpf: string;
  };
}

// Hook para login
export function useLogin() {
  const { setAuthInfo } = useAuthContext();
  const { notifySuccess, notifyError } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await delay(1000); // Simulando um delay para mostrar o loading
      const response = await apiPost<LoginResponse>('/log-in', credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      browserStorage.setObject('session', data);
      const cleannedToken = removeRandomCharsFromToken(data.user_token);

      const decoded = jwt.decode(cleannedToken);

      if (decoded && typeof decoded === 'object') {


        const userInfo = {
          ...JSON.parse(decoded.userInfo),
          access_token: data.session.session_access_token
        };

        setAuthInfo(userInfo);
        notifySuccess('Login efetuado com sucesso!');
        await delay(1000);
        router.push('/user-home');
      } else {
        throw new Error('Failed to decode token');
      }
    },
    onError: (error: any) => {
      console.error('é erro', error);
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      notifyError(errorMessage);
    }
  });
}

// Hook para recuperação de senha
export function useRecoverPassword() {
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (data: RecoverPasswordData) => {
      await delay(1000); // Simulando um delay para mostrar o loading
      const response = await apiPost('/user/recover-password', data);
      return response.data;
    },
    onSuccess: () => {
      notifySuccess('Email enviado com sucesso!', 5000);
    },
    onError: (error: any) => {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Usuário não encontrado!';
      notifyError(errorMessage, 3000);
    }
  });
}

// Hook para registro
export function useRegister() {
  const { notifySuccess, notifyError } = useToast();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      await delay(1000); // Simulando um delay para mostrar o loading
      const response = await apiPost<{ message: string }>('/company/company-user', data);
      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      notifySuccess(`${data.message} Faça login com sua conta de usuário.`, 8000);
    },
    onError: (error: any) => {
      console.error(error);
      const errorMessage = error.response?.data?.message;

      if (Array.isArray(errorMessage)) {
        notifyError(errorMessage[0], 5000);
      } else {
        notifyError(errorMessage || 'Ocorreu um erro, contate a administração com o código de erro 002.', 3000);
      }
    }
  });
}

// Hook para logout
export function useLogout() {
  const router = useRouter();

  return () => {
    browserStorage.removeItem('session');
    router.push('/');
  };
}
