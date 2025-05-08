
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { AppProvider } from '@/context/AppContext';

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </AppProvider>
  );
};

export default Index;
