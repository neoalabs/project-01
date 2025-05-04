import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50">
      {/* Main layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        {/* Sidebar component - hidden on mobile unless toggled */}
        <div className="md:block">
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col min-h-screen">
          {/* Navbar component */}
          <Navbar 
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          
          {/* Page content */}
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="container mx-auto">
              {/* Router outlet for page content */}
              <Outlet />
            </div>
          </main>
          
          {/* Optional footer */}
          <footer className="py-4 bg-white border-t border-gray-200">
            <div className="container px-4 mx-auto">
              <p className="text-sm text-center text-gray-500">
                © 2025 SATHelp24x7. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Layout;