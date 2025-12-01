'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardActions,
  CardDivider
} from './styles';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'outlined' | 'elevation';
  elevation?: number;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevation', elevation = 1, children, ...props }, ref) => {
    return (
      <CardContainer
        ref={ref}
        $variant={variant}
        $elevation={elevation}
        {...props}
      >
        {children}
      </CardContainer>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeaderComponent: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  avatar,
  children,
  ...props
}) => {
  return (
    <CardHeader {...props}>
      {avatar && avatar}
      <div>
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </div>
      {action && <div>{action}</div>}
      {children}
    </CardHeader>
  );
};

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContentComponent: React.FC<CardContentProps> = ({
  children,
  ...props
}) => {
  return <CardContent {...props}>{children}</CardContent>;
};

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disableSpacing?: boolean;
}

export const CardActionsComponent: React.FC<CardActionsProps> = ({
  children,
  disableSpacing = false,
  ...props
}) => {
  return (
    <CardActions $disableSpacing={disableSpacing} {...props}>
      {children}
    </CardActions>
  );
};

export interface CardDividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const CardDividerComponent: React.FC<CardDividerProps> = ({
  orientation = 'horizontal',
  ...props
}) => {
  return <CardDivider $orientation={orientation} {...props} />;
};

// Attach components to Card
Card.Header = CardHeaderComponent;
Card.Content = CardContentComponent;
Card.Actions = CardActionsComponent;
Card.Divider = CardDividerComponent;

export default Card;
