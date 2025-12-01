import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface ModalContainerProps {
  $size: 'small' | 'medium' | 'large' | 'full';
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${tokens.spacing[4]};
  animation: ${fadeIn} ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeOut} forwards;
  backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.xl};
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - ${tokens.spacing[8]});
  animation: ${slideIn} ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeOut} forwards;
  overflow: hidden;
  
  ${props => {
    switch (props.$size) {
      case 'small':
        return css`
          width: 100%;
          max-width: 400px;
        `;
      case 'medium':
        return css`
          width: 100%;
          max-width: 600px;
        `;
      case 'large':
        return css`
          width: 100%;
          max-width: 800px;
        `;
      case 'full':
        return css`
          width: 100%;
          height: 100%;
          max-width: 1200px;
        `;
    }
  }}
  
  @media (max-width: ${tokens.breakpoints.sm}) {
    width: 100%;
    max-width: none;
    border-radius: ${tokens.borderRadius.md};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[1]};
  border-radius: ${tokens.borderRadius.full};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    background-color: ${tokens.colors.grey[100]};
    color: ${tokens.colors.text.primary};
  }
`;

export const ModalContent = styled.div`
  padding: ${tokens.spacing[6]};
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${tokens.colors.grey[100]};
    border-radius: ${tokens.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${tokens.colors.grey[400]};
    border-radius: ${tokens.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${tokens.colors.grey[500]};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]};
  border-top: 1px solid ${tokens.colors.border.light};
  gap: ${tokens.spacing[3]};
`;
