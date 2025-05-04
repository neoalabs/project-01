import React, { useState } from 'react';
import LessonCard from '../components/LessonCard';
import { BookOpenIcon, PencilSquareIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const Lessons = () => {
  // Static lesson data - would come from an API in a real application
  const [lessonsData, setLessonsData] = useState({
    reading: [
      { id: 'r1', title: "Reading Strategies", status: "Completed", completion: 100 },
      { id: 'r2', title: "Vocabulary in Context", status: "In Progress", completion: 60 },
      { id: 'r3', title: "Main Idea and Supporting Details", status: "Not Started", completion: 0 },
      { id: 'r4', title: "Author's Purpose", status: "Not Started", completion: 0 },
      { id: 'r5', title: "Text Structure and Organization", status: "Not Started", completion: 0 },
    ],
    writing: [
      { id: 'w1', title: "Grammar Rules", status: "Not Started", completion: 0 },
      { id: 'w2', title: "Sentence Structure", status: "In Progress", completion: 40 },
      { id: 'w3', title: "Punctuation Mastery", status: "Not Started", completion: 0 },
      { id: 'w4', title: "Essay Development", status: "Not Started", completion: 0 },
      { id: 'w5', title: "Evidence-Based Writing", status: "Not Started", completion: 0 },
    ],
    math: [
      { id: 'm1', title: "Algebra Basics", status: "Completed", completion: 100 },
      { id: 'm2', title: "Data Analysis", status: "Not Started", completion: 0 },
      { id: 'm3', title: "Problem-Solving Strategies", status: "In Progress", completion: 25 },
      { id: 'm4', title: "Geometry Fundamentals", status: "Not Started", completion: 0 },
      { id: 'm5', title: "Advanced Functions", status: "Not Started", completion: 0 },
    ]
  });

  // Subject sections with icons and colors
  const sections = [
    { id: 'reading', title: 'Reading', icon: BookOpenIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'writing', title: 'Writing', icon: PencilSquareIcon, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { id: 'math', title: 'Math', icon: CalculatorIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  // Progress calculation for each section
  const calculateProgress = (lessons) => {
    if (!lessons.length) return 0;
    const totalCompletion = lessons.reduce((sum, lesson) => sum + lesson.completion, 0);
    return Math.round(totalCompletion / lessons.length);
  };

  // Handlers for button clicks (placeholders for now)
  const handleStartLesson = (sectionId, lessonId) => {
    console.log(`Starting lesson: ${sectionId} - ${lessonId}`);
    // Would navigate to lesson page in a real app
  };

  const handleTakeQuiz = (sectionId, lessonId) => {
    console.log(`Taking quiz: ${sectionId} - ${lessonId}`);
    // Would navigate to quiz page in a real app
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SAT Lessons</h1>
          <p className="mt-2 text-lg text-gray-600">
            Master key concepts and strengthen your skills with our comprehensive lessons.
          </p>
        </div>
        
        {/* Progress overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
          {sections.map(section => {
            const progress = calculateProgress(lessonsData[section.id]);
            return (
              <div key={section.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${section.bgColor} mr-4`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {lessonsData[section.id].filter(l => l.status === 'Completed').length} of {lessonsData[section.id].length} lessons completed
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-4 w-full">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-500 ease-out`}
                          style={{ 
                            width: `${progress}%`, 
                            backgroundColor: progress === 100 ? '#10B981' : progress > 0 ? '#3B82F6' : '#D1D5DB' 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-600 mt-1 text-right">{progress}% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Lessons by section */}
        {sections.map(section => (
          <div key={section.id} className="mb-12">
            <div className="flex items-center mb-6">
              <section.icon className={`h-6 w-6 ${section.color} mr-2`} />
              <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessonsData[section.id].map(lesson => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  status={lesson.status}
                  completion={lesson.completion}
                  onStart={() => handleStartLesson(section.id, lesson.id)}
                  onQuiz={() => handleTakeQuiz(section.id, lesson.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;