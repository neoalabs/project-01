import React from 'react';
import PropTypes from 'prop-types';

const LessonCard = ({ title, status, completion, onStart, onQuiz }) => {
  // Status badge styling based on completion status
  const statusStyles = {
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Not Started': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  // Progress bar color based on status
  const progressColor = status === 'Completed' 
    ? 'bg-green-500' 
    : status === 'In Progress' 
      ? 'bg-blue-500' 
      : 'bg-gray-300';

  // Button styling based on status
  const startButtonStyles = status === 'Completed'
    ? 'bg-white text-green-700 border-green-500 hover:bg-green-50'
    : status === 'In Progress'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-blue-600 text-white hover:bg-blue-700';
      
  const quizButtonStyles = status === 'Not Started'
    ? 'bg-white text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
    : 'bg-white text-blue-700 border border-blue-500 hover:bg-blue-50';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]">
      {/* Card header with lesson title and status badge */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-600">Progress</span>
          <span className="text-xs font-medium text-gray-600">{completion}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColor} transition-all duration-300`} 
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-5 pt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
        <button 
          onClick={onStart}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${startButtonStyles}`}
        >
          {status === 'Completed' ? 'Review Lesson' : status === 'In Progress' ? 'Continue' : 'Start Lesson'}
        </button>
        <button 
          onClick={status !== 'Not Started' ? onQuiz : undefined}
          disabled={status === 'Not Started'}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${quizButtonStyles}`}
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Completed', 'In Progress', 'Not Started']).isRequired,
  completion: PropTypes.number.isRequired,
  onStart: PropTypes.func,
  onQuiz: PropTypes.func
};

LessonCard.defaultProps = {
  completion: 0,
  onStart: () => {},
  onQuiz: () => {}
};

export default LessonCard;