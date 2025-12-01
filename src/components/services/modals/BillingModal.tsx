"use client";

import React from 'react';
import { ModalOverlay, ModalContent, ModalCloseButton, ModalTitle } from './ModalStyles';
import { ServiceDetailTable, ServiceDetailSummary, ServiceDetailSummaryRow, ServiceDetailSummaryLabel, ServiceDetailSummaryValue, ServiceDetailSummaryTotal, ServiceDetailSummaryProfit } from '../styles/ServiceStyles';

interface Part {
  id: string;
  name: string;
  quantity: number;
  cost_price: number;
  sale_price: number;
  markup: number;
}

interface ServiceData {
  id: string;
  parts: Part[];
  parts_cost: number;
  labor_cost: number;
  price: number;
}

interface BillingModalProps {
  service: ServiceData;
  isOpen: boolean;
  onClose: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ service, isOpen, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const calculateProfit = () => {
    return service.labor_cost + service.parts.reduce((acc, part) => acc + (part.sale_price - part.cost_price), 0);
  };

  return (
    <ModalOverlay 
      id="billingModal" 
      onClick={handleOverlayClick}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <ModalContent>
        <ModalCloseButton title='Fechar' onClick={onClose} aria-label="Fechar modal">
          X
        </ModalCloseButton>

        <ModalTitle>
          Faturamento da Ordem de Serviço
        </ModalTitle>

        <ServiceDetailTable>
          <thead>
            <tr>
              <th>Peça</th>
              <th style={{ textAlign: 'center' }}>Quantidade</th>
              <th style={{ textAlign: 'right' }}>Custo (R$)</th>
              <th style={{ textAlign: 'right' }}>Repasse (R$)</th>
              <th style={{ textAlign: 'right' }}>Markup (%)</th>
              <th style={{ textAlign: 'right' }}>Lucro (R$)</th>
            </tr>
          </thead>
          <tbody>
            {service.parts.map((part) => (
              <tr key={part.id}>
                <td>{part.name}</td>
                <td style={{ textAlign: 'center' }}>{part.quantity}</td>
                <td style={{ textAlign: 'right' }}>{part.cost_price > 0 ? part.cost_price.toFixed(2) : '-'}</td>
                <td style={{ textAlign: 'right' }}>{part.sale_price > 0 ? part.sale_price.toFixed(2) : '-'}</td>
                <td style={{ textAlign: 'right' }}>{part.markup > 0 ? part.markup.toFixed(2) : '-'}</td>
                <td style={{ textAlign: 'right', color: part.sale_price - part.cost_price > 0 ? '#006600' : '#333333', fontWeight: 'medium' }}>
                  {part.sale_price > 0 ? (part.sale_price - part.cost_price).toFixed(2) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </ServiceDetailTable>

        <ServiceDetailSummary>
          <ServiceDetailSummaryRow>
            <ServiceDetailSummaryLabel>Custo real das peças</ServiceDetailSummaryLabel>
            <ServiceDetailSummaryValue>R$ {service.parts_cost.toFixed(2)}</ServiceDetailSummaryValue>
          </ServiceDetailSummaryRow>
          <ServiceDetailSummaryRow>
            <ServiceDetailSummaryLabel>Valor de repasse das peças</ServiceDetailSummaryLabel>
            <ServiceDetailSummaryValue>
              R$ {service.parts.reduce((acc, part) => acc + part.sale_price, 0).toFixed(2)}
            </ServiceDetailSummaryValue>
          </ServiceDetailSummaryRow>
          <ServiceDetailSummaryRow>
            <ServiceDetailSummaryLabel>Mão de obra</ServiceDetailSummaryLabel>
            <ServiceDetailSummaryValue>R$ {service.labor_cost.toFixed(2)}</ServiceDetailSummaryValue>
          </ServiceDetailSummaryRow>
          <ServiceDetailSummaryTotal>
            <ServiceDetailSummaryLabel>Valor total cobrado</ServiceDetailSummaryLabel>
            <ServiceDetailSummaryValue>R$ {service.price.toFixed(2)}</ServiceDetailSummaryValue>
          </ServiceDetailSummaryTotal>
          <ServiceDetailSummaryProfit>
            <ServiceDetailSummaryLabel>Lucro líquido</ServiceDetailSummaryLabel>
            <ServiceDetailSummaryValue>R$ {calculateProfit().toFixed(2)}</ServiceDetailSummaryValue>
          </ServiceDetailSummaryProfit>
        </ServiceDetailSummary>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BillingModal;
