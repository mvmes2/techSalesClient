import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${tokens.colors.background.default};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
`;

export const PageContent = styled.main`
  flex: 1;
  padding: ${tokens.spacing[6]};
  overflow-y: auto;
  background-color: ${tokens.colors.grey[100]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing[4]};
  }
`;
