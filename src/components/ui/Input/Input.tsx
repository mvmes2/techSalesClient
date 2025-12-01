'use client';

import React, { forwardRef } from 'react';
import { InputContainer, StyledInput, Label, ErrorMessage, HelperText, InputWrapper, IconWrapper } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startAdornment?: React.ReactNode; // Alias para startIcon
  endAdornment?: React.ReactNode; // Alias para endIcon
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      startAdornment,
      endAdornment,
      fullWidth = false,
      variant = 'outlined',
      ...props
    },
    ref
  ) => {
    return (
      <InputContainer $fullWidth={fullWidth}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputWrapper $hasError={!!error} $variant={variant} $hasStartIcon={!!(startIcon || startAdornment)} $hasEndIcon={!!(endIcon || endAdornment)}>
          {(startIcon || startAdornment) && <IconWrapper className="start-icon">{startIcon || startAdornment}</IconWrapper>}
          <StyledInput
            ref={ref}
            $hasError={!!error}
            $hasStartIcon={!!(startIcon || startAdornment)}
            $hasEndIcon={!!(endIcon || endAdornment)}
            $variant={variant}
            {...props}
          />
          {(endIcon || endAdornment) && <IconWrapper className="end-icon">{endIcon || endAdornment}</IconWrapper>}
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
