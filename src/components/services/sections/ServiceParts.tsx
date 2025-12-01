"use client";

import React from 'react';
import { ServiceDetailSectionTitle, ServiceDetailTable } from '../styles/ServiceStyles';

interface Part {
  id: string;
  name: string;
  quantity: number;
  cost_price: number;
  sale_price: number;
}

interface ServicePartsProps {
  parts: Part[];
}

const ServiceParts: React.FC<ServicePartsProps> = ({ parts }) => {
  return (
    <>
      <ServiceDetailSectionTitle>
        Peças Utilizadas
      </ServiceDetailSectionTitle>

      <ServiceDetailTable>
        <thead>
          <tr>
            <th>Peça</th>
            <th style={{ textAlign: 'center' }}>Quantidade</th>
            <th style={{ textAlign: 'right' }}>Valor Unitário (R$)</th>
            <th style={{ textAlign: 'right' }}>Subtotal (R$)</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td style={{ textAlign: 'center' }}>{part.quantity}</td>
              <td style={{ textAlign: 'right' }}>{part.sale_price.toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>{(part.quantity * part.sale_price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </ServiceDetailTable>
    </>
  );
};

export default ServiceParts;
