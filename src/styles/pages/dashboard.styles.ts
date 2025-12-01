import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${tokens.spacing[4]};
`;

export const DashboardHeader = styled.div`
  margin-bottom: ${tokens.spacing[8]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DashboardTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin-bottom: ${tokens.spacing[2]};
`;

export const DashboardSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.lg};
  color: ${tokens.colors.text.secondary};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[8]};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
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

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${tokens.borderRadius.full};
  background-color: ${tokens.colors.primary.light}30;
  color: ${tokens.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${tokens.spacing[4]};
  font-size: ${tokens.typography.fontSize['2xl']};
`;

export const StatValue = styled.div`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin-bottom: ${tokens.spacing[2]};
`;

export const StatLabel = styled.div`
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.secondary};
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[8]};
  
  @media (max-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing[4]};
`;

export const ChartTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ChartDescription = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
`;

export const RecentActivitySection = styled.div`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  padding: ${tokens.spacing[6]};
  box-shadow: ${tokens.shadows.md};
`;

export const ActivityHeader = styled.div`
  margin-bottom: ${tokens.spacing[6]};
  
  h2 {
    font-size: ${tokens.typography.fontSize['2xl']};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.text.primary};
    margin: 0;
  }
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[4]};
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${tokens.spacing[4]};
  border-radius: ${tokens.borderRadius.md};
  transition: background-color ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    background-color: ${tokens.colors.grey[100]};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${tokens.colors.border.light};
  }
`;

export const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${tokens.borderRadius.full};
  background-color: ${tokens.colors.primary.light}30;
  color: ${tokens.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${tokens.spacing[4]};
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
  
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${tokens.spacing[1]};
  }
`;

export const ActivityTitle = styled.h4`
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const ActivityTime = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.hint};
`;

export const ActivityDescription = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.secondary};
  margin: 0;
`;
