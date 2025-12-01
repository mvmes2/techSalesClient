'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import {
  ButtonContainer,
  ButtonContent,
  ButtonIcon,
  LoadingSpinner,
  ButtonText
} from './styles';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'contained',
    size = 'medium',
    fullWidth = false,
    isLoading = false,
    loadingText,
    startIcon,
    endIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <ButtonContainer
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        disabled={disabled || isLoading}
        {...props}
      >
        <ButtonContent>
          {isLoading && <LoadingSpinner />}

          {!isLoading && startIcon && (
            <ButtonIcon $position="start">
              {startIcon}
            </ButtonIcon>
          )}

          <ButtonText $isLoading={isLoading}>
            {isLoading && loadingText ? loadingText : children}
          </ButtonText>

          {!isLoading && endIcon && (
            <ButtonIcon $position="end">
              {endIcon}
            </ButtonIcon>
          )}
        </ButtonContent>
      </ButtonContainer>
    );
  }
);

Button.displayName = 'Button';

export default Button;
