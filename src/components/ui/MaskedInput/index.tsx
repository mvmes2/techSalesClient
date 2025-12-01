'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Input, InputProps } from '@/components/ui/Input';

interface MaskedInputProps extends InputProps {
  mask: string;
}

// Função para aplicar máscara manualmente
const applyMask = (value: string, mask: string): string => {
  if (!value) return '';

  // Remove todos os caracteres não numéricos para CPF, CNPJ, telefone e CEP
  const digits = value.replace(/\D/g, '');

  let result = '';
  let digitIndex = 0;

  // Itera sobre a máscara
  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    // Se o caractere da máscara for '9', adiciona o dígito
    if (mask[i] === '9') {
      result += digits[digitIndex++];
    } else {
      // Senão, adiciona o caractere da máscara
      result += mask[i];
    }
  }

  return result;
};

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value = '', onChange, ...props }, ref) => {
    // Manipular a mudança de input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Aplicar a máscara ao valor digitado
      const maskedValue = applyMask(newValue, mask);

      if (onChange) {
        // Criar um novo evento com o valor mascarado
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: maskedValue,
            name: props.name
          }
        };
        onChange(newEvent);
      }
    };

    // Aplicar a máscara ao valor atual
    const maskedValue = applyMask(value as string, mask);

    return (
      <Input
        {...props}
        ref={ref}
        value={maskedValue}
        onChange={handleChange}
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;
