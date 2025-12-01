"use client";

// Utilitário para verificar se estamos no navegador
export const isBrowser = (): boolean => typeof window !== 'undefined';

// Utilitário para localStorage
export const browserStorage = {
  // Obter um item do localStorage
  getItem: (key: string): string | null => {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error);
      return null;
    }
  },

  // Definir um item no localStorage
  setItem: (key: string, value: string): void => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  },

  // Remover um item do localStorage
  removeItem: (key: string): void => {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover ${key} do localStorage:`, error);
    }
  },

  // Obter um objeto do localStorage
  getObject: <T>(key: string): T | null => {
    if (!isBrowser()) return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Erro ao ler objeto ${key} do localStorage:`, error);
      return null;
    }
  },

  // Definir um objeto no localStorage
  setObject: <T>(key: string, value: T): void => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao salvar objeto ${key} no localStorage:`, error);
    }
  },

  // Verificar se um item existe no localStorage
  hasItem: (key: string): boolean => {
    if (!isBrowser()) return false;
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Erro ao verificar ${key} no localStorage:`, error);
      return false;
    }
  }
};
