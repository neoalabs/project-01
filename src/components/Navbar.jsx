import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Navigation links data
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Test Center', path: '/test-center' },
    { name: 'Forum', path: '/forum' },
    { name: 'Calendar', path: '/calendar' },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 mr-2 text-gray-500 rounded-md md:hidden hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
            >
              <span className="sr-only">Open sidebar</span>
              {isSidebarOpen ? (
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
            <Link to="/" className="flex items-center">
              {/* You can replace this with your actual logo */}
              <div className="flex items-center justify-center w-8 h-8 mr-2 bg-blue-600 rounded-md">
                <span className="text-sm font-bold text-white">SAT</span>
              </div>
              <span className="text-xl font-bold text-blue-600">SATHelp24x7</span>
            </Link>
          </div>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-gray-700 transition duration-150 rounded-md hover:bg-gray-100 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* User profile dropdown */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <button
                className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
              >
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-400" />
              </button>
              
              {/* Dropdown menu */}
              {isProfileOpen && (
                <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;