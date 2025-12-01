"use client";

import React from 'react';
import { FiDollarSign, FiFileText, FiPrinter } from 'react-icons/fi';
import { ServiceDetailActions, ServiceDetailPrimaryButton, ServiceDetailSecondaryButton } from '../styles/ServiceStyles';

interface ServiceActionsProps {
  onOpenBillingModal: () => void;
  onOpenServiceOrderModal: () => void;
  onPrintServiceOrder: () => void;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ 
  onOpenBillingModal, 
  onOpenServiceOrderModal,
  onPrintServiceOrder
}) => {
  return (
    <ServiceDetailActions>
      <ServiceDetailPrimaryButton onClick={onOpenBillingModal}>
        <FiDollarSign size={16} />
        Faturamento
      </ServiceDetailPrimaryButton>
      
      <ServiceDetailSecondaryButton onClick={onOpenServiceOrderModal}>
        <FiFileText size={16} />
        Ordem de Serviço
      </ServiceDetailSecondaryButton>
      
    </ServiceDetailActions>
  );
};

export default ServiceActions;
