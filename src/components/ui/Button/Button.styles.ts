import styled, { css, keyframes } from 'styled-components';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button';
import { tokens } from '@/styles/tokens';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}

// Mapeamento de variantes para estilos
const getVariantStyles = (variant: ButtonVariant) => {
  const styles = {
    primary: css`
      background-color: ${tokens.colors.primary.main};
      color: ${tokens.colors.primary.contrast};
      border: 1px solid ${tokens.colors.primary.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.primary.dark};
        border-color: ${tokens.colors.primary.dark};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.primary.dark};
      }
    `,
    secondary: css`
      background-color: ${tokens.colors.secondary.main};
      color: ${tokens.colors.secondary.contrast};
      border: 1px solid ${tokens.colors.secondary.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.secondary.dark};
        border-color: ${tokens.colors.secondary.dark};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.secondary.dark};
      }
    `,
    outlined: css`
      background-color: transparent;
      color: ${tokens.colors.primary.main};
      border: 1px solid ${tokens.colors.primary.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.grey[100]};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.grey[200]};
      }
    `,
    text: css`
      background-color: transparent;
      color: ${tokens.colors.primary.main};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.grey[100]};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.grey[200]};
      }
    `,
    error: css`
      background-color: ${tokens.colors.error.main};
      color: ${tokens.colors.error.contrast};
      border: 1px solid ${tokens.colors.error.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.error.dark};
        border-color: ${tokens.colors.error.dark};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.error.dark};
      }
    `,
    success: css`
      background-color: ${tokens.colors.success.main};
      color: ${tokens.colors.success.contrast};
      border: 1px solid ${tokens.colors.success.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.success.dark};
        border-color: ${tokens.colors.success.dark};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.success.dark};
      }
    `,
    warning: css`
      background-color: ${tokens.colors.warning.main};
      color: ${tokens.colors.warning.contrast};
      border: 1px solid ${tokens.colors.warning.main};
      
      &:hover:not(:disabled) {
        background-color: ${tokens.colors.warning.dark};
        border-color: ${tokens.colors.warning.dark};
      }
      
      &:active:not(:disabled) {
        background-color: ${tokens.colors.warning.dark};
      }
    `,
  };
  
  return styles[variant];
};

// Mapeamento de tamanhos para estilos
const getSizeStyles = (size: ButtonSize) => {
  const styles = {
    small: css`
      padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
      font-size: ${tokens.typography.fontSize.sm};
      border-radius: ${tokens.borderRadius.md};
    `,
    medium: css`
      padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
      font-size: ${tokens.typography.fontSize.md};
      border-radius: ${tokens.borderRadius.md};
    `,
    large: css`
      padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
      font-size: ${tokens.typography.fontSize.lg};
      border-radius: ${tokens.borderRadius.lg};
    `,
  };
  
  return styles[size];
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-family: ${tokens.typography.fontFamily.sans};
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.normal};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  box-shadow: ${tokens.shadows.sm};
  
  /* Aplicar estilos de variante */
  ${props => getVariantStyles(props.$variant)}
  
  /* Aplicar estilos de tamanho */
  ${props => getSizeStyles(props.$size)}
  
  /* Largura total se necessário */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  /* Estilos para estado desabilitado */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  /* Estilos para ícones */
  .start-icon {
    margin-right: ${tokens.spacing[2]};
    display: inherit;
  }
  
  .end-icon {
    margin-left: ${tokens.spacing[2]};
    display: inherit;
  }
  
  /* Estilos para o spinner de carregamento */
  .loading-spinner {
    width: 16px;
    height: 16px;
    margin-right: ${tokens.spacing[2]};
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: ${tokens.colors.primary.contrast};
    animation: ${spin} 0.8s linear infinite;
  }
`;
