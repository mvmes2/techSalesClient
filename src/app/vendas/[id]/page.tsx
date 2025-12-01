"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiArrowLeft, FiShoppingBag, FiDollarSign, FiCalendar, FiUser, FiPackage, FiCreditCard } from "react-icons/fi";
import { useCustomerContext } from "@/context/customerContext";
import { useAuthContext } from "@/context/authContext";
import Loading from "@/components/ui/Loading";
import styled from "styled-components";
import { tokens } from "@/styles/tokens";

// Estilos para a página de detalhes de venda
const SaleDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${tokens.spacing[6]};
`;

const SaleDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[6]};
  padding-bottom: ${tokens.spacing[6]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

const SaleDetailHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SaleDetailTitle = styled.h1`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: ${tokens.spacing[2]} 0;
`;

const SaleDetailSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  color: ${tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  margin-bottom: ${tokens.spacing[4]};
`;

const SaleDetailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[6]};
`;

const SaleDetailInfoCard = styled.div`
  background-color: ${tokens.colors.background.default};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[4]};
  box-shadow: ${tokens.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[2]};
`;

const SaleDetailInfoTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.text.secondary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
`;

const SaleDetailInfoValue = styled.div`
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
`;

const SaleDetailSection = styled.section`
  margin-bottom: ${tokens.spacing[6]};
`;

const SaleDetailSectionTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin-bottom: ${tokens.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
`;

const SaleItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${tokens.spacing[4]};
`;

const SaleItemsTableHead = styled.thead`
  background-color: ${tokens.colors.background.light};
  border-radius: ${tokens.borderRadius.md};

  th {
    padding: ${tokens.spacing[3]};
    text-align: left;
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.text.secondary};
    font-size: ${tokens.typography.fontSize.sm};

    &:first-child {
      border-top-left-radius: ${tokens.borderRadius.md};
      border-bottom-left-radius: ${tokens.borderRadius.md};
    }

    &:last-child {
      border-top-right-radius: ${tokens.borderRadius.md};
      border-bottom-right-radius: ${tokens.borderRadius.md};
    }
  }
`;

const SaleItemsTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid ${tokens.colors.border.light};

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: ${tokens.spacing[3]};
    color: ${tokens.colors.text.primary};
    font-size: ${tokens.typography.fontSize.sm};
  }
`;

const SaleItemImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${tokens.borderRadius.md};
  background-color: ${tokens.colors.background.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.text.secondary};
`;

const SaleSummary = styled.div`
  margin-top: ${tokens.spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${tokens.spacing[2]};
`;

const SaleSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: ${tokens.spacing[2]} 0;

  &:last-child {
    border-top: 1px solid ${tokens.colors.border.light};
    padding-top: ${tokens.spacing[3]};
    margin-top: ${tokens.spacing[2]};
    font-weight: ${tokens.typography.fontWeight.bold};
    font-size: ${tokens.typography.fontSize.md};
  }
`;

const SaleSummaryLabel = styled.span`
  color: ${tokens.colors.text.secondary};
`;

const SaleSummaryValue = styled.span`
  color: ${tokens.colors.text.primary};
  font-weight: ${tokens.typography.fontWeight.medium};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  background: none;
  border: none;
  color: ${tokens.colors.primary.main};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  padding: ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.primary.light};
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${tokens.spacing[1]} ${tokens.spacing[3]};
  border-radius: ${tokens.borderRadius.full};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};

  ${({ $status }) => {
    if ($status === 'paid') {
      return `
        background-color: ${tokens.colors.success.light};
        color: ${tokens.colors.success.dark};
      `;
    } else if ($status === 'pending') {
      return `
        background-color: ${tokens.colors.warning.light};
        color: ${tokens.colors.warning.dark};
      `;
    } else {
      return `
        background-color: ${tokens.colors.error.light};
        color: ${tokens.colors.error.dark};
      `;
    }
  }}
`;

export default function SaleDetailPage() {
  const { customer, useMockData, mockCustomer } = useCustomerContext();
  const { userLogged } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('cliente');
  const saleId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';

  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState<any>(null);
  const [saleCustomer, setSaleCustomer] = useState<any>(null);

  useEffect(() => {
    // Simulando carregamento de dados
    const loadData = async () => {
      setIsLoading(true);

      try {
        // Se estiver usando dados mockados, use-os
        if (useMockData && mockCustomer) {
          const foundSale = mockCustomer.sales.find((s: any) => s.id === saleId);
          if (foundSale) {
            setSale(foundSale);
            setSaleCustomer(mockCustomer);
          }
        } else if (customer) {
          // Se tiver um cliente carregado, procure a venda nos dados do cliente
          const foundSale = customer.sales?.find((s: any) => s.id === saleId);
          if (foundSale) {
            setSale(foundSale);
            setSaleCustomer(customer);
          }
        }

        // Aqui você adicionaria a lógica para buscar os dados da API
        // const response = await apiGet(`/sales/${saleId}`);
        // setSale(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados da venda:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [saleId, customer, useMockData, mockCustomer]);

  if (isLoading) {
    return (
      <SaleDetailContainer>
        <Loading fullScreen text="Carregando detalhes da venda..." />
      </SaleDetailContainer>
    );
  }

  if (!sale) {
    return (
      <SaleDetailContainer>
        <SaleDetailHeader>
          <Link href={clientId ? `/clientes/${clientId}` : "/clientes"}>
            <BackButton>
              <FiArrowLeft size={18} />
              Voltar para o cliente
            </BackButton>
          </Link>
          <SaleDetailTitle>Venda não encontrada</SaleDetailTitle>
        </SaleDetailHeader>
      </SaleDetailContainer>
    );
  }

  // Calcular o subtotal (soma dos itens)
  const subtotal = sale.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  // Valores para cálculo
  const taxRate = 0.05; // 5% de imposto
  const taxes = subtotal * taxRate;
  const discount = 0; // Sem desconto neste exemplo
  const interest = sale.interest_amount || 0; // Juros do parcelamento

  // Cálculo do total incluindo impostos e juros
  const total = subtotal + taxes + interest - discount;

  return (
    <SaleDetailContainer>
      <SaleDetailHeader>
        <SaleDetailHeaderTop>
          <div>
            <Link href={clientId ? `/clientes/${clientId}` : "/clientes"}>
              <BackButton>
                <FiArrowLeft size={18} />
                Voltar para o cliente
              </BackButton>
            </Link>
            <SaleDetailTitle>Venda #{sale.id.substring(0, 8)}</SaleDetailTitle>
            <SaleDetailSubtitle>
              <FiCalendar size={14} />
              {format(new Date(sale.created_at), 'dd MMMM yyyy', { locale: ptBR })}
            </SaleDetailSubtitle>
          </div>
          <StatusBadge $status={sale.status || 'paid'}>
            {sale.status === 'paid' ? 'Pago' :
             sale.status === 'pending' ? 'Pendente' : 'Cancelado'}
          </StatusBadge>
        </SaleDetailHeaderTop>
      </SaleDetailHeader>

      <SaleDetailInfo>
        <SaleDetailInfoCard>
          <SaleDetailInfoTitle>
            <FiUser size={16} />
            Cliente
          </SaleDetailInfoTitle>
          <SaleDetailInfoValue>{saleCustomer?.customer_name || 'Cliente não identificado'}</SaleDetailInfoValue>
          {saleCustomer?.customer_phone_number && (
            <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary }}>
              {saleCustomer.customer_phone_number}
            </div>
          )}
        </SaleDetailInfoCard>

        <SaleDetailInfoCard>
          <SaleDetailInfoTitle>
            <FiDollarSign size={16} />
            Valor Total
          </SaleDetailInfoTitle>
          <SaleDetailInfoValue>R$ {sale.total_amount.toFixed(2)}</SaleDetailInfoValue>
        </SaleDetailInfoCard>

        <SaleDetailInfoCard>
          <SaleDetailInfoTitle>
            <FiCreditCard size={16} />
            Forma de Pagamento
          </SaleDetailInfoTitle>
          <SaleDetailInfoValue>
            {sale.payment_method === 'credit_card' ? 'Cartão de Crédito' :
             sale.payment_method === 'debit_card' ? 'Cartão de Débito' :
             sale.payment_method === 'cash' ? 'Dinheiro' :
             sale.payment_method === 'pix' ? 'PIX' : 'Outro'}
          </SaleDetailInfoValue>
          {sale.payment_method === 'credit_card' && sale.installments > 1 && (
            <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary, marginTop: tokens.spacing[1] }}>
              {sale.installments}x de R$ {sale.installment_value.toFixed(2)}
              {sale.interest_rate > 0 && (
                <span> (juros de {(sale.interest_rate * 100).toFixed(0)}%)</span>
              )}
            </div>
          )}
        </SaleDetailInfoCard>

        <SaleDetailInfoCard>
          <SaleDetailInfoTitle>
            <FiPackage size={16} />
            Itens
          </SaleDetailInfoTitle>
          <SaleDetailInfoValue>{sale.items.length} produto(s)</SaleDetailInfoValue>
        </SaleDetailInfoCard>
      </SaleDetailInfo>

      <SaleDetailSection>
        <SaleDetailSectionTitle>
          <FiShoppingBag size={20} />
          Itens da Venda
        </SaleDetailSectionTitle>

        <SaleItemsTable>
          <SaleItemsTableHead>
            <tr>
              <th style={{ width: '60px' }}></th>
              <th>Produto</th>
              <th>Preço Unitário</th>
              <th>Quantidade</th>
              <th style={{ textAlign: 'right' }}>Subtotal</th>
            </tr>
          </SaleItemsTableHead>
          <SaleItemsTableBody>
            {sale.items.map((item: any) => (
              <tr key={item.id}>
                <td>
                  <SaleItemImage>
                    <FiPackage size={20} />
                  </SaleItemImage>
                </td>
                <td>
                  <div style={{ fontWeight: tokens.typography.fontWeight.medium }}>{item.product_name}</div>
                  <div style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary }}>
                    Código: {item.id.substring(0, 8)}
                  </div>
                </td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td style={{ textAlign: 'right', fontWeight: tokens.typography.fontWeight.medium }}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </SaleItemsTableBody>
        </SaleItemsTable>

        <SaleSummary>
          <SaleSummaryRow>
            <SaleSummaryLabel>Subtotal</SaleSummaryLabel>
            <SaleSummaryValue>R$ {subtotal.toFixed(2)}</SaleSummaryValue>
          </SaleSummaryRow>
          <SaleSummaryRow>
            <SaleSummaryLabel>Impostos (5%)</SaleSummaryLabel>
            <SaleSummaryValue>R$ {taxes.toFixed(2)}</SaleSummaryValue>
          </SaleSummaryRow>
          {sale.interest_amount > 0 && (
            <SaleSummaryRow>
              <SaleSummaryLabel>Juros ({(sale.interest_rate * 100).toFixed(0)}%)</SaleSummaryLabel>
              <SaleSummaryValue>R$ {sale.interest_amount.toFixed(2)}</SaleSummaryValue>
            </SaleSummaryRow>
          )}
          <SaleSummaryRow>
            <SaleSummaryLabel>Desconto</SaleSummaryLabel>
            <SaleSummaryValue>R$ {discount.toFixed(2)}</SaleSummaryValue>
          </SaleSummaryRow>
          <SaleSummaryRow>
            <SaleSummaryLabel>Total</SaleSummaryLabel>
            <SaleSummaryValue>R$ {total.toFixed(2)}</SaleSummaryValue>
          </SaleSummaryRow>
          {sale.payment_method === 'credit_card' && sale.installments > 1 && (
            <div style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary, marginTop: tokens.spacing[2], textAlign: 'right' }}>
              Parcelado em {sale.installments}x de R$ {sale.installment_value.toFixed(2)}
            </div>
          )}
        </SaleSummary>
      </SaleDetailSection>
    </SaleDetailContainer>
  );
}
