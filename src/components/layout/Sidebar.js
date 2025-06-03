import {
  Home,
  BarChart3,
  FileText,
  MapPin,
  Settings,
  LogOut,
  HelpCircle,
  Users
} from 'lucide-react';
import beetGuruSquareLogo from '../../BeetGuruSq.png';

const Sidebar = ({ activeScreen, handleNavigate, onLogout, user }) => {
  // Check if user is a retailer
  const isRetailer = user?.accountType === 'retailer';
  
  return (
    <div className="w-64 bg-green-800 text-white h-full flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-green-700">
        <div className="flex items-center">
          {/* App Logo */}
          <img 
            src={beetGuruSquareLogo} 
            alt="Beet Guru Logo" 
            className="h-10 w-10 mr-3 rounded-full" 
          />
          <span className="font-bold text-lg">Beet Guru</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Home" 
            isActive={activeScreen === 'home'} 
            onClick={() => handleNavigate('home')}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Assessments" 
            isActive={activeScreen === 'assessments'} 
            onClick={() => handleNavigate('assessments')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            isActive={activeScreen === 'reports'} 
            onClick={() => handleNavigate('reports')}
          />
          {/* Conditional navigation based on user type */}
          {isRetailer ? (
            <SidebarItem 
              icon={<Users size={20} />} 
              label="Customers" 
              isActive={activeScreen === 'customers'} 
              onClick={() => handleNavigate('customers')}
            />
          ) : (
            <SidebarItem 
              icon={<MapPin size={20} />} 
              label="Paddocks" 
              isActive={activeScreen === 'locations'} 
              onClick={() => handleNavigate('locations')}
            />
          )}
        </ul>
      </div>
      
      <div className="border-t border-green-700">
        {/* User Profile Card - now below the border */}
        <div className="p-4 pb-2">
          <div className="bg-green-700 rounded-xl p-4">
            <div>
              <h3 className="font-semibold text-sm text-white">{user?.name || 'John Doe'}</h3>
              <p className="text-green-100 text-xs mt-0.5">{user?.email || 'john.doe@example.com'}</p>
              <p className="text-green-200 text-xs mt-0.5">{user?.role || 'Farm Manager'}</p>
            </div>
          </div>
        </div>
        
        <div className="px-4 pt-2 pb-2">
          <ul className="space-y-2">
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={activeScreen === 'settings'} 
              onClick={() => handleNavigate('settings')}
            />
            <SidebarItem 
              icon={<HelpCircle size={20} />} 
              label="About Us" 
              isActive={activeScreen === 'about-us'} 
              onClick={() => handleNavigate('about-us')}
            />
            <SidebarItem 
              icon={<FileText size={20} />} 
              label="Terms & Conditions" 
              isActive={activeScreen === 'terms'} 
              onClick={() => handleNavigate('terms')}
            />
            <SidebarItem 
              icon={<LogOut size={20} />} 
              label="Log Out" 
              isActive={false} 
              onClick={onLogout}
            />
          </ul>
        </div>
        
        {/* App Version and Copyright on single line - tightened spacing */}
        <div className="text-center py-2">
          <p className="text-green-600 text-xs opacity-75">
            Beet Guru v1.0.0 • © 2025 Beet Guru Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isActive, onClick }) => {
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
      <span className="ml-3">{label}</span>
    </li>
  );
};

export default Sidebar;
