import { Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ activeScreen, toggleSidebar, isMobile }) => {
  const [showSearch, setShowSearch] = useState(false);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <div className={`${isMobile ? 'bg-green-800 text-white' : 'bg-white text-gray-800'} border-b ${isMobile ? 'border-green-700' : 'border-gray-200'}`}>
      {/* Mobile Search Expanded */}
      {showSearch ? (
        <div className="p-2 flex items-center">
          <button
            className="p-2"
            onClick={toggleSearch}
          >
            <X size={20} className={isMobile ? 'text-white' : 'text-gray-500'} />
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
            {/* Show menu button only on mobile */}
            {isMobile && (
              <button
                className="p-1 rounded-md hover:bg-green-700 mr-3"
                onClick={toggleSidebar}
              >
                <Menu size={20} className="text-white" />
              </button>
            )}
            
            {/* Logo - Always visible */}
            <div className="flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                <div className="text-green-800 font-bold text-xl">B</div>
              </div>
              <span className="font-bold text-lg">Beet Guru</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search icon for mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-green-700"
              onClick={toggleSearch}
            >
              <Search size={20} className="text-white" />
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
            
            <div className={`w-10 h-10 ${isMobile ? 'bg-green-700' : 'bg-green-100'} rounded-full flex items-center justify-center cursor-pointer`}>
              <User size={20} className={isMobile ? 'text-white' : 'text-green-800'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
