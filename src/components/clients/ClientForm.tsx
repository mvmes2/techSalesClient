'use client';

import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  FormGroup,
  FormRow,
  FormActions,
  ErrorMessage
} from './ClientForm.styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MaskedInput } from '@/components/ui';
import { FiSave, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiFileText } from 'react-icons/fi';
import { useCreateClient, useUpdateClient } from '@/hooks/api/useClients';

interface ClientFormProps {
  client?: any;
  onClose: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    address_number: '',
    customer_city: '',
    customer_state: '',
    neighborhood: '',
    cep: '',
    cpf: ''
  });

  const [error, setError] = useState('');

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.customer_name || '',
        email: client.customer_email || '',
        phone: client.customer_phone_number || '',
        address: client.customer_address || '',
        address_number: client.customer_address_number || '',
        customer_city: client.customer_city || '',
        customer_state: client.customer_state || '',
        neighborhood: client.customer_neighborhood || '',
        cep: client.customer_cep || '',
        cpf: client.customer_cpf || ''
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
    // Se o fieldName for fornecido, use-o (para campos com máscara)
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

    // Validação de CEP (se fornecido)
    if (formData.cep) {
      const cepClean = formData.cep.replace(/[^\d]/g, '');
      if (cepClean.length > 0 && cepClean.length !== 8) {
        setError('CEP inválido');
        return false;
      }
    }

    // Validação de CPF (se fornecido)
    if (formData.cpf) {
      const cpfClean = formData.cpf.replace(/[^\d]/g, '');
      if (cpfClean.length > 0 && cpfClean.length !== 11) {
        setError('CPF inválido');
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
      customer_phone_number: formData.phone,
      customer_address: formData.address,
      customer_address_number: formData.address_number,
      customer_neighborhood: formData.neighborhood,
      customer_city: formData.customer_city,
      customer_state: formData.customer_state,
      customer_cep: formData.cep,
      customer_cpf: formData.cpf
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

      <FormRow>
        <FormGroup>
          <Input
            label="Endereço"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Rua, Avenida, etc."
            startAdornment={<FiMapPin />}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Número"
            name="address_number"
            value={formData.address_number}
            onChange={handleChange}
            placeholder="123"
            startAdornment={<FiMapPin />}
            fullWidth
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Input
            label="Bairro"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Bairro"
            startAdornment={<FiMapPin />}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <MaskedInput
            mask="99999-999"
            label="CEP"
            name="cep"
            placeholder="00000-000"
            startAdornment={<FiMapPin />}
            fullWidth
            value={formData.cep || ''}
            onChange={(e) => handleChange(e, 'cep')}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Input
            label="Cidade"
            name="customer_city"
            value={formData.customer_city || ''}
            onChange={handleChange}
            placeholder="Cidade"
            startAdornment={<FiMapPin />}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Estado"
            name="customer_state"
            placeholder="Estado"
            startAdornment={<FiMapPin />}
            fullWidth
            value={formData.customer_state || ''}
            onChange={handleChange}
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <MaskedInput
          mask="999.999.999-99"
          label="CPF"
          name="cpf"
          placeholder="000.000.000-00"
          startAdornment={<FiFileText />}
          fullWidth
          value={formData.cpf || ''}
          onChange={(e) => handleChange(e, 'cpf')}
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

export default ClientForm;
