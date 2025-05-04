import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  ClipboardDocumentCheckIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  CalculatorIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  // Sidebar navigation items with icons
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Lessons', icon: BookOpenIcon, path: '/lessons' },
    { name: 'Chatbot', icon: ChatBubbleLeftRightIcon, path: '/chatbot' },
    { name: 'Test Center', icon: ClipboardDocumentCheckIcon, path: '/test-center' },
    { name: 'Forum', icon: UserGroupIcon, path: '/forum' },
    { name: 'Calendar', icon: CalendarIcon, path: '/calendar' },
    { name: 'Score Calculator', icon: CalculatorIcon, path: '/calculator' },
    { name: 'My Profile', icon: UserCircleIcon, path: '/profile' }
  ];

  // Check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform shadow-lg transition-transform duration-300 ease-in-out md:relative md:shadow-none md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hidden md:block md:static`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header - visible on mobile only */}
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600 md:hidden">
          <span className="text-xl font-bold text-white">SATHelp24x7</span>
        </div>
        
        {/* Navigation items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`flex-shrink-0 w-6 h-6 mr-3 ${
                    isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">SAT</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">SATHelp24x7</p>
              <p className="text-xs text-gray-500">© 2025</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;