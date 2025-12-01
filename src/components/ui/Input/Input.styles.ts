import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface InputContainerProps {
  $fullWidth: boolean;
}

interface InputWrapperProps {
  $hasError: boolean;
  $variant: 'outlined' | 'filled' | 'standard';
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
}

interface StyledInputProps {
  $hasError: boolean;
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
  $variant: 'outlined' | 'filled' | 'standard';
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${tokens.spacing[4]};
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[1]};
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  
  ${props => {
    switch (props.$variant) {
      case 'filled':
        return css`
          background-color: ${tokens.colors.grey[100]};
          border-bottom: 2px solid ${props.$hasError ? tokens.colors.error.main : tokens.colors.grey[400]};
          border-radius: ${tokens.borderRadius.md} ${tokens.borderRadius.md} 0 0;
          
          &:focus-within {
            border-bottom-color: ${props.$hasError ? tokens.colors.error.main : tokens.colors.primary.main};
            background-color: ${tokens.colors.grey[200]};
          }
        `;
      case 'standard':
        return css`
          border-bottom: 1px solid ${props.$hasError ? tokens.colors.error.main : tokens.colors.grey[400]};
          
          &:focus-within {
            border-bottom: 2px solid ${props.$hasError ? tokens.colors.error.main : tokens.colors.primary.main};
          }
        `;
      case 'outlined':
      default:
        return css`
          border: 1px solid ${props.$hasError ? tokens.colors.error.main : tokens.colors.grey[400]};
          border-radius: ${tokens.borderRadius.md};
          
          &:focus-within {
            border-color: ${props.$hasError ? tokens.colors.error.main : tokens.colors.primary.main};
            box-shadow: 0 0 0 2px ${props.$hasError ? tokens.colors.error.light : tokens.colors.primary.light}40;
          }
        `;
    }
  }}
  
  &:hover:not(:focus-within) {
    border-color: ${props => (props.$hasError ? tokens.colors.error.main : tokens.colors.grey[600])};
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.primary};
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  
  ${props => props.$hasStartIcon && css`
    padding-left: ${tokens.spacing[8]};
  `}
  
  ${props => props.$hasEndIcon && css`
    padding-right: ${tokens.spacing[8]};
  `}
  
  &::placeholder {
    color: ${tokens.colors.text.hint};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.text.secondary};
  
  &.start-icon {
    left: ${tokens.spacing[3]};
  }
  
  &.end-icon {
    right: ${tokens.spacing[3]};
  }
`;

export const ErrorMessage = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.error.main};
  margin-top: ${tokens.spacing[1]};
`;

export const HelperText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.hint};
  margin-top: ${tokens.spacing[1]};
`;
