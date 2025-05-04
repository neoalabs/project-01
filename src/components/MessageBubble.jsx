import React from 'react';
import PropTypes from 'prop-types';

const MessageBubble = ({ sender, message, timestamp }) => {
  const isUser = sender === 'user';
  
  // Basic markdown-like formatting
  const formatMessage = (text) => {
    // Bold text
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Code blocks
    formatted = formatted.replace(/```([\s\S]*?)```/g, 
      '<pre class="bg-gray-800 text-gray-100 p-3 rounded my-2 overflow-x-auto text-sm font-mono">' +
      '$1</pre>');
    
    // Numbered lists
    formatted = formatted.replace(/(\d+\.\s+(.*?)(\n|$))/g, 
      '<div class="flex space-x-2 my-1"><span>$1.</span><span>$2</span></div>');
    
    // Line breaks
    formatted = formatted.replace(/\n\n/g, '<br /><br />');
    formatted = formatted.replace(/\n/g, '<br />');
    
    return formatted;
  };

  return (
    <div 
      className={`flex w-full mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar for AI */}
      {!isUser && (
        <div className="w-8 h-8 mr-2 overflow-hidden bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
          <span className="text-xs font-medium text-blue-600">SAT</span>
        </div>
      )}
      
      {/* Message bubble */}
      <div 
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
        />
        
        {timestamp && (
          <div className={`text-xs mt-2 text-right ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {timestamp}
          </div>
        )}
      </div>
      
      {/* Avatar for User */}
      {isUser && (
        <div className="w-8 h-8 ml-2 overflow-hidden bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white">You</span>
        </div>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  sender: PropTypes.oneOf(['user', 'ai']).isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string
};

export default MessageBubble;