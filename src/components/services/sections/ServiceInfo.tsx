"use client";

import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCalendar, FiUser, FiClock, FiClipboard, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { ServiceDetailContent, ServiceDetailInfo, ServiceDetailInfoItem, ServiceDetailInfoLabel, ServiceDetailInfoValue } from '../styles/ServiceStyles';

interface ServiceInfoProps {
  service: {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    conclusion: string;
    client_name: string;
    technician_name: string;
  };
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ service }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return '#4CAF50';
      case 'em andamento':
        return '#2196F3';
      case 'aguardando':
        return '#FFC107';
      case 'cancelado':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return <FiCheckCircle size={16} />;
      case 'em andamento':
        return <FiClock size={16} />;
      case 'aguardando':
        return <FiClipboard size={16} />;
      case 'cancelado':
        return <FiAlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <ServiceDetailContent>
      <ServiceDetailInfo>
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>ID do Serviço</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue>#{service.id}</ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
        
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>Cliente</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiUser size={16} />
            {service.client_name}
          </ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
        
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>Técnico Responsável</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue>{service.technician_name}</ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
        
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>Data de Abertura</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiCalendar size={16} />
            {format(new Date(service.created_at), 'dd/MM/yyyy', { locale: ptBR })}
          </ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
        
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>Última Atualização</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiClock size={16} />
            {format(new Date(service.updated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
          </ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
        
        <ServiceDetailInfoItem>
          <ServiceDetailInfoLabel>Status</ServiceDetailInfoLabel>
          <ServiceDetailInfoValue style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: getStatusColor(service.status)
          }}>
            {getStatusIcon(service.status)}
            {service.status}
          </ServiceDetailInfoValue>
        </ServiceDetailInfoItem>
      </ServiceDetailInfo>
      
      <div>
        <ServiceDetailInfoLabel>Descrição do Problema</ServiceDetailInfoLabel>
        <p style={{ margin: '8px 0', fontSize: '14px' }}>{service.description}</p>
      </div>
      
      {service.conclusion && (
        <div style={{ marginTop: '16px' }}>
          <ServiceDetailInfoLabel>Conclusão</ServiceDetailInfoLabel>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>{service.conclusion}</p>
        </div>
      )}
    </ServiceDetailContent>
  );
};

export default ServiceInfo;
