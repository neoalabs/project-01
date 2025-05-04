import React from 'react';
import PropTypes from 'prop-types';
import { CalendarIcon, FireIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const MilestoneList = ({ milestones }) => {
  // Function to determine urgency styling
  const getUrgencyStyles = (daysLeft) => {
    if (daysLeft <= 1) {
      return {
        containerClass: 'bg-red-50 border-red-200',
        textClass: 'text-red-700',
        iconColor: 'text-red-500',
        icon: <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
      };
    } else if (daysLeft <= 3) {
      return {
        containerClass: 'bg-amber-50 border-amber-200',
        textClass: 'text-amber-700',
        iconColor: 'text-amber-500',
        icon: <FireIcon className="w-5 h-5 text-amber-500" />
      };
    } else {
      return {
        containerClass: 'bg-blue-50 border-blue-200',
        textClass: 'text-blue-700',
        iconColor: 'text-blue-500',
        icon: <CalendarIcon className="w-5 h-5 text-blue-500" />
      };
    }
  };

  // Helper to format the time remaining text
  const formatTimeRemaining = (daysLeft) => {
    if (daysLeft === 0) return 'Due today!';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  return (
    <div className="space-y-3">
      {milestones.length === 0 ? (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
          No upcoming milestones
        </div>
      ) : (
        milestones.map((milestone, index) => {
          const { containerClass, textClass, icon } = getUrgencyStyles(milestone.daysLeft);
          
          return (
            <div 
              key={index}
              className={`p-3 border ${containerClass} rounded-lg shadow-sm flex items-center justify-between`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h4 className={`font-medium ${textClass}`}>{milestone.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {milestone.date}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-semibold ${textClass}`}>
                {formatTimeRemaining(milestone.daysLeft)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

MilestoneList.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      daysLeft: PropTypes.number.isRequired
    })
  )
};

MilestoneList.defaultProps = {
  milestones: []
};

export default MilestoneList;