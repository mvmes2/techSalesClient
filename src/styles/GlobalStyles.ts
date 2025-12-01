import { createGlobalStyle } from 'styled-components';
import { tokens } from './tokens';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    height: 100%;
  }
  
  body {
    font-family: ${tokens.typography.fontFamily.sans};
    font-size: ${tokens.typography.fontSize.md};
    line-height: ${tokens.typography.lineHeight.normal};
    color: ${tokens.colors.text.primary};
    background-color: ${tokens.colors.background.default};
  }
  
  a {
    color: ${tokens.colors.primary.main};
    text-decoration: none;
    transition: color ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
    
    &:hover {
      color: ${tokens.colors.primary.dark};
      text-decoration: underline;
    }
  }
  
  button {
    font-family: ${tokens.typography.fontFamily.sans};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${tokens.typography.fontFamily.sans};
    font-weight: ${tokens.typography.fontWeight.semibold};
    line-height: ${tokens.typography.lineHeight.tight};
    color: ${tokens.colors.text.primary};
    margin-bottom: ${tokens.spacing[4]};
  }
  
  h1 {
    font-size: ${tokens.typography.fontSize['4xl']};
  }
  
  h2 {
    font-size: ${tokens.typography.fontSize['3xl']};
  }
  
  h3 {
    font-size: ${tokens.typography.fontSize['2xl']};
  }
  
  h4 {
    font-size: ${tokens.typography.fontSize.xl};
  }
  
  h5 {
    font-size: ${tokens.typography.fontSize.lg};
  }
  
  h6 {
    font-size: ${tokens.typography.fontSize.md};
  }
  
  p {
    margin-bottom: ${tokens.spacing[4]};
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${tokens.colors.grey[100]};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${tokens.colors.grey[400]};
    border-radius: ${tokens.borderRadius.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${tokens.colors.grey[500]};
  }
  
  /* Seleção de texto */
  ::selection {
    background-color: ${tokens.colors.primary.light};
    color: ${tokens.colors.primary.dark};
  }
`;
