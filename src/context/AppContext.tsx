import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Gender } from '../types';
import { mockUsers } from '../services/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in (from localStorage in a real app)
  useEffect(() => {
    // For demo purposes, auto-login as the first user
    const savedUser = mockUsers[0];
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      // In a real app, save to localStorage or session
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    // In a real app, clear localStorage or session
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      ...profileData,
    };
    
    setCurrentUser(updatedUser);
    // In a real app, save to backend
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      isAuthenticated,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
