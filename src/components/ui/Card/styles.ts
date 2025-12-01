import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface CardContainerProps {
  $variant: 'outlined' | 'elevation';
  $elevation: number;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  overflow-wrap: break-word;
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};

  ${props => props.$variant === 'outlined' && css`
    border: 1px solid ${tokens.colors.border.main};
  `}

  ${props => props.$variant === 'elevation' && css`
    box-shadow: ${
      props.$elevation === 0 ? 'none' :
      props.$elevation === 1 ? tokens.shadows.sm :
      props.$elevation === 2 ? tokens.shadows.md :
      props.$elevation === 3 ? tokens.shadows.lg :
      props.$elevation >= 4 ? tokens.shadows.xl :
      tokens.shadows.sm
    };
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing[4]} ${tokens.spacing[4]} ${tokens.spacing[2]};

  & > div:first-child {
    margin-right: ${tokens.spacing[3]};
  }

  & > div:last-child {
    margin-left: auto;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.text.primary};
  line-height: ${tokens.typography.lineHeight.md};
`;

export const CardSubtitle = styled.h3`
  margin: ${tokens.spacing[1]} 0 0;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.regular};
  color: ${tokens.colors.text.secondary};
  line-height: ${tokens.typography.lineHeight.md};
`;

export const CardContent = styled.div`
  padding: ${tokens.spacing[4]};
  flex: 1 1 auto;

  &:last-child {
    padding-bottom: ${tokens.spacing[6]};
  }
`;

interface CardActionsProps {
  $disableSpacing: boolean;
}

export const CardActions = styled.div<CardActionsProps>`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing[2]} ${tokens.spacing[4]};

  ${props => !props.$disableSpacing && css`
    & > :not(:first-child) {
      margin-left: ${tokens.spacing[2]};
    }
  `}
`;

interface CardDividerProps {
  $orientation: 'horizontal' | 'vertical';
}

export const CardDivider = styled.hr<CardDividerProps>`
  margin: 0;
  border: none;
  flex-shrink: 0;

  ${props => props.$orientation === 'horizontal' && css`
    height: 1px;
    width: 100%;
    background-color: ${tokens.colors.border.main};
  `}

  ${props => props.$orientation === 'vertical' && css`
    height: auto;
    width: 1px;
    align-self: stretch;
    background-color: ${tokens.colors.border.main};
  `}
`;
