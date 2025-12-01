import styled, { keyframes } from 'styled-components';
import { tokens } from '@/styles/tokens';

export const ClientsContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${tokens.spacing[6]};
`;

export const ClientsHeader = styled.div`
  margin-bottom: ${tokens.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${tokens.spacing[4]};

  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ClientsTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ClientsActions = styled.div`
  display: flex;
  gap: ${tokens.spacing[4]};
  align-items: center;

  @media (max-width: ${tokens.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${tokens.colors.background.paper};
  border: 1px solid ${tokens.colors.border.main};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  width: 300px;
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};

  &:focus-within {
    border-color: ${tokens.colors.primary.main};
    box-shadow: 0 0 0 2px ${tokens.colors.primary.light}40;
  }

  svg {
    color: ${tokens.colors.grey[500]};
    margin-right: ${tokens.spacing[2]};
  }

  @media (max-width: ${tokens.breakpoints.sm}) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.primary};
  outline: none;

  &::placeholder {
    color: ${tokens.colors.text.hint};
  }
`;

export const ClientsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: ${tokens.borderRadius.lg};
  overflow: hidden;
`;

export const ClientsTableHeader = styled.thead`
  background-color: ${tokens.colors.background.paper};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ClientsTableHeaderCell = styled.th`
  padding: ${tokens.spacing[4]};
  text-align: left;
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:last-child {
    text-align: right;
  }
`;

export const ClientsTableBody = styled.tbody``;

export const ClientsTableRow = styled.tr`
  border-bottom: 1px solid ${tokens.colors.border.main};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};

  &:hover {
    background-color: ${tokens.colors.background.hover};
    box-shadow: ${tokens.shadows.sm};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ClientsTableCell = styled.td`
  padding: ${tokens.spacing[4]};
  color: ${tokens.colors.text.primary};
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.medium};

  &:first-child {
    font-weight: ${tokens.typography.fontWeight.semibold};
  }

  &:last-child {
    text-align: right;
    white-space: nowrap;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[12]};
  color: ${tokens.colors.text.secondary};
  text-align: center;

  svg {
    color: ${tokens.colors.grey[400]};
    margin-bottom: ${tokens.spacing[4]};
  }

  p {
    margin-bottom: ${tokens.spacing[6]};
    font-size: ${tokens.typography.fontSize.lg};
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    margin-bottom: ${tokens.spacing[4]};
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: ${tokens.colors.primary.main};
    animation: ${spin} 1s linear infinite;
  }
`;
