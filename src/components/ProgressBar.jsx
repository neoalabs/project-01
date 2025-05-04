import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage, height = 'h-2', colorClass = 'bg-blue-500', bgClass = 'bg-gray-200', showPercentage = true }) => {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <div className="w-full">
      <div className={`w-full ${height} ${bgClass} rounded-full overflow-hidden`}>
        <div 
          className={`${height} ${colorClass} transition-all duration-300 ease-in-out`} 
          style={{ width: `${validPercentage}%` }}
          role="progressbar"
          aria-valuenow={validPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs font-medium text-gray-600 text-right">
          {validPercentage}%
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  height: PropTypes.string,
  colorClass: PropTypes.string,
  bgClass: PropTypes.string,
  showPercentage: PropTypes.bool
};

export default ProgressBar;