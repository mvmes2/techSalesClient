"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definindo o tipo para as preferências de UI
interface UIPreferences {
  // Cliente
  expandedClientSections: {
    [clientId: string]: {
      purchaseHistory: boolean;
      serviceHistory: boolean;
    };
  };
  // Outras preferências podem ser adicionadas aqui
}

// Definindo o tipo para o contexto
interface UIPreferencesContextType {
  preferences: UIPreferences;
  setClientSectionExpanded: (clientId: string, section: 'purchaseHistory' | 'serviceHistory', expanded: boolean) => void;
  isClientSectionExpanded: (clientId: string, section: 'purchaseHistory' | 'serviceHistory') => boolean;
  // Outros métodos podem ser adicionados aqui
}

// Criando o contexto com um valor padrão
const UIPreferencesContext = createContext<UIPreferencesContextType | undefined>(undefined);

// Valor inicial para as preferências
const initialPreferences: UIPreferences = {
  expandedClientSections: {},
};

// Provider component
export const UIPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializando o estado com o valor do localStorage, se disponível
  const [preferences, setPreferences] = useState<UIPreferences>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedPreferences = localStorage.getItem('uiPreferences');
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          console.log('Preferências carregadas do localStorage:', parsed);
          return parsed;
        }
      } catch (error) {
        console.error('Erro ao carregar preferências do localStorage:', error);
      }
    }
    console.log('Usando preferências iniciais:', initialPreferences);
    return initialPreferences;
  });

  // Salvando as preferências no localStorage quando elas mudam
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const preferencesString = JSON.stringify(preferences);
        localStorage.setItem('uiPreferences', preferencesString);
        console.log('Preferências salvas no localStorage:', preferences);
      } catch (error) {
        console.error('Erro ao salvar preferências no localStorage:', error);
      }
    }
  }, [preferences]);

  // Método para definir se uma seção está expandida
  const setClientSectionExpanded = (
    clientId: string,
    section: 'purchaseHistory' | 'serviceHistory',
    expanded: boolean
  ) => {
    console.log(`Alterando seção ${section} do cliente ${clientId} para ${expanded ? 'expandido' : 'minimizado'}`);

    setPreferences((prev) => {
      const clientSections = prev.expandedClientSections[clientId] || {
        purchaseHistory: false,
        serviceHistory: false,
      };

      const newPreferences = {
        ...prev,
        expandedClientSections: {
          ...prev.expandedClientSections,
          [clientId]: {
            ...clientSections,
            [section]: expanded,
          },
        },
      };

      console.log('Novo estado:', newPreferences);
      return newPreferences;
    });
  };

  // Método para verificar se uma seção está expandida
  const isClientSectionExpanded = (
    clientId: string,
    section: 'purchaseHistory' | 'serviceHistory'
  ): boolean => {
    const clientSections = preferences.expandedClientSections[clientId];
    const isExpanded = clientSections ? clientSections[section] || false : false;

    console.log(`Verificando seção ${section} do cliente ${clientId}: ${isExpanded ? 'expandido' : 'minimizado'}`);
    console.log('Estado atual:', preferences);

    return isExpanded;
  };

  // Valor do contexto
  const contextValue: UIPreferencesContextType = {
    preferences,
    setClientSectionExpanded,
    isClientSectionExpanded,
  };

  return (
    <UIPreferencesContext.Provider value={contextValue}>
      {children}
    </UIPreferencesContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUIPreferences = (): UIPreferencesContextType => {
  const context = useContext(UIPreferencesContext);
  if (context === undefined) {
    throw new Error('useUIPreferences must be used within a UIPreferencesProvider');
  }
  return context;
};
