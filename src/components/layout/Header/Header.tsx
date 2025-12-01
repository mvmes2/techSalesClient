'use client';

import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderContent,
  CompanyInfo,
  CompanyName,
  UserSection,
  UserInfo,
  UserName,
  UserRole,
  UserAvatar,
  UserMenu,
  UserMenuItem,
  NotificationsButton,
  NotificationsBadge,
  SearchContainer,
  SearchInput,
  HeaderActions
} from './Header.styles';
import { FiSearch, FiBell, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useLogout } from '@/hooks/api/useAuth';

interface HeaderProps {
  userName: string;
  companyName: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  companyName,
  sidebarOpen,
  onToggleSidebar
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const logout = useLogout();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <CompanyInfo>
          <CompanyName>{companyName}</CompanyName>
        </CompanyInfo>

        <SearchContainer $focused={searchFocused}>
          <FiSearch size={18} />
          <SearchInput
            placeholder="Pesquisar..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </SearchContainer>

        <HeaderActions>
          <NotificationsButton>
            <NotificationsBadge>3</NotificationsBadge>
            <FiBell size={20} />
          </NotificationsButton>

          <UserSection>
            <UserInfo onClick={toggleUserMenu}>
              <div>
                <UserName>{userName}</UserName>
                <UserRole>Agente</UserRole>
              </div>
              <UserAvatar>
                {getInitials(userName)}
              </UserAvatar>
            </UserInfo>

            {userMenuOpen && (
              <UserMenu>
                <UserMenuItem>
                  <FiUser size={16} />
                  Meu Perfil
                </UserMenuItem>
                <UserMenuItem>
                  <FiSettings size={16} />
                  Configurações
                </UserMenuItem>
                <UserMenuItem onClick={handleLogout}>
                  <FiLogOut size={16} />
                  Sair
                </UserMenuItem>
              </UserMenu>
            )}
          </UserSection>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
