import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/shared/Button';
import EditProfileForm from '../components/profile/EditProfileForm';
import PhotoGallery from '../components/profile/PhotoGallery';
import Avatar from '../components/shared/Avatar';
import { Settings, LogOut, MapPin } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, logout, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveProfile = (profileData: any) => {
    updateProfile(profileData);
    setIsEditing(false);
  };
  
  const handleAddPhoto = () => {
    // In a real app, this would open a file picker
    alert('Photo upload functionality would be added here');
  };
  
  const handleRemovePhoto = (index: number) => {
    if (!currentUser) return;
    
    const newPhotos = [...currentUser.photos];
    newPhotos.splice(index, 1);
    updateProfile({ photos: newPhotos });
  };
  
  if (!currentUser) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (isEditing) {
    return (
      <div className="p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-gray-500"
          >
            Cancel
          </button>
        </div>
        
        <EditProfileForm 
          user={currentUser}
          onSave={handleSaveProfile}
        />
      </div>
    );
  }
  
  return (
    <div className="pb-16">
      <div className="bg-indigo-600 text-white p-4 pt-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">My Profile</h1>
            <div className="flex items-center mt-1">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{currentUser.location.city}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <Settings size={20} className="text-white" />
            </button>
            <button 
              onClick={logout}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30"
            >
              <LogOut size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-4 flex flex-col items-center -mt-12">
        <Avatar 
          src={currentUser.profilePicture} 
          alt={currentUser.name}
          size="xl"
          className="border-4 border-white"
        />
        <h2 className="text-xl font-bold mt-2">{currentUser.name}, {currentUser.age}</h2>
        <p className="text-gray-600 text-sm capitalize">{currentUser.gender}</p>
        
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">About Me</h3>
        <p className="text-gray-700">{currentUser.bio}</p>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">My Massage Skills</h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full px-3 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <PhotoGallery 
          photos={currentUser.photos}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
