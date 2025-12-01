"use client";

import React from 'react';
import { useUIPreferences } from '@/context/uiPreferencesContext';

export const UIPreferencesTest = () => {
  const { preferences, setClientSectionExpanded, isClientSectionExpanded } = useUIPreferences();
  
  // Cliente de teste
  const testClientId = 'test-client-123';
  
  // Verificar o estado atual
  const isServiceExpanded = isClientSectionExpanded(testClientId, 'serviceHistory');
  const isPurchaseExpanded = isClientSectionExpanded(testClientId, 'purchaseHistory');
  
  // Funções para alternar os estados
  const toggleServiceHistory = () => {
    setClientSectionExpanded(testClientId, 'serviceHistory', !isServiceExpanded);
  };
  
  const togglePurchaseHistory = () => {
    setClientSectionExpanded(testClientId, 'purchaseHistory', !isPurchaseExpanded);
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px' }}>
      <h2>Teste de Preferências de UI</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Estado Atual:</h3>
        <p>
          <strong>Histórico de Serviços:</strong> {isServiceExpanded ? 'Expandido' : 'Minimizado'}
        </p>
        <p>
          <strong>Histórico de Compras:</strong> {isPurchaseExpanded ? 'Expandido' : 'Minimizado'}
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={toggleServiceHistory}
          style={{ 
            padding: '8px 16px', 
            background: isServiceExpanded ? '#f44336' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isServiceExpanded ? 'Minimizar' : 'Expandir'} Histórico de Serviços
        </button>
        
        <button 
          onClick={togglePurchaseHistory}
          style={{ 
            padding: '8px 16px', 
            background: isPurchaseExpanded ? '#f44336' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isPurchaseExpanded ? 'Minimizar' : 'Expandir'} Histórico de Compras
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Dados Completos do Contexto:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(preferences, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default UIPreferencesTest;
