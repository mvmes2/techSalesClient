import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface InputContainerProps {
  $fullWidth?: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${tokens.spacing[3]};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

export const InputLabel = styled.label`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[1]};
`;

interface InputWrapperProps {
  $hasError?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  background-color: ${tokens.colors.background.paper};
  border: 1px solid ${props => props.$hasError
    ? tokens.colors.error.main
    : tokens.colors.border.main};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};

  &:focus-within {
    border-color: ${props => props.$hasError
      ? tokens.colors.error.main
      : tokens.colors.primary.main};
    box-shadow: 0 0 0 2px ${props => props.$hasError
      ? `${tokens.colors.error.light}40`
      : `${tokens.colors.primary.light}40`};
  }
`;

interface InputFieldProps {
  $hasError?: boolean;
}

export const InputField = styled.input<InputFieldProps>`
  border: none;
  background: transparent;
  width: 100%;
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.primary};
  outline: none;

  &::placeholder {
    color: ${tokens.colors.text.hint};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const InputError = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.error.main};
  margin-top: ${tokens.spacing[1]};
`;

interface InputAdornmentProps {
  $position: 'start' | 'end';
}

export const InputAdornment = styled.div<InputAdornmentProps>`
  display: flex;
  align-items: center;
  color: ${tokens.colors.text.secondary};

  ${props => props.$position === 'start' && css`
    margin-right: ${tokens.spacing[2]};
  `}

  ${props => props.$position === 'end' && css`
    margin-left: ${tokens.spacing[2]};
  `}
`;
