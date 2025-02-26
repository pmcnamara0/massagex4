import React from 'react';
import { User } from '../../types';
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import { X, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { calculateDistance } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

interface UserDetailProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  currentUserLocation: {
    latitude: number;
    longitude: number;
  };
}

const UserDetail: React.FC<UserDetailProps> = ({
  user,
  isOpen,
  onClose,
  currentUserLocation
}) => {
  const navigate = useNavigate();
  const distance = calculateDistance(
    currentUserLocation.latitude,
    currentUserLocation.longitude,
    user.location.latitude,
    user.location.longitude
  ).toFixed(1);

  const handleMessage = () => {
    navigate(`/chat/${user.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="bg-white w-full h-full overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white z-10 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{user.name}'s Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="relative">
          <img 
            src={user.profilePicture} 
            alt={`${user.name}'s profile`}
            className="w-full h-72 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}, {user.age}</h1>
                <div className="flex items-center text-white/90 text-sm mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{user.location.city} • {distance} km away</span>
                </div>
              </div>
              <div className="bg-white rounded-full p-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleMessage}
                  icon={<MessageSquare size={16} />}
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Massage Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {user.photos.map((photo, index) => (
                <img 
                  key={index}
                  src={photo} 
                  alt={`${user.name}'s photo ${index + 1}`}
                  className="rounded-lg object-cover w-full h-32"
                />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin size={20} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">{user.location.city}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">
                  Active {new Date(user.lastActive).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
