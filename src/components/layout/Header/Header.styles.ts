import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface SearchContainerProps {
  $focused: boolean;
}

export const HeaderContainer = styled.header`
  background-color: ${tokens.colors.background.paper};
  box-shadow: ${tokens.shadows.sm};
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
  z-index: 10;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    flex-wrap: wrap;
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const CompanyName = styled.h1`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.text.primary};
  margin: 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.lg};
  }
`;

export const SearchContainer = styled.div<SearchContainerProps>`
  display: flex;
  align-items: center;
  background-color: ${tokens.colors.grey[100]};
  border-radius: ${tokens.borderRadius.full};
  padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
  width: 300px;
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  ${props => props.$focused && css`
    background-color: ${tokens.colors.background.paper};
    box-shadow: ${tokens.shadows.md};
    border: 1px solid ${tokens.colors.primary.light};
  `}
  
  svg {
    color: ${tokens.colors.grey[500]};
    margin-right: ${tokens.spacing[2]};
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    width: 100%;
    margin: ${tokens.spacing[2]} 0;
    order: 3;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: ${tokens.typography.fontSize.md};
  color: ${tokens.colors.text.primary};
  outline: none;
  
  &::placeholder {
    color: ${tokens.colors.text.hint};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const NotificationsButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${tokens.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: ${tokens.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: ${tokens.spacing[4]};
  transition: background-color ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    background-color: ${tokens.colors.grey[100]};
  }
`;

export const NotificationsBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${tokens.colors.error.main};
  color: ${tokens.colors.error.contrast};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.bold};
  width: 18px;
  height: 18px;
  border-radius: ${tokens.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${tokens.colors.background.paper};
`;

export const UserSection = styled.div`
  position: relative;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.lg};
  transition: background-color ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  &:hover {
    background-color: ${tokens.colors.grey[100]};
  }
  
  > div {
    margin-right: ${tokens.spacing[3]};
    text-align: right;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      display: none;
    }
  }
`;

export const UserName = styled.div`
  font-weight: ${tokens.typography.fontWeight.medium};
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.text.primary};
`;

export const UserRole = styled.div`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.text.secondary};
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${tokens.borderRadius.full};
  background-color: ${tokens.colors.primary.main};
  color: ${tokens.colors.primary.contrast};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${tokens.typography.fontWeight.medium};
  font-size: ${tokens.typography.fontSize.sm};
`;

export const UserMenu = styled.div`
  position: absolute;
  top: calc(100% + ${tokens.spacing[2]});
  right: 0;
  background-color: ${tokens.colors.background.paper};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.lg};
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  animation: fadeIn 0.2s ${tokens.transitions.easing.easeOut};
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const UserMenuItem = styled.div`
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  display: flex;
  align-items: center;
  color: ${tokens.colors.text.primary};
  font-size: ${tokens.typography.fontSize.sm};
  cursor: pointer;
  transition: background-color ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  
  svg {
    margin-right: ${tokens.spacing[3]};
    color: ${tokens.colors.text.secondary};
  }
  
  &:hover {
    background-color: ${tokens.colors.grey[100]};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${tokens.colors.border.light};
  }
`;
