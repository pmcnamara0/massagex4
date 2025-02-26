import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import { useApp } from '../../context/AppContext';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Not Authenticated</h1>
          <p className="text-gray-600">Please log in to access the app.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
