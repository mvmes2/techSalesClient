'use client';

import React from 'react';
import { StyledButton } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'error' | 'success' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  isLoading = false,
  loadingText,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading-spinner" />
          {loadingText || children}
        </>
      ) : (
        <>
          {startIcon && <span className="start-icon">{startIcon}</span>}
          {children}
          {endIcon && <span className="end-icon">{endIcon}</span>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
