import styled, { keyframes } from 'styled-components';
import { tokens } from '@/styles/tokens';

export const StockContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${tokens.spacing[4]};
`;

export const StockHeader = styled.div`
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

export const StockTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const StockActions = styled.div`
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: ${tokens.spacing[4]};
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${tokens.spacing[4]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.spacing[3]};
  margin-top: ${tokens.spacing[4]};
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

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-top: ${tokens.spacing[6]};
`;

export const ProductCard = styled.div`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.md};
  padding: ${tokens.spacing[4]};
  transition: transform ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut},
              box-shadow ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${tokens.shadows.lg};
  }
`;

export const ProductName = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  margin-bottom: ${tokens.spacing[2]};
  color: ${tokens.colors.text.primary};
`;

export const ProductPrice = styled.div`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.primary.main};
  margin-bottom: ${tokens.spacing[2]};
`;

export const ProductDescription = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[4]};
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.spacing[2]};
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  margin-bottom: ${tokens.spacing[2]};
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
  
  svg {
    color: ${tokens.colors.text.hint};
  }
`;

export const ModalBody = styled.div`
  padding: ${tokens.spacing[4]};
`;

export const FormWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing[4]};
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${tokens.spacing[4]};
`;

export const ClientCardContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${tokens.spacing[6]};
`;

export const ClientCardContent = styled.div`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.md};
  padding: ${tokens.spacing[4]};
  cursor: pointer;
  transition: transform ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut},
              box-shadow ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${tokens.shadows.lg};
  }
  
  h2 {
    font-size: ${tokens.typography.fontSize.md};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.text.secondary};
    margin-bottom: ${tokens.spacing[1]};
  }
  
  h3 {
    font-size: ${tokens.typography.fontSize.lg};
    font-weight: ${tokens.typography.fontWeight.medium};
    color: ${tokens.colors.text.primary};
    margin-bottom: ${tokens.spacing[3]};
  }
`;

export const Container = styled.div`
  width: 100%;
`;
