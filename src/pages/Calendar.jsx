import React, { useState } from 'react';
import { CalendarIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Calendar = () => {
  // State for current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Dummy calendar events data
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, date: "2025-05-06", title: "Full SAT Mock Test", type: "Test", time: "9:00 AM - 12:30 PM" },
    { id: 2, date: "2025-05-09", title: "Essay Submission Due", type: "Assignment", time: "11:59 PM" },
    { id: 3, date: "2025-05-12", title: "College Webinar", type: "Webinar", time: "4:00 PM - 5:30 PM" },
    { id: 4, date: "2025-05-15", title: "Math Section Practice", type: "Practice", time: "2:00 PM - 3:30 PM" },
    { id: 5, date: "2025-05-20", title: "SAT Study Group", type: "Study", time: "5:00 PM - 6:30 PM" },
    { id: 6, date: "2025-05-22", title: "Grammar Quiz", type: "Test", time: "10:00 AM - 11:00 AM" },
    { id: 7, date: "2025-05-28", title: "College Application Workshop", type: "Webinar", time: "3:00 PM - 5:00 PM" },
  ]);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
    setSelectedDate(null); // Clear selected date when changing months
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    setSelectedDate(null); // Clear selected date when changing months
  };
  
  // Format date for event list display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get events for a specific date
  const getEventsForDate = (year, month, day) => {
    // Format the date to match our event date format
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === formattedDate);
  };
  
  // Select a date to view its events
  const handleDateClick = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (selectedDate === formattedDate) {
      // If clicking the same date, toggle it off
      setSelectedDate(null);
    } else {
      setSelectedDate(formattedDate);
    }
  };
  
  // Get upcoming events (sorted)
  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return calendarEvents
      .filter(event => event.date >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5); // Get only the next 5 events
  };
  
  // Render calendar grid
  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Create an array for all days in the month
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    // Day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div>
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map(dayLabel => (
            <div key={dayLabel} className="text-center text-xs font-medium text-gray-500 py-2">
              {dayLabel}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              // Empty cell
              return <div key={`empty-${index}`} className="h-24 bg-gray-50 rounded-lg" />;
            }
            
            const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = new Date().toISOString().split('T')[0] === formattedDate;
            const isSelected = selectedDate === formattedDate;
            const events = getEventsForDate(year, month, day);
            
            return (
              <div 
                key={`day-${day}`}
                className={`h-24 p-1 border rounded-lg bg-white transition-colors cursor-pointer
                  ${isToday ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
                  ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  ${events.length > 0 ? 'hover:border-blue-300' : 'hover:border-gray-300'}
                `}
                onClick={() => handleDateClick(year, month, day)}
              >
                <div className="flex justify-end">
                  <span 
                    className={`text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center
                      ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}
                    `}
                  >
                    {day}
                  </span>
                </div>
                
                {/* Event indicators */}
                <div className="mt-1 space-y-1 overflow-hidden">
                  {events.slice(0, 2).map(event => {
                    // Get event type styling
                    let badgeColor = '';
                    if (event.type === 'Test') badgeColor = 'bg-red-100 text-red-800';
                    if (event.type === 'Assignment') badgeColor = 'bg-blue-100 text-blue-800';
                    if (event.type === 'Webinar') badgeColor = 'bg-purple-100 text-purple-800';
                    if (event.type === 'Practice') badgeColor = 'bg-green-100 text-green-800';
                    if (event.type === 'Study') badgeColor = 'bg-yellow-100 text-yellow-800';
                    
                    return (
                      <div 
                        key={event.id} 
                        className={`px-1 py-0.5 text-xs truncate rounded ${badgeColor}`}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                  
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Track your SAT prep schedule, tests, and important deadlines
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Section */}
          <div className="lg:flex-1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                
                <button 
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              {/* Calendar grid */}
              {renderCalendarGrid()}
            </div>
            
            {/* Add Event Button (placeholder) */}
            <div className="mt-4 text-center">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Event
              </button>
            </div>
          </div>
          
          {/* Upcoming Events Section */}
          <div className="lg:w-80">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              
              <div className="space-y-3">
                {getUpcomingEvents().map(event => {
                  // Get event type styling
                  let typeColor = 'bg-gray-100 text-gray-800';
                  if (event.type === 'Test') typeColor = 'bg-red-100 text-red-800';
                  if (event.type === 'Assignment') typeColor = 'bg-blue-100 text-blue-800';
                  if (event.type === 'Webinar') typeColor = 'bg-purple-100 text-purple-800';
                  if (event.type === 'Practice') typeColor = 'bg-green-100 text-green-800';
                  if (event.type === 'Study') typeColor = 'bg-yellow-100 text-yellow-800';
                  
                  return (
                    <div key={event.id} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${typeColor}`}>
                          {event.type}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                      </div>
                      <h3 className="mt-2 font-medium text-gray-900">{event.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{event.time}</p>
                    </div>
                  );
                })}
                
                {getUpcomingEvents().length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    <p>No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Event Type Legend */}
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Event Types</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Test</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Assignment</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Webinar</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Practice</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Study</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Events on {formatDate(selectedDate)}
            </h2>
            
            <div className="space-y-4">
              {calendarEvents
                .filter(event => event.date === selectedDate)
                .map(event => {
                  // Get event type styling
                  let typeColor = 'bg-gray-100 text-gray-800 border-gray-200';
                  if (event.type === 'Test') typeColor = 'bg-red-100 text-red-800 border-red-200';
                  if (event.type === 'Assignment') typeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                  if (event.type === 'Webinar') typeColor = 'bg-purple-100 text-purple-800 border-purple-200';
                  if (event.type === 'Practice') typeColor = 'bg-green-100 text-green-800 border-green-200';
                  if (event.type === 'Study') typeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                  
                  return (
                    <div key={event.id} className="p-4 rounded-lg border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${typeColor}`}>
                            {event.type}
                          </span>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">{event.title}</h3>
                        </div>
                        <div className="mt-2 sm:mt-0 text-sm text-gray-500">{event.time}</div>
                      </div>
                      
                      {/* Sample action buttons - could be expanded in the future */}
                      <div className="mt-4 flex space-x-3">
                        <button className="px-3 py-1.5 text-sm text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* 
        Future enhancements:
        1. Implement event creation/editing functionality
        2. Add event recurrence options
        3. Connect to backend API for storing events
        4. Implement calendar view options (month, week, day)
        5. Add event reminders/notifications
        6. Implement event search functionality
        7. Add event categories and filtering
        */}
      </div>
    </div>
  );
};

export default Calendar;