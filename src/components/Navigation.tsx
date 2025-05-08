
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">SO</span>
              </div>
            </Link>
            <span className="ml-3 text-xl font-semibold text-gray-900">Script Orchestrator</span>
          </div>
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActivePath('/') 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Home
            </Link>
            <Link 
              to="/scripts" 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActivePath('/scripts') || location.pathname.startsWith('/scripts') 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Script Runner
            </Link>
            <Link 
              to="/page3" 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActivePath('/page3') 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Page 3
            </Link>
            <Link 
              to="/page4" 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActivePath('/page4') 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Page 4
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
