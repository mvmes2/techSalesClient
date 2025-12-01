'use client';

import React from 'react';
import { LayoutContainer, MainContent, PageContent } from './MainLayout.styles';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useAuthContext } from '@/context/authContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { userLogged, isSidebarOpen, setSidebarOpen } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <MainContent>
        <Header
          userName={userLogged?.name || ''}
          companyName={userLogged?.company?.company_name || userLogged?.company_name || ''}
          sidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        <PageContent>
          {children}
        </PageContent>
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
