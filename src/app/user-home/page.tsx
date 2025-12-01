'use client';

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/authContext';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  RecentActivitySection,
  ActivityHeader,
  ActivityList,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityTitle,
  ActivityTime,
  ActivityDescription,
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartDescription,
  ChartsGrid
} from '@/styles/pages/dashboard.styles';
import { Card } from '@/components/ui/Card';
import { FiUsers, FiPackage, FiDollarSign, FiShoppingCart, FiClock, FiUserPlus, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';

export default function UserHome() {
  const { userLogged } = useAuthContext();

  // Dados simulados para o dashboard
  const stats = [
    { icon: <FiUsers />, value: '152', label: 'Clientes Ativos' },
    { icon: <FiPackage />, value: '87', label: 'Produtos em Estoque' },
    { icon: <FiDollarSign />, value: 'R$ 12.450', label: 'Vendas do Mês' },
    { icon: <FiShoppingCart />, value: '24', label: 'Pedidos Pendentes' }
  ];

  const recentActivities = [
    {
      icon: <FiUserPlus />,
      title: 'Novo Cliente',
      time: 'Há 2 horas',
      description: 'João Silva foi adicionado como cliente'
    },
    {
      icon: <FiShoppingBag />,
      title: 'Nova Venda',
      time: 'Há 5 horas',
      description: 'Venda #1234 foi finalizada no valor de R$ 450,00'
    },
    {
      icon: <FiPackage />,
      title: 'Estoque Atualizado',
      time: 'Há 1 dia',
      description: '15 novos itens foram adicionados ao estoque'
    },
    {
      icon: <FiAlertCircle />,
      title: 'Alerta de Estoque',
      time: 'Há 2 dias',
      description: 'Produto "Teclado Wireless" está com estoque baixo'
    }
  ];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div>
          <DashboardTitle>Olá, {userLogged?.name}</DashboardTitle>
          <DashboardSubtitle>Bem-vindo ao seu painel de controle</DashboardSubtitle>
        </div>
      </DashboardHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <ChartsGrid>
        <Card elevation={1}>
          <Card.Header title="Vendas Mensais" subtitle="Últimos 6 meses" />
          <Card.Content>
            <ChartContainer>
              <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Gráfico de vendas será exibido aqui</p>
              </div>
            </ChartContainer>
          </Card.Content>
        </Card>

        <Card elevation={1}>
          <Card.Header title="Produtos Mais Vendidos" subtitle="Este mês" />
          <Card.Content>
            <ChartContainer>
              <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Gráfico de produtos será exibido aqui</p>
              </div>
            </ChartContainer>
          </Card.Content>
        </Card>
      </ChartsGrid>

      <RecentActivitySection>
        <ActivityHeader>
          <h2>Atividades Recentes</h2>
        </ActivityHeader>

        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <div>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.time}</ActivityTime>
                </div>
                <ActivityDescription>{activity.description}</ActivityDescription>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivitySection>
    </DashboardContainer>
  );
}
