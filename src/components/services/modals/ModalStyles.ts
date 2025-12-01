"use client";

import styled from "styled-components";
import { tokens } from "@/styles/tokens";

export const ModalOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.85);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  margin: 5% auto;
  padding: ${tokens.spacing[4]};
  width: 80%;
  max-width: 800px;
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  overflow-y: auto;
  max-height: 90vh;
  border: 1px solid #DDD;
`;

export const ModalCloseButton = styled.button`
align-self: flex-end;
margin-bottom: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${tokens.typography.fontSize.xl};
  color: red;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  margin-bottom: ${tokens.spacing[4]};
  color: #333333;
  background-color: #f5f5f5;
  padding: ${tokens.spacing[3]};
  border-radius: ${tokens.borderRadius.md};
  border-left: 4px solid #0066cc;
`;

export const ModalSection = styled.div`
  border: 1px solid #DDD;
  padding: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[4]};
  border-radius: ${tokens.borderRadius.md};
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;
