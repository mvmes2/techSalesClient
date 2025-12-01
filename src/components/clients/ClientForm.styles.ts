import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

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

export const ErrorMessage = styled.div`
  background-color: ${tokens.colors.error.light}30;
  color: ${tokens.colors.error.main};
  padding: ${tokens.spacing[3]};
  border-radius: ${tokens.borderRadius.md};
  margin-bottom: ${tokens.spacing[4]};
  font-size: ${tokens.typography.fontSize.sm};
  border-left: 4px solid ${tokens.colors.error.main};
`;
