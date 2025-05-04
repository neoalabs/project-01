import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import LessonStatusCard from './LessonStatusCard';
import TipBox from './TipBox';
import MilestoneList from './MilestoneList';

// Mock data (would come from API/props in a real app)
const mockUserData = {
  name: 'Alex Thompson',
  overallProgress: 68,
};

const mockLessons = [
  {
    id: 1,
    title: 'Reading',
    isCompleted: true,
    completionPercentage: 100,
    lessonsCompleted: 12,
    totalLessons: 12,
  },
  {
    id: 2,
    title: 'Writing',
    isCompleted: false,
    completionPercentage: 75,
    lessonsCompleted: 9,
    totalLessons: 12,
  },
  {
    id: 3,
    title: 'Math',
    isCompleted: false,
    completionPercentage: 30,
    lessonsCompleted: 6,
    totalLessons: 20,
  },
];

const mockTip = {
  tip: "When tackling sentence completion questions, look for keywords in the original sentence that signal relationships (contrast, cause/effect, etc.). This will help you predict what belongs in the blank before looking at answer choices.",
  category: 'reading',
};

const mockMilestones = [
  {
    title: 'SAT Full Mock Test',
    date: 'May 6, 2025',
    daysLeft: 2,
  },
  {
    title: 'Essay Submission Due',
    date: 'May 11, 2025',
    daysLeft: 7,
  },
  {
    title: 'Grammar Quiz',
    date: 'May 4, 2025',
    daysLeft: 0,
  },
  {
    title: 'Math Practice Section',
    date: 'May 15, 2025',
    daysLeft: 11,
  },
];

const Dashboard = ({ 
  userData = mockUserData, 
  lessons = mockLessons, 
  tipOfTheDay = mockTip, 
  milestones = mockMilestones 
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">SAT Portal Dashboard</h1>
        <div className="h-1 w-20 bg-blue-500 rounded mt-2"></div>
      </div>
      
      {/* Welcome & Progress Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back, {userData.name}!
            </h2>
            <p className="text-gray-600 mt-1">
              Keep up the good work! You're making steady progress.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-sm font-medium text-gray-700">
              Overall Progress:
            </div>
            <div className="w-32 md:w-48">
              <ProgressBar 
                percentage={userData.overallProgress} 
                height="h-3" 
                colorClass={userData.overallProgress > 80 ? 'bg-green-500' : 'bg-blue-500'}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile progress - only visible on small screens */}
        <div className="mt-4 md:hidden">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Overall Progress:
          </div>
          <ProgressBar 
            percentage={userData.overallProgress} 
            height="h-3" 
            colorClass={userData.overallProgress > 80 ? 'bg-green-500' : 'bg-blue-500'}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <Link to="/quiz" className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Take Practice Quiz
          </Link>
          <Link to="/chatbot" className="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Ask AI Tutor
          </Link>
          <Link to="/calendar" className="btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            View Calendar
          </Link>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Lessons Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Lessons Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lessons.map((lesson) => (
                <LessonStatusCard
                  key={lesson.id}
                  title={lesson.title}
                  isCompleted={lesson.isCompleted}
                  completionPercentage={lesson.completionPercentage}
                  lessonsCompleted={lesson.lessonsCompleted}
                  totalLessons={lesson.totalLessons}
                  onClick={() => console.log(`Navigating to ${lesson.title} lessons`)}
                />
              ))}
            </div>
          </div>
          
          {/* Tip of the Day */}
          <div className="mb-6">
            <TipBox
              tip={tipOfTheDay.tip}
              category={tipOfTheDay.category}
              onClick={() => console.log('Tip clicked')}
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FireIcon className="h-5 w-5 mr-2 text-amber-500" />
              Upcoming Milestones
            </h3>
            
            <MilestoneList milestones={milestones} />
            
            <div className="mt-4 text-center">
              <Link 
                to="/calendar" 
                className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                View Full Calendar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for the buttons */}
      <style jsx>{`
        .btn-primary {
          @apply flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200;
        }
        .btn-secondary {
          @apply flex items-center justify-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200;
        }
        .btn-outline {
          @apply flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;