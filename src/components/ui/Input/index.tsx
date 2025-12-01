'use client';

import React, { forwardRef } from 'react';
import InputComponent, { InputProps as OriginalInputProps } from './Input';

// Estendemos a interface InputProps para aceitar tanto startIcon/endIcon quanto startAdornment/endAdornment
export interface InputProps extends OriginalInputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

// Componente Input que aceita ambas as propriedades
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { startAdornment, endAdornment, ...rest } = props;

  // Usamos startIcon/endIcon internamente, mas aceitamos startAdornment/endAdornment como aliases
  return (
    <InputComponent
      ref={ref}
      {...rest}
      startIcon={startAdornment || props.startIcon}
      endIcon={endAdornment || props.endIcon}
    />
  );
});

Input.displayName = 'Input';

export default Input;
