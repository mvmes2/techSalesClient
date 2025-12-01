import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeroSection = styled.section`
  background: linear-gradient(135deg, ${tokens.colors.primary.dark}, ${tokens.colors.primary.main});
  color: ${tokens.colors.primary.contrast};
  padding: ${tokens.spacing[16]} ${tokens.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing[10]} ${tokens.spacing[4]};
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  margin-bottom: ${tokens.spacing[8]};
  background-color: white;
  padding: ${tokens.spacing[4]};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.lg};
`;

export const HeroTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['4xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  margin-bottom: ${tokens.spacing[4]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['3xl']};
  }
`;

export const HeroSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.xl};
  margin-bottom: ${tokens.spacing[8]};
  max-width: 600px;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.lg};
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: ${tokens.spacing[4]};
  
  @media (max-width: ${tokens.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

export const FeaturesSection = styled.section`
  padding: ${tokens.spacing[16]} ${tokens.spacing[4]};
  background-color: ${tokens.colors.background.default};
  
  h2 {
    text-align: center;
    font-size: ${tokens.typography.fontSize['3xl']};
    font-weight: ${tokens.typography.fontWeight.bold};
    margin-bottom: ${tokens.spacing[12]};
    color: ${tokens.colors.text.primary};
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing[10]} ${tokens.spacing[4]};
    
    h2 {
      font-size: ${tokens.typography.fontSize['2xl']};
      margin-bottom: ${tokens.spacing[8]};
    }
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${tokens.spacing[8]};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    gap: ${tokens.spacing[6]};
  }
`;

export const FeatureCard = styled.div`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  padding: ${tokens.spacing[6]};
  box-shadow: ${tokens.shadows.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut},
              box-shadow ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${tokens.shadows.lg};
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${tokens.borderRadius.full};
  background-color: ${tokens.colors.primary.light}30;
  color: ${tokens.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${tokens.spacing[4]};
`;

export const FeatureTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  margin-bottom: ${tokens.spacing[3]};
  color: ${tokens.colors.text.primary};
`;

export const FeatureDescription = styled.p`
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.secondary};
  line-height: ${tokens.typography.lineHeight.relaxed};
`;
