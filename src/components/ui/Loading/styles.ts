import styled, { keyframes } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface LoadingContainerProps {
  $fullScreen: boolean;
}

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.$fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: ${tokens.zIndex.modal};
  `}
  
  p {
    margin-top: ${tokens.spacing[2]};
    color: ${tokens.colors.text.secondary};
    font-size: ${tokens.typography.fontSize.sm};
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerProps {
  $size: 'small' | 'medium' | 'large';
  $color?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  width: ${props => 
    props.$size === 'small' ? '16px' : 
    props.$size === 'medium' ? '24px' : 
    '40px'
  };
  height: ${props => 
    props.$size === 'small' ? '16px' : 
    props.$size === 'medium' ? '24px' : 
    '40px'
  };
  border: ${props => 
    props.$size === 'small' ? '2px' : 
    props.$size === 'medium' ? '3px' : 
    '4px'
  } solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props => props.$color || tokens.colors.primary.main};
  animation: ${spin} 0.8s linear infinite;
`;
