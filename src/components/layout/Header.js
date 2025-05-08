import { Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ activeScreen, toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <div className="bg-white border-b">
      {/* Mobile Search Expanded */}
      {showSearch ? (
        <div className="p-2 flex items-center">
          <button
            className="p-2"
            onClick={toggleSearch}
          >
            <X size={20} className="text-gray-500" />
          </button>
          <div className="flex-1 mx-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              autoFocus
            />
          </div>
        </div>
      ) : (
        // Regular Header
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="p-1 rounded-md hover:bg-gray-100 mr-3"
              onClick={toggleSidebar}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 truncate">
              {activeScreen === 'dashboard' && 'Dashboard'}
              {activeScreen === 'assessments' && 'Assessments'}
              {activeScreen === 'reports' && 'Reports'}
              {activeScreen === 'locations' && 'Locations'}
              {activeScreen === 'planning' && 'Planning'}
              {activeScreen === 'settings' && 'Settings'}
              {activeScreen === 'new-assessment' && 'New Assessment'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search icon for mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={toggleSearch}
            >
              <Search size={20} className="text-gray-500" />
            </button>
            
            {/* Desktop search bar - hidden on mobile */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center cursor-pointer">
              <User size={20} className="text-green-800" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
