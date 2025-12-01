import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface ButtonContainerProps {
  $variant: string;
  $size: string;
  $fullWidth: boolean;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-family: ${tokens.typography.fontFamily};
  font-weight: ${tokens.typography.fontWeight.medium};
  border-radius: ${tokens.borderRadius.md};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  ${props => props.$variant === 'contained' && css`
    background-color: ${tokens.colors.primary.main};
    color: ${tokens.colors.primary.contrast};
    box-shadow: ${tokens.shadows.sm};

    &:hover {
      background-color: ${tokens.colors.primary.dark};
      box-shadow: ${tokens.shadows.md};
    }

    &:active {
      box-shadow: ${tokens.shadows.sm};
    }
  `}

  ${props => props.$variant === 'outlined' && css`
    background-color: transparent;
    color: ${tokens.colors.primary.main};
    border: 1px solid ${tokens.colors.primary.main};

    &:hover {
      background-color: ${tokens.colors.primary.light}10;
    }
  `}

  ${props => props.$variant === 'text' && css`
    background-color: transparent;
    color: ${tokens.colors.primary.main};

    &:hover {
      background-color: ${tokens.colors.primary.light}10;
    }
  `}

  ${props => props.$size === 'small' && css`
    padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
    font-size: ${tokens.typography.fontSize.sm};
  `}

  ${props => props.$size === 'medium' && css`
    padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
    font-size: ${tokens.typography.fontSize.md};
  `}

  ${props => props.$size === 'large' && css`
    padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
    font-size: ${tokens.typography.fontSize.lg};
  `}

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
  }
`;

export const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface ButtonIconProps {
  $position: 'start' | 'end';
}

export const ButtonIcon = styled.span<ButtonIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$position === 'start' && css`
    margin-right: ${tokens.spacing[2]};
  `}

  ${props => props.$position === 'end' && css`
    margin-left: ${tokens.spacing[2]};
  `}
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${tokens.colors.secondary.common.white};
  animation: ${spin} 0.8s linear infinite;
  margin-right: ${tokens.spacing[2]};
`;

interface ButtonTextProps {
  $isLoading: boolean;
}

export const ButtonText = styled.span<ButtonTextProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isLoading ? 0.7 : 1};
`;
