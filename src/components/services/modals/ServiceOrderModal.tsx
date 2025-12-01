"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ModalOverlay, ModalContent, ModalCloseButton, ModalTitle, ModalSection } from './ModalStyles';
import jsPDF from 'jspdf';
import { useAuthContext } from "@/context/authContext";

interface Part {
  id: string;
  name: string;
  quantity: number;
  sale_price: number;
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  conclusion: string;
  client_name: string;
  client_document: string;
  client_phone: string;
  technician_name: string;
  parts: Part[];
  labor_cost: number;
  price: number;
}

interface ServiceOrderModalProps {
  service: ServiceData;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({ service, isOpen, onClose}) => {
  const { userLogged } = useAuthContext();

  const [authorizationImage, setAuthorizationImage] = useState<string | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAuthorizationImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Função para calcular o total das peças
  const calculatePartsTotal = (parts: Part[]) => {
    return parts.reduce((total, part) => total + (part.quantity * part.sale_price), 0);
  };

  // Função para gerar o PDF da ordem de serviço
  const generateServiceOrderPDF = () => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Configurações de fonte
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);

      // Título
      pdf.text('Ordem de Serviço', 15, 15);

      // Informações da empresa e OS
      pdf.setFontSize(12);
      pdf.text(`${userLogged?.company?.company_name || 'Empresa'}`, 15, 25);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`CNPJ: ${userLogged?.company?.cnpj || '12.345.678/0001-90'}`, 15, 30);

      pdf.text(`Data: ${format(new Date(service.created_at), 'dd/MM/yyyy', { locale: ptBR })}`, 150, 25);
      pdf.text(`OS #: ${service.id}`, 150, 30);

      // Linha divisória
      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, 35, 195, 35);

      // Dados do cliente
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Dados do Cliente', 15, 45);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Nome: ${service.client_name}`, 15, 52);
      pdf.text(`Telefone: ${service.client_phone}`, 15, 58);
      pdf.text(`Documento: ${service.client_document || 'Não informado'}`, 15, 64);

      // Dados do serviço
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Dados do Serviço', 15, 74);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Título: ${service.title}`, 15, 81);
      pdf.text(`Descrição: ${service.description}`, 15, 87);
      pdf.text(`Técnico: ${service.technician_name || 'Não atribuído'}`, 15, 93);

      // Peças utilizadas
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Peças Utilizadas', 15, 103);

      // Cabeçalho da tabela
      pdf.setDrawColor(0, 0, 0);
      pdf.setFillColor(240, 240, 240);
      pdf.rect(15, 108, 180, 8, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text('Peça', 17, 113);
      pdf.text('Quantidade', 90, 113);
      pdf.text('Valor Unitário', 120, 113);
      pdf.text('Subtotal', 160, 113);

      // Linhas da tabela
      let yPos = 120;
      pdf.setFont('helvetica', 'normal');

      if (service.parts && service.parts.length > 0) {
        service.parts.forEach((part) => {
          pdf.text(part.name, 17, yPos);
          pdf.text(part.quantity.toString(), 90, yPos);
          pdf.text(`R$ ${part.sale_price.toFixed(2)}`, 120, yPos);
          pdf.text(`R$ ${(part.quantity * part.sale_price).toFixed(2)}`, 160, yPos);
          yPos += 8;
        });
      } else {
        pdf.text('Nenhuma peça utilizada', 17, yPos);
        yPos += 8;
      }

      // Valores
      yPos += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Valores', 15, yPos);
      yPos += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Mão de Obra: R$ ${service.labor_cost ? service.labor_cost.toFixed(2) : '0.00'}`, 15, yPos);
      yPos += 6;

      const partsTotal = calculatePartsTotal(service.parts);
      pdf.text(`Total Peças: R$ ${partsTotal.toFixed(2)}`, 15, yPos);
      yPos += 6;

      pdf.setFont('helvetica', 'bold');
      pdf.text(`Valor Total: R$ ${(partsTotal + (service.labor_cost || 0)).toFixed(2)}`, 15, yPos);

      // Assinatura e CPF (na mesma linha)
      yPos += 85;
      pdf.line(15, yPos, 95, yPos); // Linha para assinatura
      pdf.line(115, yPos, 195, yPos); // Linha para CPF

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('Assinatura do Cliente', 45, yPos + 5);
      pdf.text('CPF:', 120, yPos + 5);

      return pdf;
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return null;
    }
  };

  // Função para salvar o PDF
  const handleGeneratePDF = () => {
    const pdf = generateServiceOrderPDF();
    if (pdf) {
      pdf.save(`ordem-servico-${service.id}.pdf`);
    }
  };

  // Função para imprimir o PDF
  const handlePrint = () => {
    const pdf = generateServiceOrderPDF();
    if (pdf) {
      try {
        // Gera o PDF como blob e abre para impressão
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Abre o PDF em uma nova aba e chama a impressão
        const printWindow = window.open(pdfUrl, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        }
      } catch (error) {
        console.error('Erro ao preparar impressão:', error);
      }
    }
  };

  return (
    <ModalOverlay
      id="serviceOrderModal"
      onClick={handleOverlayClick}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <ModalContent>
        <ModalCloseButton title='Fechar' onClick={onClose} aria-label="Fechar modal">
          X
        </ModalCloseButton>

        <ModalTitle>
          Ordem de Serviço
        </ModalTitle>

        <ModalSection>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{userLogged?.company?.company_name || 'Empresa'}</h3>
                <p style={{ margin: 0, color: '#666' }}>CNPJ: {userLogged?.company?.cnpj}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Ordem de Serviço #{service.id}</h3>
                <p style={{ margin: 0, color: '#666' }}>Data: {format(new Date(service.created_at), 'dd/MM/yyyy', { locale: ptBR })}</p>
              </div>
            </div>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Dados do Cliente</h4>
              <p style={{ margin: '4px 0' }}><strong>Nome:</strong> {service.client_name}</p>
              <p style={{ margin: '4px 0' }}><strong>CPF/CNPJ:</strong> {service.client_document}</p>
              <p style={{ margin: '4px 0' }}><strong>Telefone:</strong> {service.client_phone}</p>
            </div>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Serviço</h4>
              <p style={{ margin: '4px 0' }}><strong>Título:</strong> {service.title}</p>
              <p style={{ margin: '4px 0' }}><strong>Técnico Responsável:</strong> {service.technician_name}</p>
            </div>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Descrição do Problema</h4>
              <p style={{ margin: '4px 0' }}>{service.description}</p>
            </div>

            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Peças Utilizadas</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Peça</th>
                    <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Quantidade</th>
                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Valor Unitário (R$)</th>
                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Subtotal (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {service.parts.map((part) => (
                    <tr key={part.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '8px' }}>{part.name}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>{part.quantity}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>{part.sale_price.toFixed(2)}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>{(part.quantity * part.sale_price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                <span>Valor das Peças:</span>
                <span>R$ {service.parts.reduce((acc, part) => acc + (part.quantity * part.sale_price), 0).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                <span>Mão de Obra:</span>
                <span>R$ {service.labor_cost.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', borderTop: '1px solid #ddd', paddingTop: '8px', marginTop: '8px', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>R$ {service.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Autorização do Cliente</h4>

            {!authorizationImage ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}>
                <p style={{ marginBottom: '10px' }}>Faça upload da autorização do cliente (foto ou documento assinado)</p>
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ marginBottom: '10px' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={authorizationImage} alt="Autorização do cliente" style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }} />
                <button
                  onClick={() => setAuthorizationImage(null)}
                  style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Remover Autorização
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              onClick={handleGeneratePDF}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z" fill="white"/>
              </svg>
              Gerar PDF
            </button>

            <button
              onClick={handlePrint}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z" fill="white"/>
              </svg>
              Imprimir
            </button>
          </div>
        </ModalSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ServiceOrderModal;
