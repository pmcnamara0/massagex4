import React from 'react';
import { Message } from '../../types';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser
}) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
          isCurrentUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 text-right ${
            isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
          }`}
        >
          {format(new Date(message.timestamp), 'h:mm a')}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
