import React, { useState } from 'react';
import { 
  ClockIcon, 
  AcademicCapIcon, 
  PuzzlePieceIcon, 
  CalendarIcon, 
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ClockIcon as ClockSolidIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const TestCenter = () => {
  // Mock test history data - would come from API in real implementation
  const [testHistory, _setTestHistory] = useState([
    {
      id: '1',
      date: "2025-05-02",
      type: "Full Mock Test",
      score: 1320,
      status: "Completed",
      sections: {
        reading: 34,
        writing: 37,
        math: 39
      }
    },
    {
      id: '2',
      date: "2025-04-28",
      type: "Math Section Only",
      score: 670,
      status: "Completed",
      sections: {
        math: 38
      }
    },
    {
      id: '3',
      date: "2025-04-23",
      type: "Custom Reading + Grammar",
      score: null,
      status: "Incomplete",
      sections: {
        reading: null,
        writing: null
      }
    },
    {
      id: '4',
      date: "2025-04-15",
      type: "Full Mock Test",
      score: 1280,
      status: "Completed",
      sections: {
        reading: 32,
        writing: 35,
        math: 37
      }
    },
    {
      id: '5',
      date: "2025-04-08",
      type: "Mini Section Test",
      score: 35,
      status: "Completed",
      sections: {
        reading: 35
      }
    },
  ]);

  // State for active tab in test history
  const [activeTab, setActiveTab] = useState('all');

  // Filter test history based on active tab
  const filteredHistory = activeTab === 'all' 
    ? testHistory 
    : testHistory.filter(test => test.status.toLowerCase() === activeTab);

  // Test option cards data
  const testOptions = [
    {
      id: 'full-mock',
      title: 'Full Mock Test',
      description: 'Complete 3-hour SAT simulation with all sections',
      icon: AcademicCapIcon,
      color: 'bg-blue-600',
      estimated: '3 hours',
      questions: 98
    },
    {
      id: 'mini-section',
      title: 'Mini Section Test',
      description: 'Focus on one section at a time (Reading, Writing, or Math)',
      icon: ClockIcon,
      color: 'bg-amber-500',
      estimated: '45 minutes',
      questions: 30
    },
    {
      id: 'custom-test',
      title: 'Custom Test',
      description: 'Build your own practice test by selecting specific topics',
      icon: PuzzlePieceIcon,
      color: 'bg-emerald-600',
      estimated: 'Variable',
      questions: 'Custom'
    }
  ];

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Placeholder handlers for button clicks
  const handleStartTest = (testType) => {
    console.log(`Starting test: ${testType}`);
    // In a real app, this would navigate to the test engine
    // with the appropriate test configuration
  };

  const handleViewDetails = (testId) => {
    console.log(`Viewing details for test ID: ${testId}`);
    // In a real app, this would navigate to a detailed view
    // of the test results with analytics
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SAT Practice Test Center</h1>
          <p className="mt-2 text-lg text-gray-600">
            Practice with full-length tests or focus on specific sections
          </p>
        </div>

        {/* Test Mode Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Choose a Test Mode</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className={`${option.color} h-2`}></div>
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${option.color} bg-opacity-10 text-opacity-90`}>
                      <option.icon className={`h-6 w-6 ${option.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      
                      <div className="flex items-center mt-4 text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{option.estimated}</span>
                        </div>
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-4 w-4 mr-1" />
                          <span>{option.questions} questions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleStartTest(option.id)}
                    className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium text-sm transition-colors ${option.color} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${option.color.split('-')[1]}-500`}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test History Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">Your Test History</h2>
            
            {/* Filter tabs */}
            <div className="mt-3 md:mt-0 flex space-x-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button 
                className={`px-3 py-1.5 text-sm font-medium rounded ${activeTab === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('all')}
              >
                All Tests
              </button>
              <button 
                className={`px-3 py-1.5 text-sm font-medium rounded ${activeTab === 'completed' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
              <button 
                className={`px-3 py-1.5 text-sm font-medium rounded ${activeTab === 'incomplete' ? 'bg-amber-100 text-amber-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('incomplete')}
              >
                Incomplete
              </button>
            </div>
          </div>
          
          {/* Test history cards */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-gray-500">No tests found in this category.</p>
              </div>
            ) : (
              filteredHistory.map((test) => (
                <div 
                  key={test.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {test.status === 'Completed' 
                              ? <CheckCircleIcon className="mr-1 h-3 w-3 text-green-500" /> 
                              : <ClockSolidIcon className="mr-1 h-3 w-3 text-amber-500" />
                            }
                            {test.status}
                          </span>
                          <h3 className="ml-2 text-lg font-medium text-gray-800">{test.type}</h3>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{formatDate(test.date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {test.score && (
                          <div className="text-center mr-6">
                            <div className="flex items-center">
                              <ChartBarIcon className="h-4 w-4 text-blue-500 mr-1" />
                              <span className="text-2xl font-bold text-blue-600">{test.score}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Total Score</p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => handleViewDetails(test.id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4 text-gray-500" />
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    {/* Section scores - only shown if test is completed */}
                    {test.status === 'Completed' && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Section Scores:</h4>
                        <div className="flex flex-wrap gap-4">
                          {test.sections.reading !== undefined && (
                            <div className="px-3 py-1 bg-blue-50 rounded-lg">
                              <span className="text-sm text-blue-700">Reading: <strong>{test.sections.reading}</strong>/40</span>
                            </div>
                          )}
                          {test.sections.writing !== undefined && (
                            <div className="px-3 py-1 bg-purple-50 rounded-lg">
                              <span className="text-sm text-purple-700">Writing: <strong>{test.sections.writing}</strong>/40</span>
                            </div>
                          )}
                          {test.sections.math !== undefined && (
                            <div className="px-3 py-1 bg-emerald-50 rounded-lg">
                              <span className="text-sm text-emerald-700">Math: <strong>{test.sections.math}</strong>/40</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestCenter;