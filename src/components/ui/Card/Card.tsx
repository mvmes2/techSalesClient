'use client';

import React from 'react';
import { StyledCard, CardHeader, CardTitle, CardSubtitle, CardContent, CardActions, CardDivider } from './Card.styles';

export interface CardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3;
  variant?: 'outlined' | 'elevation';
  className?: string;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Content: React.FC<CardContentProps>;
  Actions: React.FC<CardActionsProps>;
  Divider: React.FC<CardDividerProps>;
} = ({
  children,
  elevation = 1,
  variant = 'elevation',
  className,
}) => {
  return (
    <StyledCard $elevation={elevation} $variant={variant} className={className}>
      {children}
    </StyledCard>
  );
};

export interface CardHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  avatar,
  className,
}) => {
  return (
    <CardHeader className={className}>
      {avatar && <div className="avatar">{avatar}</div>}
      <div className="header-content">
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </div>
      {action && <div className="action">{action}</div>}
    </CardHeader>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Content: React.FC<CardContentProps> = ({ children, className }) => {
  return <CardContent className={className}>{children}</CardContent>;
};

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'end' | 'center' | 'space-between';
}

export const Actions: React.FC<CardActionsProps> = ({
  children,
  className,
  align = 'start',
}) => {
  return (
    <CardActions className={className} $align={align}>
      {children}
    </CardActions>
  );
};

export interface CardDividerProps {
  className?: string;
}

export const Divider: React.FC<CardDividerProps> = ({ className }) => {
  return <CardDivider className={className} />;
};

// Atribuir componentes ao Card
Card.Header = Header;
Card.Content = Content;
Card.Actions = Actions;
Card.Divider = Divider;

export default Card;
