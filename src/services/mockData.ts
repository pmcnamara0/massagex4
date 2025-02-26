import { User, Message, Conversation, Gender } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    age: 28,
    gender: 'female',
    bio: 'Certified massage therapist specializing in deep tissue and Swedish massage. Love helping people relieve stress!',
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      city: 'New York',
    },
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Deep Tissue', 'Swedish', 'Hot Stone'],
    preferences: {
      distance: 20,
      ageRange: [25, 45],
      genderPreference: ['male', 'female', 'non-binary'],
    },
    lastActive: '2023-05-15T15:30:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 32,
    gender: 'male',
    bio: 'Experienced in sports massage and injury recovery. Looking to exchange techniques and learn from others.',
    location: {
      latitude: 40.7282,
      longitude: -73.794,
      city: 'New York',
    },
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Sports Massage', 'Trigger Point', 'Myofascial Release'],
    preferences: {
      distance: 15,
      ageRange: [25, 40],
      genderPreference: ['female', 'non-binary'],
    },
    lastActive: '2023-05-14T20:45:00Z',
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    age: 26,
    gender: 'female',
    bio: 'Yoga instructor and massage enthusiast. I believe in the healing power of touch and energy work.',
    location: {
      latitude: 40.6782,
      longitude: -73.9442,
      city: 'Brooklyn',
    },
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Thai Massage', 'Reiki', 'Reflexology'],
    preferences: {
      distance: 10,
      ageRange: [24, 35],
      genderPreference: ['male', 'female'],
    },
    lastActive: '2023-05-15T09:15:00Z',
  },
  {
    id: '4',
    name: 'David Wilson',
    age: 35,
    gender: 'male',
    bio: 'Physical therapist by day, massage enthusiast by night. Looking for technique exchanges and networking.',
    location: {
      latitude: 40.7831,
      longitude: -73.9712,
      city: 'Manhattan',
    },
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Sports Therapy', 'Acupressure', 'Craniosacral'],
    preferences: {
      distance: 25,
      ageRange: [25, 45],
      genderPreference: ['female'],
    },
    lastActive: '2023-05-13T18:20:00Z',
  },
  {
    id: '5',
    name: 'Olivia Kim',
    age: 29,
    gender: 'female',
    bio: 'Amateur massage enthusiast looking to improve my skills. I specialize in relaxation techniques.',
    location: {
      latitude: 40.7609,
      longitude: -73.9840,
      city: 'Queens',
    },
    profilePicture: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Swedish', 'Aromatherapy', 'Head Massage'],
    preferences: {
      distance: 15,
      ageRange: [28, 40],
      genderPreference: ['male', 'female', 'non-binary'],
    },
    lastActive: '2023-05-14T12:50:00Z',
  },
  {
    id: '6',
    name: 'James Taylor',
    age: 31,
    gender: 'male',
    bio: 'Chiropractor with extensive knowledge of back and neck massages. Looking to trade techniques.',
    location: {
      latitude: 40.6501,
      longitude: -73.9496,
      city: 'Brooklyn',
    },
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Shiatsu', 'Deep Tissue', 'Chiropractic'],
    preferences: {
      distance: 20,
      ageRange: [25, 35],
      genderPreference: ['female', 'non-binary'],
    },
    lastActive: '2023-05-15T14:30:00Z',
  },
  {
    id: '7',
    name: 'Ava Williams',
    age: 27,
    gender: 'female',
    bio: 'Holistic healer passionate about energy work, reiki, and massage therapy. Would love to exchange practices!',
    location: {
      latitude: 40.7282,
      longitude: -74.0776,
      city: 'Jersey City',
    },
    profilePicture: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    photos: [
      'https://images.unsplash.com/photo-1519975258993-60b42d1c2ee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    skills: ['Reiki', 'Thai Massage', 'Sound Healing'],
    preferences: {
      distance: 15,
      ageRange: [25, 40],
      genderPreference: ['male', 'female'],
    },
    lastActive: '2023-05-14T16:40:00Z',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['1', '2'],
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participants: ['1', '3'],
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participants: ['1', '4'],
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: '2',
    receiverId: '1',
    content: 'Hi Emma, I saw you specialize in deep tissue. I\'d love to exchange techniques sometime!',
    timestamp: '2023-05-15T10:30:00Z',
    read: true,
  },
  {
    id: 'msg2',
    senderId: '1',
    receiverId: '2',
    content: 'Hey Michael! That sounds great. I\'d love to learn more about your sports massage approach.',
    timestamp: '2023-05-15T10:45:00Z',
    read: true,
  },
  {
    id: 'msg3',
    senderId: '2',
    receiverId: '1',
    content: 'Perfect! Are you free this weekend for a skill exchange?',
    timestamp: '2023-05-15T11:00:00Z',
    read: true,
  },
  {
    id: 'msg4',
    senderId: '2',
    receiverId: '1',
    content: 'I could also demonstrate some trigger point techniques that are great for athletes.',
    timestamp: '2023-05-15T11:02:00Z',
    read: false,
  },
  {
    id: 'msg5',
    senderId: '2',
    receiverId: '1',
    content: 'Let me know what works for you!',
    timestamp: '2023-05-15T11:05:00Z',
    read: false,
  },
  {
    id: 'msg6',
    senderId: '3',
    receiverId: '1',
    content: 'Emma, I\'d love to share some Thai massage techniques with you. Your profile mentioned you\'re interested in learning new styles.',
    timestamp: '2023-05-14T14:20:00Z',
    read: true,
  },
  {
    id: 'msg7',
    senderId: '1',
    receiverId: '3',
    content: 'That would be amazing, Sophia! I\'ve always wanted to learn more about Thai massage.',
    timestamp: '2023-05-14T15:30:00Z',
    read: true,
  },
  {
    id: 'msg8',
    senderId: '4',
    receiverId: '1',
    content: 'Hello Emma, I noticed you do hot stone massage. I\'ve been wanting to incorporate that into my practice. Would you be open to a trade?',
    timestamp: '2023-05-15T09:15:00Z',
    read: false,
  },
];

// Calculate distance between two coordinates in kilometers
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};
