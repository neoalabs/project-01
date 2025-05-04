import React, { useState } from 'react';
import { SearchIcon, TrophyIcon, LightningBoltIcon, UserCircleIcon } from '@heroicons/react/solid';

const Leaderboard = () => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy student leaderboard data (would come from API in production)
  const leaderboardData = [
    { id: 1, rank: 1, name: "Sarah L.", score: 1520, lastActive: "1 hour ago", progress: 92 },
    { id: 2, rank: 2, name: "Aadi K.", score: 1510, lastActive: "20 minutes ago", progress: 88 },
    { id: 3, rank: 3, name: "Omar R.", score: 1490, lastActive: "2 days ago", progress: 85 },
    { id: 4, rank: 4, name: "Ava T.", score: 1450, lastActive: "3 days ago", progress: 79 },
    { id: 5, rank: 5, name: "Leo M.", score: 1440, lastActive: "1 week ago", progress: 76 },
    { id: 6, rank: 6, name: "Maya P.", score: 1420, lastActive: "5 hours ago", progress: 72 },
    { id: 7, rank: 7, name: "Zach W.", score: 1410, lastActive: "2 days ago", progress: 70 },
    { id: 8, rank: 8, name: "Emma C.", score: 1390, lastActive: "4 days ago", progress: 68 },
    { id: 9, rank: 9, name: "Tyler B.", score: 1380, lastActive: "1 day ago", progress: 65 },
    { id: 10, rank: 10, name: "Sofia R.", score: 1360, lastActive: "3 hours ago", progress: 62 },
  ];

  // Filter students based on search term
  const filteredData = leaderboardData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render rank badge with appropriate styling/icon
  const renderRankBadge = (rank) => {
    switch(rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 border-2 border-yellow-400">
            <TrophyIcon className="w-6 h-6 text-yellow-500" aria-hidden="true" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-400">
            <TrophyIcon className="w-6 h-6 text-gray-500" aria-hidden="true" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-400">
            <TrophyIcon className="w-6 h-6 text-amber-500" aria-hidden="true" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
            <span className="text-lg font-bold text-gray-700">{rank}</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SATHelp24x7 Leaderboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Top performing students based on practice test scores
          </p>
        </div>
        
        {/* Search and controls section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search student..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            View My Rank
          </button>
        </div>
        
        {/* Time period filter - Future enhancement */}
        <div className="hidden mb-6">
          <div className="flex space-x-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm w-fit">
            <button className="px-4 py-1.5 bg-blue-100 text-blue-700 font-medium rounded">This Week</button>
            <button className="px-4 py-1.5 text-gray-600 font-medium rounded hover:bg-gray-100">All Time</button>
          </div>
        </div>
        
        {/* Desktop view - Table */}
        <div className="hidden md:block overflow-hidden bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((student) => (
                <tr 
                  key={student.id}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    student.rank <= 3 ? (
                      student.rank === 1 
                        ? 'bg-yellow-50' 
                        : student.rank === 2 
                        ? 'bg-gray-50' 
                        : 'bg-amber-50'
                    ) : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {renderRankBadge(student.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold text-blue-600">{student.score}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <LightningBoltIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
                      {student.lastActive}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="h-2.5 rounded-full bg-blue-600" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{student.progress}% Complete</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile view - Cards */}
        <div className="md:hidden space-y-4">
          {filteredData.map((student) => (
            <div 
              key={student.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                student.rank <= 3 
                  ? student.rank === 1 
                    ? 'border-l-4 border-yellow-400' 
                    : student.rank === 2 
                    ? 'border-l-4 border-gray-400' 
                    : 'border-l-4 border-amber-400'
                  : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {renderRankBadge(student.rank)}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{student.score}</div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Active</div>
                    <div className="mt-1 flex items-center text-sm text-gray-700">
                      <LightningBoltIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
                      {student.lastActive}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Progress</div>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className="h-2 rounded-full bg-blue-600" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{student.progress}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state if no results */}
        {filteredData.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search term to find what you're looking for.
            </p>
          </div>
        )}
        
        {/* Pagination - Future enhancement */}
        <div className="hidden mt-8 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">35</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Pagination controls would go here */}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;