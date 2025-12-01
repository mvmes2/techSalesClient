import styled from "styled-components";
import { tokens } from "@/styles/tokens";

export const ClientDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${tokens.spacing[6]};
  background-color: ${tokens.colors.background.default};
`;

export const ClientDetailHeader = styled.div`
  margin-bottom: ${tokens.spacing[8]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${tokens.spacing[4]};
  padding-bottom: ${tokens.spacing[6]};
  border-bottom: 1px solid ${tokens.colors.border.light};

  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ClientDetailTitle = styled.h1`
  font-size: ${tokens.typography.fontSize["3xl"]};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ClientDetailSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  margin-top: ${tokens.spacing[1]};
  color: ${tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
`;

export const ClientDetailActions = styled.div`
  display: flex;
  gap: ${tokens.spacing[2]};
`;

export const ClientDetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing[8]};

  @media (min-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: 3fr 2fr;
  }
`;

export const ClientDetailSection = styled.section`
  margin-bottom: ${tokens.spacing[8]};
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  padding: ${tokens.spacing[6]};
  box-shadow: ${tokens.shadows.sm};
`;

export const ClientDetailSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing[6]};
  padding-bottom: ${tokens.spacing[3]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

export const ClientDetailSectionTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
`;

export const ClientDetailSectionToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[1]};
  border-radius: ${tokens.borderRadius.full};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.primary.light}20;
  }
`;

export const ClientInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${tokens.spacing[6]};
  margin-top: ${tokens.spacing[4]};

  @media (min-width: ${tokens.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${tokens.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ClientInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[2]};
  position: relative;
  padding: ${tokens.spacing[4]};
  border-radius: ${tokens.borderRadius.md};
  transition: all 0.2s ease;
  background-color: ${tokens.colors.background.default};
  border: 1px solid ${tokens.colors.border.light};

  &:hover {
    background-color: ${tokens.colors.background.hover};
    box-shadow: ${tokens.shadows.sm};
  }
`;

export const ClientInfoLabel = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
  font-weight: ${tokens.typography.fontWeight.medium};
  margin-bottom: ${tokens.spacing[1]};
`;

export const ClientInfoValue = styled.div`
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  font-weight: ${tokens.typography.fontWeight.medium};
  position: relative;
  padding: ${tokens.spacing[1]} 0;

  svg {
    color: ${tokens.colors.text.secondary};
    margin-right: ${tokens.spacing[2]};
  }
`;

export const EditIcon = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${tokens.colors.primary.main};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[1]};
  border-radius: ${tokens.borderRadius.full};

  ${ClientInfoItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${tokens.colors.primary.light}20;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const ClientInfoEdit = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  width: 100%;
`;

export const ClientInfoInput = styled.input`
  flex: 1;
  padding: ${tokens.spacing[2]};
  border: 1px solid ${tokens.colors.border.main};
  border-radius: ${tokens.borderRadius.md};
  font-size: ${tokens.typography.fontSize.md};
  font-family: ${tokens.typography.fontFamily};

  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary.main};
    box-shadow: 0 0 0 2px ${tokens.colors.primary.light}40;
  }
`;

export const SalesHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[4]};
  margin-top: ${tokens.spacing[4]};
`;

export const SaleItem = styled.div`
  padding: ${tokens.spacing[4]};
  border-radius: ${tokens.borderRadius.md};
  background-color: ${tokens.colors.background.default};
  border: 1px solid ${tokens.colors.border.light};
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: ${tokens.shadows.md};
    transform: translateY(-2px);
    background-color: ${tokens.colors.background.hover};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: ${tokens.borderRadius.md};
    transition: background-color 0.2s;
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${tokens.shadows.sm};

    &::after {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

export const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing[2]};
`;

export const SaleTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const SaleDate = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
`;

export const SaleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SaleAmount = styled.span`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.primary.main};
`;

export const SaleStatus = styled.span<{ $status: 'paid' | 'pending' | 'cancelled' | 'scheduled' }>`
  padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.full};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  text-transform: uppercase;

  ${props => props.$status === 'paid' && `
    background-color: ${tokens.colors.success.light}30;
    color: ${tokens.colors.success.dark};
  `}

  ${props => props.$status === 'pending' && `
    background-color: ${tokens.colors.warning.light}30;
    color: ${tokens.colors.warning.dark};
  `}

  ${props => props.$status === 'cancelled' && `
    background-color: ${tokens.colors.error.light}30;
    color: ${tokens.colors.error.dark};
  `}

  ${props => props.$status === 'scheduled' && `
    background-color: ${tokens.colors.info.light}30;
    color: ${tokens.colors.info.dark};
  `}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[8]};
  text-align: center;
  color: ${tokens.colors.text.secondary};
  margin-top: ${tokens.spacing[4]};
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  border: 1px dashed ${tokens.colors.border.main};

  svg {
    color: ${tokens.colors.text.disabled};
    margin-bottom: ${tokens.spacing[4]};
    font-size: 64px;
  }

  p {
    margin-bottom: ${tokens.spacing[4]};
    font-size: ${tokens.typography.fontSize.lg};
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[1]};
  background: none;
  border: none;
  color: ${tokens.colors.primary.main};
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.primary.light}20;
  }
`;

export const ActionButton = styled.button`
  background-color: ${tokens.colors.primary.main};
  color: ${tokens.colors.primary.contrast};
  border: none;
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing[2]};

  &:hover {
    background-color: ${tokens.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${tokens.shadows.md};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${tokens.colors.primary.light}40;
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${tokens.shadows.sm};
  }

  svg {
    font-size: 18px;
  }
`;

export const EditActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
`;

export const SaveButton = styled.button`
  background-color: ${tokens.colors.success.main};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.full};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${tokens.colors.success.dark};
    transform: scale(1.1);
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.error.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[1]};
  border-radius: ${tokens.borderRadius.full};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${tokens.colors.error.light}20;
    transform: scale(1.1);
  }
`;
