"use client";

import styled from "styled-components";
import { tokens } from "@/styles/tokens";
import Link from "next/link";

// Estilos para a página de detalhes de serviço
export const ServiceDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${tokens.spacing[6]};
`;

export const ServiceDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing[6]};
`;

export const ServiceDetailTitle = styled.h1`
  font-size: ${tokens.typography.fontSize.xl2};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ServiceDetailBackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${tokens.colors.primary.main};
  text-decoration: none;
  font-weight: ${tokens.typography.fontWeight.medium};
  font-size: ${tokens.typography.fontSize.sm};

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: ${tokens.spacing[2]};
  }
`;

export const ServiceDetailContent = styled.div`
  background-color: #FFFFFF;
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.sm};
  padding: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[6]};
`;

export const ServiceDetailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[6]};
`;

export const ServiceDetailInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ServiceDetailInfoLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[1]};
`;

export const ServiceDetailInfoValue = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.primary};
  font-weight: ${tokens.typography.fontWeight.medium};
`;

export const ServiceDetailSectionTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin-top: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[4]};
  padding-bottom: ${tokens.spacing[2]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

export const ServiceDetailActions = styled.div`
  display: flex;
  gap: ${tokens.spacing[2]};
  margin-top: ${tokens.spacing[6]};
`;

export const ServiceDetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  background-color: #FFFFFF;
  color: ${tokens.colors.text.primary};
  border: 1px solid ${tokens.colors.border.light};
  border-radius: ${tokens.borderRadius.md};
  cursor: pointer;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;
  box-shadow: ${tokens.shadows.sm};

  &:hover {
    box-shadow: ${tokens.shadows.md};
  }
`;

export const ServiceDetailPrimaryButton = styled(ServiceDetailButton)`
  background-color: ${tokens.colors.primary.main};
  color: #FFFFFF;
  border: none;
`;

export const ServiceDetailSecondaryButton = styled(ServiceDetailButton)`
  background-color: ${tokens.colors.secondary.main};
  color: #FFFFFF;
  border: none;
`;

export const ServiceDetailSuccessButton = styled(ServiceDetailButton)`
  background-color: ${tokens.colors.success.main};
  color: #FFFFFF;
  border: none;
`;

export const ServiceDetailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${tokens.spacing[4]};
  border: 1px solid #DDD;

  thead {
    background-color: #f2f2f2;
    border-bottom: 2px solid #DDD;

    th {
      padding: ${tokens.spacing[3]};
      text-align: left;
      font-weight: ${tokens.typography.fontWeight.semibold};
      color: #333333;
      font-size: ${tokens.typography.fontSize.sm};
      border-bottom: 1px solid #DDD;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #DDD;

      td {
        padding: ${tokens.spacing[3]};
        color: #333333;
        font-size: ${tokens.typography.fontSize.sm};
      }
    }
  }
`;

export const ServiceDetailSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${tokens.spacing[2]};
  margin-bottom: ${tokens.spacing[4]};
  background-color: #f9f9f9;
  padding: ${tokens.spacing[3]};
  border-radius: ${tokens.borderRadius.md};
  border: 1px solid #DDD;
`;

export const ServiceDetailSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: ${tokens.spacing[2]} 0;
`;

export const ServiceDetailSummaryLabel = styled.span`
  color: #555555;
  font-weight: ${tokens.typography.fontWeight.medium};
`;

export const ServiceDetailSummaryValue = styled.span`
  color: #333333;
  font-weight: ${tokens.typography.fontWeight.medium};
`;

export const ServiceDetailSummaryTotal = styled(ServiceDetailSummaryRow)`
  border-top: 1px solid #DDD;
  margin-top: ${tokens.spacing[2]};

  span {
    color: #333333;
    font-weight: ${tokens.typography.fontWeight.bold};
  }
`;

export const ServiceDetailSummaryProfit = styled(ServiceDetailSummaryRow)`
  background-color: #e6ffee;
  border-radius: ${tokens.borderRadius.md};
  margin-top: ${tokens.spacing[2]};
  border: 1px solid #99e699;

  span {
    color: #006600;
    font-weight: ${tokens.typography.fontWeight.bold};
  }
`;
