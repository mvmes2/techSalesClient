'use client';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_INTERNAL_API,
  headers: {
    'Content-Type': 'application/json',
  }
});

import { browserStorage } from '@/utils/browserStorage';

// Interceptor para adicionar o token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const sessionData = browserStorage.getObject<any>('session');
    const token = sessionData
      ? `Bearer ${sessionData.session.session_access_token}`
      : null;

    if (token) {
      config.headers['authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tipos para as requisições
export type ApiResponse<T> = {
  data: T;
  status: number;
};

// Função genérica para fazer requisições
export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}

// Funções específicas para cada tipo de requisição
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: 'GET', url });
}

export async function apiPost<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: 'POST', url, data });
}

export async function apiPut<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: 'PUT', url, data });
}

export async function apiPatch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: 'PATCH', url, data });
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: 'DELETE', url });
}
