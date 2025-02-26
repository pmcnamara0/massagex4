import React from 'react';
import { User } from '../../types';
import Avatar from '../shared/Avatar';
import { MapPin, Info } from 'lucide-react';
import { calculateDistance } from '../../services/mockData';

interface UserCardProps {
  user: User;
  currentUserLocation: {
    latitude: number;
    longitude: number;
  };
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  currentUserLocation, 
  onClick 
}) => {
  const distance = calculateDistance(
    currentUserLocation.latitude,
    currentUserLocation.longitude,
    user.location.latitude,
    user.location.longitude
  ).toFixed(1);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={user.photos[0] || user.profilePicture} 
          alt={`${user.name}'s photo`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white">{user.name}, {user.age}</h3>
              <div className="flex items-center text-white/90 text-sm mt-1">
                <MapPin size={16} className="mr-1" />
                <span>{user.location.city} • {distance} km away</span>
              </div>
            </div>
            <Avatar 
              src={user.profilePicture} 
              alt={user.name}
              size="md"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {user.skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full px-2.5 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 line-clamp-2">
          <Info size={16} className="inline mr-1 text-gray-400" />
          {user.bio}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
