export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

export interface User {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  bio: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };
  profilePicture: string;
  photos: string[];
  skills: string[];
  preferences: {
    distance: number;
    ageRange: [number, number];
    genderPreference: Gender[];
  };
  lastActive: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}
