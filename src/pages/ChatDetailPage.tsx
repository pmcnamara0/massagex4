import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message } from '../types';
import { 
  getMessages, 
  getConversationBetweenUsers, 
  sendMessage, 
  getUserById,
  markMessagesAsRead 
} from '../services/chatService';
import MessageBubble from '../components/chat/MessageBubble';
import MessageInput from '../components/chat/MessageInput';
import Avatar from '../components/shared/Avatar';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ChatDetailPage: React.FC = () => {
  const { currentUser } = useApp();
  const { id: chatId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!currentUser || !chatId) return;
    
    // If chatId is a userId (not a conversation id), get the conversation
    if (chatId.length === 1) {
      const conversation = getConversationBetweenUsers(currentUser.id, chatId);
      if (conversation) {
        const messages = getMessages(conversation.id);
        setMessages(messages);
      } else {
        // New conversation, no messages yet
        setMessages([]);
      }
      
      const user = getUserById(chatId);
      if (user) {
        setOtherUser({
          id: user.id,
          name: user.name,
          profilePicture: user.profilePicture
        });
      }
    } else {
      // Regular conversation ID
      const messages = getMessages(chatId);
      setMessages(messages);
      
      // Find the other user in this conversation
      const firstMessage = messages[0];
      if (firstMessage) {
        const otherUserId = 
          firstMessage.senderId === currentUser.id 
            ? firstMessage.receiverId 
            : firstMessage.senderId;
        
        const user = getUserById(otherUserId);
        if (user) {
          setOtherUser({
            id: user.id,
            name: user.name,
            profilePicture: user.profilePicture
          });
        }
      }
    }
    
    // Mark messages as read
    if (chatId.length > 1) {
      markMessagesAsRead(currentUser.id, chatId);
    }
  }, [currentUser, chatId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (content: string) => {
    if (!currentUser || !otherUser) return;
    
    const newMessage = sendMessage(currentUser.id, otherUser.id, content);
    setMessages([...messages, newMessage]);
  };
  
  const handleBack = () => {
    navigate('/chat');
  };
  
  if (!currentUser) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-3">
          <button onClick={handleBack} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          
          {otherUser && (
            <div className="flex flex-1 items-center">
              <Avatar
                src={otherUser.profilePicture}
                alt={otherUser.name}
                size="sm"
              />
              <div className="ml-3">
                <h2 className="text-base font-semibold">{otherUser.name}</h2>
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button className="text-indigo-600">
              <Phone size={20} />
            </button>
            <button className="text-indigo-600">
              <Video size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-2">No messages yet</p>
            <p className="text-sm text-gray-400">
              Send a message to start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUser.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatDetailPage;
