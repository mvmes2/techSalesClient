import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface StyledCardProps {
  $elevation: 0 | 1 | 2 | 3;
  $variant: 'outlined' | 'elevation';
}

interface CardActionsProps {
  $align: 'start' | 'end' | 'center' | 'space-between';
}

// Mapeamento de elevações para sombras
const getElevationShadow = (elevation: 0 | 1 | 2 | 3) => {
  const shadows = {
    0: 'none',
    1: tokens.shadows.sm,
    2: tokens.shadows.md,
    3: tokens.shadows.lg,
  };
  
  return shadows[elevation];
};

export const StyledCard = styled.div<StyledCardProps>`
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  overflow: hidden;
  transition: box-shadow ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
  
  ${props => props.$variant === 'outlined' && css`
    border: 1px solid ${tokens.colors.border.main};
    box-shadow: none;
  `}
  
  ${props => props.$variant === 'elevation' && css`
    border: none;
    box-shadow: ${getElevationShadow(props.$elevation)};
    
    &:hover {
      box-shadow: ${props.$elevation < 3 ? getElevationShadow((props.$elevation + 1) as 1 | 2 | 3) : getElevationShadow(3)};
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing[4]};
  
  .avatar {
    margin-right: ${tokens.spacing[3]};
  }
  
  .header-content {
    flex: 1;
  }
  
  .action {
    margin-left: ${tokens.spacing[2]};
  }
`;

export const CardTitle = styled.h3`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
`;

export const CardSubtitle = styled.h4`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.regular};
  color: ${tokens.colors.text.secondary};
  margin: ${tokens.spacing[1]} 0 0 0;
`;

export const CardContent = styled.div`
  padding: ${tokens.spacing[4]};
  color: ${tokens.colors.text.primary};
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.md};
  
  &:last-child {
    padding-bottom: ${tokens.spacing[6]};
  }
`;

export const CardActions = styled.div<CardActionsProps>`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
  
  ${props => {
    switch (props.$align) {
      case 'end':
        return css`justify-content: flex-end;`;
      case 'center':
        return css`justify-content: center;`;
      case 'space-between':
        return css`justify-content: space-between;`;
      case 'start':
      default:
        return css`justify-content: flex-start;`;
    }
  }}
  
  & > * {
    margin-right: ${tokens.spacing[2]};
  }
  
  & > *:last-child {
    margin-right: 0;
  }
`;

export const CardDivider = styled.hr`
  border: none;
  height: 1px;
  margin: 0;
  background-color: ${tokens.colors.border.light};
`;
