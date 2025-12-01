'use client';

import React from 'react';
import {
  SidebarContainer,
  SidebarHeader,
  Logo,
  ToggleButton,
  SidebarContent,
  SidebarFooter,
  NavItem,
  NavItemIcon,
  NavItemText,
  NavItemBadge,
  LogoutButton
} from './Sidebar.styles';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/api/useAuth';
import {
  FiHome,
  FiUsers,
  FiPackage,
  FiTool,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut
} from 'react-icons/fi';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItemType {
  icon: React.ReactNode;
  text: string;
  path: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();
  const logout = useLogout();

  const navItems: NavItemType[] = [
    { icon: <FiHome size={20} />, text: 'Home', path: '/user-home' },
    { icon: <FiUsers size={20} />, text: 'Clientes', path: '/clientes', badge: 3 },
    { icon: <FiPackage size={20} />, text: 'Estoque', path: '/estoque' },
    { icon: <FiTool size={20} />, text: 'Serviços', path: '/servicos' },
    { icon: <FiSettings size={20} />, text: 'Configurações', path: '/config' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <Logo $isOpen={isOpen}>
          {isOpen ? 'SalesTech' : 'ST'}
        </Logo>
        <ToggleButton onClick={onToggle}>
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </ToggleButton>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((item) => (
          <Link href={item.path} key={item.path} passHref>
            <NavItem $isActive={pathname === item.path} $isOpen={isOpen}>
              <NavItemIcon>
                {item.icon}
                {!isOpen && item.badge && <NavItemBadge>{item.badge}</NavItemBadge>}
              </NavItemIcon>
              {isOpen && (
                <>
                  <NavItemText>{item.text}</NavItemText>
                  {item.badge && <NavItemBadge>{item.badge}</NavItemBadge>}
                </>
              )}
            </NavItem>
          </Link>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <LogoutButton onClick={handleLogout}>
          <NavItemIcon>
            <FiLogOut size={20} />
          </NavItemIcon>
          {isOpen && <NavItemText>Sair</NavItemText>}
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
