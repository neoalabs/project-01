import React from 'react';
import PropTypes from 'prop-types';
import { LightBulbIcon } from '@heroicons/react/24/outline';

const TipBox = ({ tip, category, onClick }) => {
  // Random gradient backgrounds for different tip categories
  const gradients = {
    reading: 'from-blue-50 to-indigo-50 border-blue-200',
    writing: 'from-emerald-50 to-teal-50 border-emerald-200',
    math: 'from-amber-50 to-yellow-50 border-amber-200',
    general: 'from-purple-50 to-fuchsia-50 border-purple-200',
    strategy: 'from-rose-50 to-pink-50 border-rose-200'
  };

  // Default to general if category not found
  const gradientClass = gradients[category] || gradients.general;

  return (
    <div 
      className={`p-5 rounded-xl border bg-gradient-to-br ${gradientClass} shadow-sm hover:shadow-md transition-shadow duration-200`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 p-1.5 bg-white rounded-full shadow-sm">
          <LightBulbIcon className="w-6 h-6 text-amber-500" />
        </div>
        
        <div className="ml-4">
          <h3 className="text-base font-semibold text-gray-800">
            Quick AI Tip of the Day
          </h3>
          
          <div className="mt-2">
            <p className="text-sm text-gray-700">{tip}</p>
          </div>
          
          <div className="mt-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {category} tip
          </div>
        </div>
      </div>
    </div>
  );
};

TipBox.propTypes = {
  tip: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['reading', 'writing', 'math', 'general', 'strategy']),
  onClick: PropTypes.func
};

TipBox.defaultProps = {
  category: 'general',
  onClick: () => {}
};

export default TipBox;