import React, { useState } from 'react';
import { User, Gender } from '../../types';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { Camera } from 'lucide-react';

interface EditProfileFormProps {
  user: User;
  onSave: (profileData: Partial<User>) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age.toString());
  const [gender, setGender] = useState<Gender>(user.gender);
  const [bio, setBio] = useState(user.bio);
  const [skills, setSkills] = useState<string[]>(user.skills);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      name,
      age: parseInt(age),
      gender,
      bio,
      skills
    });
  };
  
  const availableSkills = [
    'Deep Tissue', 'Swedish', 'Hot Stone', 'Sports Massage', 
    'Thai Massage', 'Reflexology', 'Shiatsu', 'Trigger Point',
    'Aromatherapy', 'Reiki', 'Craniosacral'
  ];
  
  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img 
            src={user.profilePicture} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer border-2 border-white">
            <Camera size={20} className="text-white" />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Tap to change profile picture</p>
      </div>
      
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <Input
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        min={18}
        max={100}
        required
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['male', 'female', 'non-binary', 'prefer-not-to-say'].map((option) => (
            <div
              key={option}
              className={`border rounded-md p-3 cursor-pointer ${
                gender === option
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-300'
              }`}
              onClick={() => setGender(option as Gender)}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 rounded-full border flex items-center justify-center
                  ${gender === option ? 'border-indigo-600' : 'border-gray-400'}
                `}>
                  {gender === option && (
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  )}
                </div>
                <span className="ml-2 text-sm">
                  {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
                <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          placeholder="Tell others about yourself, your massage experience, and what you're looking for..."
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Massage Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${
                skills.includes(skill)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          fullWidth
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          fullWidth
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
