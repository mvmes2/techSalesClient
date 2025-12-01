import styled, { css } from 'styled-components';
import { tokens } from '@/styles/tokens';

interface SidebarContainerProps {
  $isOpen: boolean;
}

interface LogoProps {
  $isOpen: boolean;
}

interface NavItemProps {
  $isActive: boolean;
  $isOpen: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${tokens.colors.background.paper};
  box-shadow: ${tokens.shadows.md};
  height: 100vh;
  position: sticky;
  top: 0;
  transition: width ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
  width: ${props => (props.$isOpen ? '240px' : '80px')};
  z-index: 20;
  overflow: hidden;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${tokens.spacing[4]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

export const Logo = styled.div<LogoProps>`
  font-size: ${props => (props.$isOpen ? tokens.typography.fontSize.xl : tokens.typography.fontSize.lg)};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.primary.main};
  transition: all ${tokens.transitions.duration.standard}ms ${tokens.transitions.easing.easeInOut};
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[1]};
  border-radius: ${tokens.borderRadius.full};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};

  &:hover {
    background-color: ${tokens.colors.grey[100]};
    color: ${tokens.colors.text.primary};
  }
`;

export const SidebarContent = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing[4]} 0;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tokens.colors.grey[300]};
    border-radius: ${tokens.borderRadius.full};
  }
`;

export const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  color: ${props => (props.$isActive ? tokens.colors.primary.main : tokens.colors.text.primary)};
  text-decoration: none;
  position: relative;
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};
  margin: ${tokens.spacing[1]} ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.lg};
  cursor: pointer;

  ${props => props.$isActive && css`
    background-color: ${tokens.colors.primary.light}30;
    font-weight: ${tokens.typography.fontWeight.medium};
  `}

  &:hover {
    background-color: ${props => (props.$isActive ? tokens.colors.primary.light + '40' : tokens.colors.grey[100])};
  }

  ${props => !props.$isOpen && css`
    justify-content: center;
    padding: ${tokens.spacing[3]} 0;
  `}
`;

export const NavItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 24px;
`;

export const NavItemText = styled.span`
  margin-left: ${tokens.spacing[3]};
  white-space: nowrap;
`;

export const NavItemBadge = styled.span`
  background-color: ${tokens.colors.error.main};
  color: ${tokens.colors.error.contrast};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.bold};
  min-width: 20px;
  height: 20px;
  border-radius: ${tokens.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0 ${tokens.spacing[1]};

  position: absolute;
  top: -5px;
  right: -5px;
`;

export const SidebarFooter = styled.div`
  padding: ${tokens.spacing[4]};
  border-top: 1px solid ${tokens.colors.border.light};
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  width: 100%;
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  color: ${tokens.colors.text.primary};
  cursor: pointer;
  border-radius: ${tokens.borderRadius.lg};
  transition: all ${tokens.transitions.duration.shorter}ms ${tokens.transitions.easing.easeInOut};

  &:hover {
    background-color: ${tokens.colors.grey[100]};
    color: ${tokens.colors.error.main};
  }
`;
