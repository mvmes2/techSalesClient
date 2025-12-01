'use client';

import React, { useState } from 'react';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormGroup,
  PasswordInputWrapper,
  TogglePasswordButton,
  FormActions,
  FormDivider,
  FormFooter,
  ErrorMessage
} from './LoginForm.styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { useLogin } from '@/hooks/api/useAuth';

interface LoginFormProps {
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onRegisterClick,
  onForgotPasswordClick
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const login = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setError('');
    login.mutate({ email, password });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Bem-vindo de volta</FormTitle>
      <FormSubtitle>Faça login para acessar sua conta</FormSubtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Input
          label="Email"
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={<FiMail />}
          fullWidth
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startAdornment={<FiLock />}
          endAdornment={
            <TogglePasswordButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </TogglePasswordButton>
          }
          fullWidth
        />
      </FormGroup>

      <FormActions>
        <Button
          type="submit"
          fullWidth
          isLoading={login.isPending}
          loadingText="Entrando..."
          startIcon={<FiLogIn />}
        >
          Entrar
        </Button>
      </FormActions>

      <FormDivider>ou</FormDivider>

      <FormActions>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onRegisterClick}
        >
          Criar uma conta
        </Button>
      </FormActions>

      <FormFooter>
        <Button
          type="button"
          variant="text"
          onClick={onForgotPasswordClick}
        >
          Esqueceu sua senha?
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;
