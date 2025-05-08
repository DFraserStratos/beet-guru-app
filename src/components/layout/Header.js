import { Search, User, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ activeScreen }) => {
  const [showSearch, setShowSearch] = useState(false);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <div className="bg-green-800 text-white border-b border-green-700">
      {/* Mobile Search Expanded */}
      {showSearch ? (
        <div className="p-2 flex items-center">
          <button
            className="p-2"
            onClick={toggleSearch}
          >
            <X size={20} className="text-white" />
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
          {/* Logo and app name */}
          <div className="flex items-center">
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
              <div className="text-green-800 font-bold text-xl">B</div>
            </div>
            <span className="font-bold text-lg">Beet Guru</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <button
              className="p-2 rounded-full hover:bg-green-700"
              onClick={toggleSearch}
            >
              <Search size={20} className="text-white" />
            </button>
            
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center cursor-pointer">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;