import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin-bottom: ${tokens.spacing[2]};
  text-align: center;
`;

export const FormSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[6]};
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: ${tokens.spacing[4]};
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const TogglePasswordButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${tokens.colors.text.primary};
  }
`;

export const FormActions = styled.div`
  margin-top: ${tokens.spacing[2]};
  margin-bottom: ${tokens.spacing[4]};
`;

export const FormDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${tokens.spacing[4]} 0;
  color: ${tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${tokens.colors.border.light};
  }
  
  &::before {
    margin-right: ${tokens.spacing[3]};
  }
  
  &::after {
    margin-left: ${tokens.spacing[3]};
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: center;
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
