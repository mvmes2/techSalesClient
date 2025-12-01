'use client';

import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  FormGroup,
  FormActions,
  ErrorMessage
} from './ClientForm.styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MaskedInput } from '@/components/ui';

import { FiSave, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useCreateClient, useUpdateClient } from '@/hooks/api/useClients';

interface SimpleClientFormProps {
  client?: any;
  onClose: () => void;
}

const SimpleClientForm: React.FC<SimpleClientFormProps> = ({ client, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [error, setError] = useState('');

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.customer_name || '',
        email: client.customer_email || '',
        phone: client.customer_phone_number || ''
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
    // Se o fieldName for fornecido, use-o (para InputMask)
    if (fieldName) {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
    // Caso contrário, use o name do input (para campos normais)
    else {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setError('Nome e email são obrigatórios');
      return false;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    // Validação de telefone (se fornecido)
    if (formData.phone) {
      const phoneClean = formData.phone.replace(/[^\d]/g, '');
      if (phoneClean.length > 0 && phoneClean.length < 10) {
        setError('Telefone inválido');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError('');

    // Mapear os campos do formulário para os nomes esperados pela API
    const apiData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone_number: formData.phone
    };

    if (client) {
      // Atualizar cliente existente
      updateClient.mutate(
        {
          id: client.id,
          data: apiData
        },
        {
          onSuccess: () => {
            onClose();
          }
        }
      );
    } else {
      // Criar novo cliente
      createClient.mutate(
        apiData,
        {
          onSuccess: () => {
            onClose();
          }
        }
      );
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome completo"
          startAdornment={<FiUser />}
          fullWidth
          required
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          startAdornment={<FiMail />}
          fullWidth
          required
        />
      </FormGroup>

      <FormGroup>
        <MaskedInput
          mask="(99) 99999-9999"
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          startAdornment={<FiPhone />}
          fullWidth
          value={formData.phone || ''}
          onChange={(e) => handleChange(e, 'phone')}
        />
      </FormGroup>

      <FormActions>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          startIcon={<FiX />}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          isLoading={createClient.isPending || updateClient.isPending}
          loadingText="Salvando..."
          startIcon={<FiSave />}
        >
          {client ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </FormActions>
    </FormContainer>
  );
};

export default SimpleClientForm;
