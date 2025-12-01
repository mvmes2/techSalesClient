"use client";

import React, { useEffect, useState } from 'react';
import { ServiceDetailContainer } from './styles/ServiceStyles';
import ServiceHeader from './sections/ServiceHeader';
import ServiceInfo from './sections/ServiceInfo';
import ServiceParts from './sections/ServiceParts';
import ServiceActions from './sections/ServiceActions';
import BillingModal from './modals/BillingModal';
import ServiceOrderModal from './modals/ServiceOrderModal';


interface ServiceDetailProps {
  service: any; // Usando any temporariamente, mas idealmente deveria ser tipado corretamente
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {

  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isServiceOrderModalOpen, setIsServiceOrderModalOpen] = useState(false);

  const handleOpenBillingModal = () => {
    setIsBillingModalOpen(true);
  };

  const handleCloseBillingModal = () => {
    setIsBillingModalOpen(false);
  };

  const handleOpenServiceOrderModal = () => {
    setIsServiceOrderModalOpen(true);
  };

  const handleCloseServiceOrderModal = () => {
    setIsServiceOrderModalOpen(false);
  };

  const handlePrintServiceOrder = () => {
    // Implementação da impressão
    window.print();
  };

  return (
    <ServiceDetailContainer>
      <ServiceHeader title={service.title} />
      
      <ServiceInfo service={service} />
      
      {service.parts && service.parts.length > 0 && (
        <ServiceParts parts={service.parts} />
      )}
      
      <ServiceActions 
        onOpenBillingModal={handleOpenBillingModal}
        onOpenServiceOrderModal={handleOpenServiceOrderModal}
        onPrintServiceOrder={handlePrintServiceOrder}
      />
      
      <BillingModal 
        service={service}
        isOpen={isBillingModalOpen}
        onClose={handleCloseBillingModal}
      />
      
      <ServiceOrderModal 
        service={service}
        isOpen={isServiceOrderModalOpen}
        onClose={handleCloseServiceOrderModal}
      />
    </ServiceDetailContainer>
  );
};

export default ServiceDetail;
