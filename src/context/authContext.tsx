"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  setAuthInfo: (user: any) => void;
  userLogged: any;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userLogged, setUserLogged] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Inicializar o estado do sidebar a partir do localStorage, se disponível
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSidebarState = localStorage.getItem('sidebarOpen');
      if (savedSidebarState !== null) {
        setSidebarOpen(savedSidebarState === 'true');
      }
    }
  }, []);

  // Salvar o estado do sidebar no localStorage quando mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', String(isSidebarOpen));
    }
  }, [isSidebarOpen]);

  const setAuthInfo = (user: any) => {
    setUserLogged(user);
  };

  return (
    <AuthContext.Provider value={{ setAuthInfo, userLogged, isSidebarOpen, setSidebarOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
