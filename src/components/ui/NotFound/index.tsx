"use client";

import React from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundIcon,
  NotFoundTitle,
  NotFoundMessage,
  NotFoundBackButton
} from './styles';

interface NotFoundProps {
  title?: string;
  message?: string;
  backUrl?: string;
  backText?: string;
  icon?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = "Não encontrado",
  message = "O recurso que você está procurando não foi encontrado.",
  backUrl = "/",
  backText = "Voltar para a página inicial",
  icon = <FiAlertTriangle size={64} />
}) => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundIcon>
          {icon}
        </NotFoundIcon>
        <NotFoundTitle>{title}</NotFoundTitle>
        <NotFoundMessage>{message}</NotFoundMessage>
        <Link href={backUrl}>
          <NotFoundBackButton>
            <FiArrowLeft size={18} />
            {backText}
          </NotFoundBackButton>
        </Link>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
