import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, MessageSquare, User } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around items-center">
        <NavLink
          to="/discover"
          className={({ isActive }) => `
            flex flex-col items-center text-sm ${
              isActive 
                ? 'text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          <Search size={24} />
          <span>Discover</span>
        </NavLink>
        
        <NavLink
          to="/chat"
          className={({ isActive }) => `
            flex flex-col items-center text-sm ${
              isActive 
                ? 'text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          <MessageSquare size={24} />
          <span>Chat</span>
        </NavLink>
        
        <NavLink
          to="/profile"
          className={({ isActive }) => `
            flex flex-col items-center text-sm ${
              isActive 
                ? 'text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavbar;
