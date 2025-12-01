'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { Modal } from '@/components/ui/Modal';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { browserStorage } from '@/utils/browserStorage';
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  LogoContainer,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  FeaturesGrid
} from '@/styles/pages/home.styles';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { FiBarChart2, FiUsers, FiPackage, FiShield } from 'react-icons/fi';

type ModalView = 'login' | 'register' | 'forgotPassword';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>('login');
  const { push } = useRouter();
  const { userLogged } = useAuthContext();

  useEffect(() => {
    // Se o usuário já estiver logado, redireciona para a página inicial
    if (browserStorage.hasItem('session')) {
      push('/user-home');
    }
  }, [push, userLogged]);

  const handleOpenModal = (view: ModalView) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getModalTitle = () => {
    switch (modalView) {
      case 'login':
        return 'Entrar';
      case 'register':
        return 'Criar Conta';
      case 'forgotPassword':
        return 'Recuperar Senha';
      default:
        return '';
    }
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'login':
        return (
          <LoginForm
            onRegisterClick={() => setModalView('register')}
            onForgotPasswordClick={() => setModalView('forgotPassword')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onLoginClick={() => setModalView('login')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => setModalView('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <LogoContainer>
            <Image
              src="/teste2.png"
              alt="SalesTech Logo"
              width={250}
              height={60}
              style={{ height: 'auto' }}
              priority
            />
          </LogoContainer>

          <HeroTitle>
            Gerencie seu negócio com eficiência
          </HeroTitle>

          <HeroSubtitle>
            Uma solução completa para gestão de vendas, estoque e clientes
          </HeroSubtitle>

          <HeroActions>
            <Button
              size="large"
              onClick={() => handleOpenModal('login')}
            >
              Entrar
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => handleOpenModal('register')}
            >
              Criar Conta
            </Button>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <h2>Recursos principais</h2>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiBarChart2 size={32} />
            </FeatureIcon>
            <FeatureTitle>Análise de Vendas</FeatureTitle>
            <FeatureDescription>
              Acompanhe o desempenho das suas vendas com gráficos e relatórios detalhados.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiUsers size={32} />
            </FeatureIcon>
            <FeatureTitle>Gestão de Clientes</FeatureTitle>
            <FeatureDescription>
              Mantenha um cadastro completo dos seus clientes e histórico de compras.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiPackage size={32} />
            </FeatureIcon>
            <FeatureTitle>Controle de Estoque</FeatureTitle>
            <FeatureDescription>
              Gerencie seu inventário com facilidade e receba alertas de estoque baixo.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiShield size={32} />
            </FeatureIcon>
            <FeatureTitle>Segurança Avançada</FeatureTitle>
            <FeatureDescription>
              Seus dados estão protegidos com as mais modernas tecnologias de segurança.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        size="small"
      >
        {renderModalContent()}
      </Modal>
    </HomeContainer>
  );
}
