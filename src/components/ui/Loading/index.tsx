'use client';

import React from 'react';
import { LoadingContainer, Spinner } from './styles';

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color,
  fullScreen = false,
  text
}) => {
  return (
    <LoadingContainer $fullScreen={fullScreen}>
      <Spinner $size={size} $color={color} />
      {text && <p>{text}</p>}
    </LoadingContainer>
  );
};

export default Loading;
