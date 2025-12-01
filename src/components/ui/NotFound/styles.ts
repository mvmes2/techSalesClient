"use client";

import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${tokens.spacing[6]};
`;

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  background-color: ${tokens.colors.background.default};
  border-radius: ${tokens.borderRadius.lg};
  padding: ${tokens.spacing[8]};
  box-shadow: ${tokens.shadows.md};
`;

export const NotFoundIcon = styled.div`
  color: ${tokens.colors.warning.main};
  margin-bottom: ${tokens.spacing[4]};
`;

export const NotFoundTitle = styled.h1`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin-bottom: ${tokens.spacing[2]};
`;

export const NotFoundMessage = styled.p`
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.secondary};
  margin-bottom: ${tokens.spacing[6]};
  line-height: 1.6;
`;

export const NotFoundBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  background-color: ${tokens.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.primary.dark};
  }
`;
