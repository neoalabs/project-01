import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'

// Import all pages
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import Chatbot from './pages/Chatbot'
import TestCenter from './pages/TestCenter'
import Forum from './pages/Forum'
import Calendar from './pages/Calendar'
import ScoreCalculator from './pages/ScoreCalculator'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <Routes>
      {/* Main routes wrapped in Layout component */}
      <Route element={<Layout />}>
        {/* Default route redirects to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* All application pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/test-center" element={<TestCenter />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calculator" element={<ScoreCalculator />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        {/* 404 route */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <a href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Return to Dashboard
            </a>
          </div>
        } />
      </Route>
    </Routes>
  )
}

export default App