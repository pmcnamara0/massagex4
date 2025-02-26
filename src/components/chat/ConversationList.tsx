import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '../../types';
import Avatar from '../shared/Avatar';
import { format } from 'date-fns';
import { getConversationDisplayInfo } from '../../services/chatService';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUserId
}) => {
  const navigate = useNavigate();

  const handleConversationClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`);
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center p-4">
        <p className="text-gray-500 mb-2">No conversations yet</p>
        <p className="text-sm text-gray-400">
          When you connect with others, your conversations will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => {
        const otherUser = getConversationDisplayInfo(conversation, currentUserId);
        if (!otherUser) return null;
        
        return (
          <div
            key={conversation.id}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleConversationClick(conversation.id)}
          >
            <Avatar
              src={otherUser.profilePicture}
              alt={otherUser.name}
              size="md"
              online={false}
            />
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {otherUser.name}
                </h3>
                {conversation.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {format(new Date(conversation.lastMessage.timestamp), 'h:mm a')}
                  </span>
                )}
              </div>
              
              {conversation.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
            
            {conversation.unreadCount > 0 && (
              <div className="ml-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-medium">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
