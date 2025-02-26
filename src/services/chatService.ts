import { Message, Conversation } from '../types';
import { mockMessages, mockConversations, mockUsers } from './mockData';
import { getUserById } from './userService';

// Re-export getUserById so it can be imported from chatService
export { getUserById };

// Get conversations for a user
export const getConversations = (userId: string): Conversation[] => {
  const conversations = mockConversations.filter(conv => 
    conv.participants.includes(userId)
  );
  
  // Attach last message to each conversation
  return conversations.map(conv => {
    const messagesInConv = mockMessages.filter(msg => 
      conv.participants.includes(msg.senderId) && 
      conv.participants.includes(msg.receiverId)
    );
    
    // Sort messages by timestamp
    const sortedMessages = [...messagesInConv].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return {
      ...conv,
      lastMessage: sortedMessages[0],
    };
  });
};

// Get messages for a specific conversation
export const getMessages = (conversationId: string): Message[] => {
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  if (!conversation) return [];
  
  const messages = mockMessages.filter(msg => 
    conversation.participants.includes(msg.senderId) && 
    conversation.participants.includes(msg.receiverId)
  );
  
  // Sort by timestamp (oldest first)
  return [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

// Get conversation between two users
export const getConversationBetweenUsers = (
  userId1: string, 
  userId2: string
): Conversation | undefined => {
  return mockConversations.find(conv => 
    conv.participants.includes(userId1) && conv.participants.includes(userId2)
  );
};

// Send a new message
export const sendMessage = (senderId: string, receiverId: string, content: string): Message => {
  // In a real app, this would make an API call
  const newMessage: Message = {
    id: `msg${mockMessages.length + 1}`,
    senderId,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  // Check if conversation exists or create a new one
  let conversation = getConversationBetweenUsers(senderId, receiverId);
  if (!conversation) {
    conversation = {
      id: `conv${mockConversations.length + 1}`,
      participants: [senderId, receiverId],
      unreadCount: 1,
    };
    // In a real app, we would save this to backend
  }
  
  // In a real app, we would save this to backend
  return newMessage;
};

// Mark messages as read
export const markMessagesAsRead = (userId: string, conversationId: string): void => {
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  if (!conversation) return;
  
  // In a real app, this would make an API call to update the messages
  // For now we'll just pretend it worked
};

// Get user display info for a conversation
export const getConversationDisplayInfo = (conversation: Conversation, currentUserId: string) => {
  const otherUserId = conversation.participants.find(id => id !== currentUserId);
  if (!otherUserId) return null;
  
  const otherUser = getUserById(otherUserId);
  if (!otherUser) return null;
  
  return {
    id: otherUser.id,
    name: otherUser.name,
    profilePicture: otherUser.profilePicture,
  };
};
