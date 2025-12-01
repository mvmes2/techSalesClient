'use client';

import React, { useState } from 'react';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormGroup,
  FormActions,
  FormFooter,
  ErrorMessage,
  SuccessMessage
} from './ForgotPasswordForm.styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiMail, FiArrowLeft, FiSend } from 'react-icons/fi';
import { useRecoverPassword } from '@/hooks/api/useAuth';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const recoverPassword = useRecoverPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor, informe seu email');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return;
    }

    setError('');

    recoverPassword.mutate({ email }, {
      onSuccess: () => {
        setSuccess(true);
      }
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Recuperar senha</FormTitle>
      <FormSubtitle>
        {!success
          ? 'Informe seu email para receber um link de recuperação de senha'
          : 'Um email com instruções para recuperar sua senha foi enviado'
        }
      </FormSubtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          Um link de recuperação de senha foi enviado para {email}.
          Por favor, verifique sua caixa de entrada e spam.
        </SuccessMessage>
      )}

      {!success ? (
        <>
          <FormGroup>
            <Input
              label="Email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<FiMail />}
              fullWidth
            />
          </FormGroup>

          <FormActions>
            <Button
              type="submit"
              fullWidth
              isLoading={recoverPassword.isPending}
              loadingText="Enviando..."
              startIcon={<FiSend />}
            >
              Enviar link de recuperação
            </Button>
          </FormActions>
        </>
      ) : (
        <FormActions>
          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={onBackToLogin}
          >
            Voltar para o login
          </Button>
        </FormActions>
      )}

      {!success && (
        <FormFooter>
          <Button
            type="button"
            variant="text"
            onClick={onBackToLogin}
            startIcon={<FiArrowLeft />}
          >
            Voltar para o login
          </Button>
        </FormFooter>
      )}
    </FormContainer>
  );
};

export default ForgotPasswordForm;
