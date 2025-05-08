import { Menu, Search, User } from 'lucide-react';

const Header = ({ activeScreen, toggleSidebar }) => {
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="p-1 rounded-md hover:bg-gray-100 mr-3"
          onClick={toggleSidebar}
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {activeScreen === 'dashboard' && 'Dashboard'}
          {activeScreen === 'assessments' && 'Assessments'}
          {activeScreen === 'reports' && 'Reports'}
          {activeScreen === 'locations' && 'Locations'}
          {activeScreen === 'planning' && 'Planning'}
          {activeScreen === 'settings' && 'Settings'}
          {activeScreen === 'new-assessment' && 'New Assessment'}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
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
  );
};

export default Header;
