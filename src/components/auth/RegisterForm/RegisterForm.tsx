'use client';

import React, { useEffect, useState } from 'react';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormGroup,
  TogglePasswordButton,
  FormActions,
  FormDivider,
  FormFooter,
  ErrorMessage,
  FormRow
} from './RegisterForm.styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MaskedInput } from '@/components/ui';

import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiUserPlus, FiBriefcase, FiFileText } from 'react-icons/fi';
import { useRegister } from '@/hooks/api/useAuth';
import { useToast } from '@/hooks/useToast';

interface RegisterFormProps {
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick }) => {
  const { notifySuccess, notifyError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    cpf: '',
    companyName: '',
    ownerEmail: '',
    ownerName: '',
    cnpj: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const register = useRegister();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const cpfClean = formData.cpf.replace(/[^\d]/g, '');
  const cnpjClean = formData.cnpj.replace(/[^\d]/g, '');

  const validateForm = () => {
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    // Validação de senha
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    // Confirmação de senha
    if (formData.password !== formData.password2) {
      setError('As senhas não coincidem');
      return false;
    }

    // Validação de CPF
    
    
    if (cpfClean.length !== 11) {
      setError('CPF inválido');
      return false;
    }

    // Validação de CNPJ
    
    if (cnpjClean.length !== 14) {
      setError('CNPJ inválido');
      return false;
    }

    // Verificar campos obrigatórios
    if (!formData.name || !formData.companyName || !formData.ownerName || !formData.ownerEmail) {
      setError('Todos os campos são obrigatórios');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      
      return;
    }

    setError('');

    const newRegister = {
      company: {
        company_name: formData.companyName,
        cnpj: cnpjClean,
        owner_name: formData.ownerName,
        owner_email: formData.ownerEmail
      },
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        user_cpf: cpfClean
      }
    };

    register.mutate(newRegister, {
      onSuccess: () => {
        onLoginClick();
      }
    });
  };

  useEffect(() => {
    if (error) {
      notifyError(error, 5000);
    }
  }, [error])

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Crie sua conta</FormTitle>
      <FormSubtitle>Preencha os dados para se registrar</FormSubtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormRow>
        <FormGroup>
          <Input
            label="Nome"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            startIcon={<FiUser />}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Seu email"
            value={formData.email}
            onChange={handleChange}
            startIcon={<FiMail />}
            fullWidth
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Input
            label="Senha"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            value={formData.password}
            onChange={handleChange}
            startIcon={<FiLock />}
            endIcon={
              <TogglePasswordButton type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </TogglePasswordButton>
            }
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Confirmar Senha"
            name="password2"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            value={formData.password2}
            onChange={handleChange}
            startIcon={<FiLock />}
            endIcon={
              <TogglePasswordButton type="button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </TogglePasswordButton>
            }
            fullWidth
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <MaskedInput
          mask="999.999.999-99"
          label="CPF"
          name="cpf"
          placeholder="000.000.000-00"
          startIcon={<FiFileText />}
          fullWidth
          value={formData.cpf}
          onChange={handleChange}
        />
      </FormGroup>

      <FormDivider>Dados da Empresa</FormDivider>

      <FormGroup>
        <Input
          label="Nome da Empresa"
          name="companyName"
          placeholder="Nome da sua empresa"
          value={formData.companyName}
          onChange={handleChange}
          startIcon={<FiBriefcase />}
          fullWidth
        />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Input
            label="Nome do Proprietário"
            name="ownerName"
            placeholder="Nome do proprietário"
            value={formData.ownerName}
            onChange={handleChange}
            startIcon={<FiUser />}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Email do Proprietário"
            name="ownerEmail"
            type="email"
            placeholder="Email do proprietário"
            value={formData.ownerEmail}
            onChange={handleChange}
            startIcon={<FiMail />}
            fullWidth
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <MaskedInput
          mask="99.999.999/9999-99"
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          startIcon={<FiFileText />}
          fullWidth
          value={formData.cnpj || ''}
          onChange={handleChange}
        />
      </FormGroup>

      <FormActions>
        <Button
          type="submit"
          fullWidth
          isLoading={register.isPending}
          loadingText="Cadastrando..."
          startIcon={<FiUserPlus />}
        >
          Cadastrar
        </Button>
      </FormActions>

      <FormFooter>
        <Button
          type="button"
          variant="text"
          onClick={onLoginClick}
        >
          Já tem uma conta? Faça login
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default RegisterForm;
