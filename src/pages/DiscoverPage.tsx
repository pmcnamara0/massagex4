import React, { useState, useEffect } from 'react';
import { User, Gender } from '../types';
import { filterUsers, sortUsersByDistance } from '../services/userService';
import UserCard from '../components/discover/UserCard';
import FilterPanel, { FilterOptions } from '../components/discover/FilterPanel';
import UserDetail from '../components/discover/UserDetail';
import { useApp } from '../context/AppContext';
import { Filter } from 'lucide-react';

const DiscoverPage: React.FC = () => {
  const { currentUser } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    maxDistance: 50,
    ageRange: [18, 65],
    genders: [] as Gender[],
    skills: []
  });
  
  // Current user location for distance calculation (normally would come from device GPS)
  const currentLocation = {
    latitude: 40.7128,
    longitude: -74.006,
  };
  
  useEffect(() => {
    if (currentUser) {
      // Apply filters and sort by distance
      let filteredUsers = filterUsers(
        currentUser.id,
        filters.maxDistance,
        filters.ageRange,
        filters.genders.length > 0 ? filters.genders : undefined,
        filters.skills.length > 0 ? filters.skills : undefined
      );
      
      // Sort by distance
      filteredUsers = sortUsersByDistance(filteredUsers);
      
      setUsers(filteredUsers);
    }
  }, [currentUser, filters]);
  
  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };
  
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };
  
  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };
  
  const handleCloseUserDetail = () => {
    setSelectedUser(null);
  };
  
  if (!currentUser) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Discover</h1>
          <button 
            onClick={handleOpenFilter}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center">
            <p className="text-gray-500 mb-2">No massage partners found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div>
            {users.map(user => (
              <UserCard 
                key={user.id}
                user={user}
                currentUserLocation={currentLocation}
                onClick={() => handleUserClick(user)}
              />
            ))}
          </div>
        )}
      </div>
      
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
      
      {selectedUser && (
        <UserDetail 
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={handleCloseUserDetail}
          currentUserLocation={currentLocation}
        />
      )}
    </div>
  );
};

export default DiscoverPage;
