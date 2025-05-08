import {
  Home,
  BarChart3,
  FileText,
  MapPin,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeScreen, handleNavigate, isSidebarOpen }) => {
  return (
    <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white h-full flex flex-col transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between border-b border-green-700">
        <div className="flex items-center">
          {/* App Logo */}
          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
            <div className="text-green-800 font-bold text-xl">B</div>
          </div>
          {isSidebarOpen && <span className="font-bold text-lg">Beet Guru</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            isActive={activeScreen === 'dashboard'} 
            onClick={() => handleNavigate('dashboard')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Assessments" 
            isActive={activeScreen === 'assessments'} 
            onClick={() => handleNavigate('assessments')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            isActive={activeScreen === 'reports'} 
            onClick={() => handleNavigate('reports')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<MapPin size={20} />} 
            label="Locations" 
            isActive={activeScreen === 'locations'} 
            onClick={() => handleNavigate('locations')}
            isSidebarOpen={isSidebarOpen}
          />
        </ul>
      </div>
      
      <div className="p-4 border-t border-green-700">
        <ul className="space-y-2">
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            isActive={activeScreen === 'settings'} 
            onClick={() => handleNavigate('settings')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Log Out" 
            isActive={false} 
            onClick={() => console.log('Log out')}
            isSidebarOpen={isSidebarOpen}
          />
        </ul>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isActive, onClick, isSidebarOpen }) => {
  return (
    <li 
      className={`
        flex items-center p-2 rounded-lg cursor-pointer
        ${isActive ? 'bg-green-700' : 'hover:bg-green-700'}
        transition-colors duration-200
      `}
      onClick={onClick}
    >
      <div className="text-white">{icon}</div>
      {isSidebarOpen && <span className="ml-3">{label}</span>}
    </li>
  );
};

export default Sidebar;
