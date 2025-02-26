import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import Button from '../shared/Button';
import { Gender } from '../../types';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

export interface FilterOptions {
  maxDistance: number;
  ageRange: [number, number];
  genders: Gender[];
  skills: string[];
}

const availableSkills = [
  'Deep Tissue', 'Swedish', 'Hot Stone', 'Sports Massage', 
  'Thai Massage', 'Reflexology', 'Shiatsu', 'Trigger Point',
  'Aromatherapy', 'Reiki', 'Craniosacral'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters
}) => {
  const [maxDistance, setMaxDistance] = useState<number>(initialFilters.maxDistance);
  const [ageRange, setAgeRange] = useState<[number, number]>(initialFilters.ageRange);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>(initialFilters.genders);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialFilters.skills);

  const handleGenderToggle = (gender: Gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      maxDistance,
      ageRange,
      genders: selectedGenders,
      skills: selectedSkills
    });
    onClose();
  };

  const handleReset = () => {
    setMaxDistance(50);
    setAgeRange([18, 65]);
    setSelectedGenders([]);
    setSelectedSkills([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Filter size={20} className="text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {/* Distance Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Maximum Distance</h3>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">0 km</span>
              <span className="text-sm text-gray-500">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Age Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="range"
                  min="18"
                  max={ageRange[1]}
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>18</span>
                  <span>{ageRange[1]}</span>
                </div>
              </div>
              <div>
                <input
                  type="range"
                  min={ageRange[0]}
                  max="65"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{ageRange[0]}</span>
                  <span>65</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gender Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {['male', 'female', 'non-binary'].map((gender) => (
                <button
                  key={gender}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedGenders.includes(gender as Gender)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleGenderToggle(gender as Gender)}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Skills Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Massage Skills</h3>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSkills.includes(skill)
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
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              fullWidth
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
