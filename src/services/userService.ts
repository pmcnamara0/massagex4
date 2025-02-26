import { User, Gender } from '../types';
import { mockUsers, calculateDistance } from './mockData';

// Simulate current user's location (New York City)
const currentLocation = {
  latitude: 40.7128,
  longitude: -74.006,
};

// Get all users except current user
export const getUsers = (currentUserId: string): User[] => {
  return mockUsers.filter(user => user.id !== currentUserId);
};

// Get a specific user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Filter users based on criteria
export const filterUsers = (
  currentUserId: string,
  maxDistance?: number,
  ageRange?: [number, number],
  genders?: Gender[],
  skills?: string[]
): User[] => {
  const users = getUsers(currentUserId);
  
  return users.filter(user => {
    // Filter by distance
    if (maxDistance) {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        user.location.latitude,
        user.location.longitude
      );
      if (distance > maxDistance) {
        return false;
      }
    }
    
    // Filter by age range
    if (ageRange && (user.age < ageRange[0] || user.age > ageRange[1])) {
      return false;
    }
    
    // Filter by gender
    if (genders && genders.length > 0 && !genders.includes(user.gender)) {
      return false;
    }
    
    // Filter by skills
    if (skills && skills.length > 0) {
      const hasMatchingSkill = user.skills.some(skill => 
        skills.includes(skill)
      );
      if (!hasMatchingSkill) {
        return false;
      }
    }
    
    return true;
  });
};

// Sort users by distance
export const sortUsersByDistance = (users: User[]): User[] => {
  return [...users].sort((a, b) => {
    const distanceA = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      a.location.latitude,
      a.location.longitude
    );
    const distanceB = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      b.location.latitude,
      b.location.longitude
    );
    return distanceA - distanceB;
  });
};

// Update user profile
export const updateUserProfile = (
  userId: string, 
  profileData: Partial<User>
): User | undefined => {
  // In a real app, this would make an API call
  // For now, we just simulate updating the user
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return undefined;
  
  // Update user data
  const updatedUser = {
    ...mockUsers[userIndex],
    ...profileData,
  };
  
  // In real app, we would save this to backend
  // For mock purposes, we'll just pretend it succeeded
  return updatedUser;
};
