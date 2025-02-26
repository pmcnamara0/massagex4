import React, { useEffect, useState } from 'react';
import { Conversation } from '../types';
import { getConversations } from '../services/chatService';
import ConversationList from '../components/chat/ConversationList';
import { useApp } from '../context/AppContext';

const ChatListPage: React.FC = () => {
  const { currentUser } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const userConversations = getConversations(currentUser.id);
      setConversations(userConversations);
    }
  }, [currentUser]);
  
  if (!currentUser) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </div>
      
      <ConversationList 
        conversations={conversations}
        currentUserId={currentUser.id}
      />
    </div>
  );
};

export default ChatListPage;
