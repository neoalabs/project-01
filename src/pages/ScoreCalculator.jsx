import React, { useState } from 'react';
import { ExclamationCircleIcon, CalculatorIcon, AcademicCapIcon, RefreshIcon } from '@heroicons/react/outline';

const ScoreCalculator = () => {
  // State for input values and results
  const [rawScores, setRawScores] = useState({
    reading: '',
    writing: '',
    math: ''
  });
  
  const [results, setResults] = useState({
    readingWritingScaled: null,
    mathScaled: null,
    totalScore: null
  });
  
  const [error, setError] = useState(null);
  const [calculated, setCalculated] = useState(false);
  
  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numeric input
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    setRawScores({
      ...rawScores,
      [name]: value
    });
    
    // Reset results and error when inputs change
    if (calculated) {
      setCalculated(false);
    }
    if (error) {
      setError(null);
    }
  };
  
  // Calculate scores based on raw inputs
  const handleCalculate = () => {
    // Input validation
    const readingNum = parseInt(rawScores.reading, 10) || 0;
    const writingNum = parseInt(rawScores.writing, 10) || 0;
    const mathNum = parseInt(rawScores.math, 10) || 0;
    
    // Check if all fields are filled
    if (!rawScores.reading || !rawScores.writing || !rawScores.math) {
      setError('Please fill in all fields');
      return;
    }
    
    // Validate ranges
    if (readingNum < 0 || readingNum > 52) {
      setError('Reading raw score must be between 0 and 52');
      return;
    }
    
    if (writingNum < 0 || writingNum > 44) {
      setError('Writing raw score must be between 0 and 44');
      return;
    }
    
    if (mathNum < 0 || mathNum > 58) {
      setError('Math raw score must be between 0 and 58');
      return;
    }
    
    // Calculate scaled scores using the provided logic
    const readingWritingScaled = Math.round(((readingNum / 52) * 40 + (writingNum / 44) * 40) / 2 * 10);
    const mathScaled = Math.round((mathNum / 58) * 800);
    const totalScore = readingWritingScaled + mathScaled;
    
    // Set results
    setResults({
      readingWritingScaled,
      mathScaled,
      totalScore
    });
    
    setCalculated(true);
    setError(null);
  };
  
  // Reset all inputs and results
  const handleReset = () => {
    setRawScores({
      reading: '',
      writing: '',
      math: ''
    });
    setResults({
      readingWritingScaled: null,
      mathScaled: null,
      totalScore: null
    });
    setCalculated(false);
    setError(null);
  };
  
  // Helper function to get score strength category
  const getScoreStrength = (score) => {
    if (score >= 1400) return { text: 'Excellent', color: 'text-green-600' };
    if (score >= 1200) return { text: 'Strong', color: 'text-blue-600' };
    if (score >= 1000) return { text: 'Good', color: 'text-yellow-600' };
    return { text: 'Needs Improvement', color: 'text-red-600' };
  };
  
  // Get college readiness feedback based on score
  const getCollegeFeedback = (score) => {
    if (score >= 1400) return 'Competitive for highly selective colleges';
    if (score >= 1200) return 'Competitive for most selective colleges';
    if (score >= 1000) return 'Suitable for many colleges';
    return 'Consider additional practice to improve your score';
  };
  
  // Score strength data if calculated
  const scoreStrength = calculated ? getScoreStrength(results.totalScore) : null;
  const collegeFeedback = calculated ? getCollegeFeedback(results.totalScore) : null;
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <CalculatorIcon className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">SAT Score Calculator</h2>
      </div>
      
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Enter your raw scores below to calculate your estimated SAT score (out of 1600).
        </p>
      </div>
      
      {/* Input section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
          Enter Your Raw Scores
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="reading" className="block text-sm font-medium text-gray-700 mb-1">
              Reading Raw Score
              <span className="ml-1 text-xs text-gray-500">(0-52)</span>
            </label>
            <input
              type="text"
              id="reading"
              name="reading"
              value={rawScores.reading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter score"
              min="0"
              max="52"
            />
          </div>
          
          <div>
            <label htmlFor="writing" className="block text-sm font-medium text-gray-700 mb-1">
              Writing Raw Score
              <span className="ml-1 text-xs text-gray-500">(0-44)</span>
            </label>
            <input
              type="text"
              id="writing"
              name="writing"
              value={rawScores.writing}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter score"
              min="0"
              max="44"
            />
          </div>
          
          <div>
            <label htmlFor="math" className="block text-sm font-medium text-gray-700 mb-1">
              Math Raw Score
              <span className="ml-1 text-xs text-gray-500">(0-58)</span>
            </label>
            <input
              type="text"
              id="math"
              name="math"
              value={rawScores.math}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter score"
              min="0"
              max="58"
            />
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleCalculate}
          className="sm:flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
        >
          <CalculatorIcon className="h-5 w-5 mr-2" />
          Calculate Score
        </button>
        <button
          onClick={handleReset}
          className="sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshIcon className="h-5 w-5 mr-2" />
          Reset
        </button>
      </div>
      
      {/* Results section */}
      {calculated && (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 transition-all duration-300">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Estimated SAT Score</h3>
            <div className={`text-xl font-semibold mt-2 ${scoreStrength.color}`}>
              {scoreStrength.text}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">Reading & Writing</p>
              <p className="text-3xl font-bold text-blue-600">{results.readingWritingScaled}</p>
              <p className="text-xs text-gray-500 mt-1">out of 800</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">Math</p>
              <p className="text-3xl font-bold text-blue-600">{results.mathScaled}</p>
              <p className="text-xs text-gray-500 mt-1">out of 800</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Score</p>
              <p className="text-4xl font-bold text-blue-600">{results.totalScore}</p>
              <p className="text-xs text-gray-500 mt-1">out of 1600</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">College Readiness Feedback</h4>
            <p className="text-gray-700">{collegeFeedback}</p>
          </div>
          
          <p className="mt-4 text-sm text-gray-600 text-center">
            Note: This is an estimated score based on an approximate conversion formula.
            Actual SAT scores may vary based on the specific test scaling.
          </p>
        </div>
      )}
      
      {/* Information about SAT scoring */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">About SAT Scoring</h3>
        <p className="text-sm text-gray-600">
          The SAT consists of two main sections: Evidence-Based Reading & Writing and Math.
          Each section is scored on a scale of 200–800, for a total score of 400–1600.
          Raw scores (the number of questions answered correctly) are converted to scaled
          scores through a process called equating.
        </p>
      </div>
      
      {/* 
        Future enhancement possibilities:
        1. Save score history to local storage for comparison over time
        2. Add percentile rankings based on recent SAT data
        3. Create score visualization charts/graphs
        4. Include college admission score requirements lookup feature 
        5. Implement score improvement recommendations based on section performance
        6. Add option to share results via email or social media
        7. Connect to a backend API for more accurate conversion tables
      */}
    </div>
  );
};

export default ScoreCalculator;