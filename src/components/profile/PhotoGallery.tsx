import React from 'react';
import { Plus, Trash } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-3">Your Photos</h3>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden h-32">
            <img 
              src={photo} 
              alt={`Gallery ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onRemovePhoto(index)}
              className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
        
        {photos.length < 6 && (
          <div 
            className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500"
            onClick={onAddPhoto}
          >
            <div className="flex flex-col items-center">
              <Plus size={24} className="text-gray-400" />
              <span className="text-sm text-gray-500 mt-1">Add Photo</span>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Add up to 6 photos to showcase your massage space and techniques.
      </p>
    </div>
  );
};

export default PhotoGallery;
