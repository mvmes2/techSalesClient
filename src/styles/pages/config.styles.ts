import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const ConfigContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${tokens.spacing[4]};
`;

export const ConfigHeader = styled.div`
  margin-bottom: ${tokens.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${tokens.spacing[4]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ConfigTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ConfigContent = styled.div`
  padding: ${tokens.spacing[4]};
  
  h2 {
    font-size: ${tokens.typography.fontSize.xl};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.text.primary};
    margin-top: 0;
    margin-bottom: ${tokens.spacing[4]};
  }
  
  h3 {
    font-size: ${tokens.typography.fontSize.lg};
    font-weight: ${tokens.typography.fontWeight.medium};
    color: ${tokens.colors.text.primary};
    margin-top: ${tokens.spacing[6]};
    margin-bottom: ${tokens.spacing[2]};
  }
  
  p {
    font-size: ${tokens.typography.fontSize.md};
    color: ${tokens.colors.text.secondary};
    margin-bottom: ${tokens.spacing[2]};
    line-height: 1.5;
  }
`;

export const ConfigSection = styled.section`
  margin-bottom: ${tokens.spacing[8]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ConfigForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[4]};
`;

export const ConfigFormRow = styled.div`
  display: flex;
  gap: ${tokens.spacing[4]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const ConfigFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.spacing[3]};
  margin-top: ${tokens.spacing[4]};
`;
