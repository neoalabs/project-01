import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const Chatbot = () => {
  // Sample initial messages - this would come from an API in a real implementation
  const initialMessages = [
    { 
      sender: 'ai', 
      text: 'Hi there! I\'m your SAT AI Tutor. How can I help with your SAT prep today?',
      timestamp: '4:00 PM'
    },
    { 
      sender: 'user', 
      text: 'What\'s the best way to improve my SAT math score?',
      timestamp: '4:01 PM'
    },
    { 
      sender: 'ai', 
      text: 'Great question! To improve your SAT math score, I recommend breaking it down into specific categories like algebra, data analysis, and geometry.\n\n1. **Practice regularly**: Do at least 20-30 math problems daily\n2. **Review mistakes**: Keep an error log to track and learn from mistakes\n3. **Master the calculator**: Know when to use it efficiently\n4. **Learn key formulas**: Memorize essential formulas for circles, triangles, etc.\n\nWould you like more specific strategies for a particular math topic?',
      timestamp: '4:02 PM'
    },
    { 
      sender: 'user', 
      text: 'Can you explain how to solve systems of equations quickly?',
      timestamp: '4:05 PM'
    },
  ];

  // State management
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Refs for DOM manipulation
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change or AI starts thinking
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  // Focus the textarea when the component mounts
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Simulated message sending function - would connect to AI API in production
  const sendMessage = async () => {
    if (currentMessage.trim() === '' || isAiThinking) return;
    
    // Add the user message to the chat
    const userMessage = {
      sender: 'user',
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setCurrentMessage('');
    
    // Simulate AI thinking
    setIsAiThinking(true);
    
    // Simulate API call delay (would be replaced with actual API call)
    setTimeout(() => {
      const aiResponse = {
        sender: 'ai',
        text: "For solving systems of equations quickly on the SAT, here are some strategies:\n\n1. **Substitution**: Solve for one variable and substitute into the other equation.\n2. **Elimination**: Add or subtract equations to eliminate a variable.\n3. **Graphing**: Find the intersection point (less common on SAT).\n\nExample:\n```\nx + 2y = 7\n3x - y = 8\n```\n\nUsing elimination, we can multiply the second equation by 2:\n```\nx + 2y = 7\n6x - 2y = 16\n```\n\nAdding the equations:\n```\n7x = 23\nx = 23/7\n```\n\nThen substitute back to find y.",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsAiThinking(false);
      textareaRef.current?.focus();
    }, 1500);
  };

  // Handle pressing Enter to send message (Shift+Enter for new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea as user types
  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-4xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 bg-blue-600 rounded-lg">
              <span className="text-sm font-bold text-white">SAT</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">SAT AI Tutor</h1>
              <p className="text-sm text-gray-600">Get 24/7 help with your SAT preparation</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Chat messages container */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mx-auto max-w-3xl">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index}
              sender={msg.sender}
              message={msg.text}
              timestamp={msg.timestamp}
            />
          ))}
          
          {/* AI typing indicator */}
          {isAiThinking && (
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 mr-2 overflow-hidden bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">SAT</span>
              </div>
              <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Input area */}
      <footer className="sticky bottom-0 z-10 border-t border-gray-200 bg-white shadow-md">
        <div className="px-4 py-4 mx-auto max-w-3xl">
          <div className="flex items-end space-x-2">
            <div className="flex-1 bg-gray-100 rounded-xl p-2">
              <textarea
                ref={textareaRef}
                className="w-full p-2 overflow-y-auto text-gray-700 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 min-h-[44px]"
                placeholder="Ask anything about SAT prep..."
                rows="1"
                value={currentMessage}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                  adjustTextareaHeight(e);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <button
              className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex-shrink-0 transition-colors"
              onClick={sendMessage}
              disabled={currentMessage.trim() === '' || isAiThinking}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-500">
            SATHelp24x7 AI is designed to provide educational guidance. Your conversations help us improve.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Chatbot;