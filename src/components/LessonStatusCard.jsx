import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const LessonStatusCard = ({ 
  title, 
  isCompleted, 
  completionPercentage, 
  lessonsCompleted, 
  totalLessons, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-200
        ${isCompleted 
          ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
          : 'bg-white border border-gray-200 hover:bg-gray-50'}
        shadow-sm hover:shadow-md
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <div className="mt-1 flex items-center">
            {isCompleted ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-1.5" />
            ) : (
              <ClockIcon className="w-5 h-5 text-amber-500 mr-1.5" />
            )}
            <span className="text-sm font-medium">
              {isCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {lessonsCompleted} of {totalLessons} lessons completed
          </div>
        </div>
        
        {/* Circle progress indicator */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="24"
              cy="24"
            />
            <circle
              className={`${isCompleted ? 'text-green-500' : 'text-blue-500'}`}
              strokeWidth="2"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 * (1 - (completionPercentage / 100))}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="24"
              cy="24"
            />
          </svg>
          <span className="absolute text-xs font-semibold">
            {completionPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

LessonStatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  completionPercentage: PropTypes.number.isRequired,
  lessonsCompleted: PropTypes.number.isRequired,
  totalLessons: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

LessonStatusCard.defaultProps = {
  isCompleted: false,
  completionPercentage: 0,
  lessonsCompleted: 0,
  totalLessons: 0,
  onClick: () => {}
};

export default LessonStatusCard;