import React, { useState } from 'react';
import { 
  ChatAltIcon, 
  ClockIcon, 
  ChevronUpIcon, 
  ChatIcon, 
  SearchIcon,
  FilterIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  FireIcon
} from '@heroicons/react/outline';

const Forum = () => {
  // Dummy forum thread data
  const [forumThreads, setForumThreads] = useState([
    {
      id: 1,
      title: "How do I improve SAT Reading scores?",
      preview: "I keep losing time on long passages. Any strategies for time management? I can understand the material when I have enough time, but during practice tests I'm always running out of time.",
      replies: 5,
      upvotes: 12,
      category: "Reading",
      lastReply: "2 hours ago",
      author: "StudyingHard",
      isPopular: true,
      tags: ["reading", "time-management"]
    },
    {
      id: 2,
      title: "Should I take the SAT more than once?",
      preview: "What's the ideal number of attempts before applying to colleges? I scored 1320 on my first try, but I think I can do better.",
      replies: 2,
      upvotes: 4,
      category: "Test Prep",
      lastReply: "4 days ago",
      author: "FutureDoctorMaybe",
      isPopular: false,
      tags: ["strategy", "retaking"]
    },
    {
      id: 3,
      title: "Math formulas I need to memorize?",
      preview: "Is there a comprehensive list of all the math formulas I should have memorized for the SAT? I know the basics but want to make sure I'm not missing anything.",
      replies: 7,
      upvotes: 18,
      category: "Math",
      lastReply: "1 day ago",
      author: "MathWiz101",
      isPopular: true,
      tags: ["math", "formulas"]
    },
    {
      id: 4,
      title: "Essay section - worth preparing for?",
      preview: "My target schools don't require the essay, but I'm wondering if submitting it would strengthen my application. Is it worth the extra preparation time?",
      replies: 0,
      upvotes: 2,
      category: "Writing",
      lastReply: null,
      author: "EssayAngst",
      isPopular: false,
      tags: ["essay", "writing"]
    },
    {
      id: 5,
      title: "Best practice tests that match real SAT difficulty?",
      preview: "I've done some practice tests that felt harder than others. Which practice materials best represent the actual SAT difficulty level?",
      replies: 3,
      upvotes: 9,
      category: "Resources",
      lastReply: "6 hours ago",
      author: "TestPrepper22",
      isPopular: true,
      tags: ["practice", "resources"]
    }
  ]);

  // State for active filter
  const [activeFilter, setActiveFilter] = useState('all');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter threads based on active filter
  const getFilteredThreads = () => {
    let filtered = [...forumThreads];
    
    // Apply search filter if present
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(thread => 
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        thread.preview.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    switch(activeFilter) {
      case 'unanswered':
        return filtered.filter(thread => thread.replies === 0);
      case 'popular':
        return filtered.filter(thread => thread.upvotes >= 8);
      default:
        return filtered;
    }
  };

  // Handler for upvoting a thread
  const handleUpvote = (threadId) => {
    setForumThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, upvotes: thread.upvotes + 1 } 
          : thread
      )
    );
  };

  // Handler for replying to a thread (placeholder)
  const handleReply = (threadId) => {
    console.log(`Opening reply form for thread ID: ${threadId}`);
    // In a real app, this would open a reply form or navigate to thread detail page
    alert(`This would open a reply form for thread #${threadId}`);
  };

  // Get filtered threads
  const filteredThreads = getFilteredThreads();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Ask, Answer, Learn — Get help from peers and contribute your knowledge
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search discussions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter buttons */}
          <div className="flex space-x-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm self-start">
            <button 
              className={`px-4 py-1.5 rounded font-medium text-sm transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-1.5 rounded font-medium text-sm transition-colors flex items-center ${
                activeFilter === 'unanswered' 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('unanswered')}
            >
              <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
              Unanswered
            </button>
            <button 
              className={`px-4 py-1.5 rounded font-medium text-sm transition-colors flex items-center ${
                activeFilter === 'popular' 
                  ? 'bg-red-100 text-red-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('popular')}
            >
              <FireIcon className="h-4 w-4 mr-1" />
              Popular
            </button>
          </div>
          
          {/* New thread button - placeholder for now */}
          <button className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ChatAltIcon className="h-5 w-5 mr-2" />
            New Discussion
          </button>
        </div>
        
        {/* Mobile new thread button */}
        <div className="md:hidden mb-6">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ChatAltIcon className="h-5 w-5 mr-2" />
            New Discussion
          </button>
        </div>
        
        {/* Thread count */}
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <FilterIcon className="h-4 w-4 mr-1" />
          <span>Showing {filteredThreads.length} threads</span>
        </div>
        
        {/* Forum Threads */}
        <div className="space-y-4">
          {filteredThreads.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <QuestionMarkCircleIcon className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No discussions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search.' : 'Be the first to start a discussion!'}
              </p>
            </div>
          ) : (
            filteredThreads.map(thread => (
              <div 
                key={thread.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-2">
                          {thread.category}
                        </span>
                        {thread.replies === 0 && (
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                            Unanswered
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                        {thread.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {thread.preview}
                      </p>
                      
                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4">
                        <span className="flex items-center">
                          Posted by <span className="font-medium ml-1">{thread.author}</span>
                        </span>
                        
                        <span className="flex items-center">
                          <ChatIcon className="h-3.5 w-3.5 mr-1" />
                          {thread.replies} {thread.replies === 1 ? 'reply' : 'replies'}
                        </span>
                        
                        {thread.lastReply && (
                          <span className="flex items-center">
                            <ClockIcon className="h-3.5 w-3.5 mr-1" />
                            Last reply {thread.lastReply}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center ml-4">
                      <button 
                        onClick={() => handleUpvote(thread.id)}
                        className="group flex flex-col items-center p-2 rounded-lg hover:bg-gray-100"
                        aria-label="Upvote this thread"
                      >
                        <ChevronUpIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">{thread.upvotes}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex space-x-1">
                      {thread.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleReply(thread.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <ChatAltIcon className="h-4 w-4 mr-1.5" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination - placeholder for future implementation */}
        {filteredThreads.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* 
          Future enhancements:
          1. Implement backend API integration with useEffect to fetch real forum data
          2. Add thread creation modal/form when "New Discussion" is clicked
          3. Implement detailed thread view page with complete thread and replies
          4. Add user authentication check before allowing upvotes
          5. Implement pagination for large forums
          6. Add rich text editor for replies with markdown support
          7. Implement thread sorting options (newest, most upvoted, etc.)
          8. Add categorization system with more robust filtering
        */}
      </div>
    </div>
  );
};

export default Forum;