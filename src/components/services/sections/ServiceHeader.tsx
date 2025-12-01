"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { ServiceDetailHeader, ServiceDetailTitle, ServiceDetailBackLink } from '../styles/ServiceStyles';

interface ServiceHeaderProps {
  title: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ title }) => {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('cliente');

  // Construímos o link de volta para a página do cliente
  const backLink = clientId ? `/clientes/${clientId}` : '/';

  return (
    <ServiceDetailHeader>
      <ServiceDetailTitle>{title}</ServiceDetailTitle>
      <ServiceDetailBackLink href={backLink}>
        <FiArrowLeft size={16} />
        Voltar para detalhes do cliente
      </ServiceDetailBackLink>
    </ServiceDetailHeader>
  );
};

export default ServiceHeader;
