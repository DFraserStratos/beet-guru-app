import { useState } from 'react';
import { 
  Home,
  BarChart3,
  FileText,
  MoreHorizontal,
  Settings,
  MapPin,
  LogOut,
  X
} from 'lucide-react';

const MobileNavigation = ({ activeScreen, handleNavigate, onLogout }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleItemClick = (screen) => {
    handleNavigate(screen);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-4 h-16">
          <NavItem 
            icon={<Home size={24} />} 
            label="Home" 
            isActive={activeScreen === 'dashboard'} 
            onClick={() => handleItemClick('dashboard')}
          />
          <NavItem 
            icon={<BarChart3 size={24} />} 
            label="Assessments" 
            isActive={activeScreen === 'assessments'} 
            onClick={() => handleItemClick('assessments')}
          />
          <NavItem 
            icon={<FileText size={24} />} 
            label="Reports" 
            isActive={activeScreen === 'reports'} 
            onClick={() => handleItemClick('reports')}
          />
          <NavItem 
            icon={<MoreHorizontal size={24} />} 
            label="More" 
            isActive={isMoreMenuOpen} 
            onClick={toggleMoreMenu}
          />
        </div>
      </div>

      {/* More Menu Overlay */}
      {isMoreMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50">
          <div className="absolute bottom-16 inset-x-0 bg-white rounded-t-xl shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">More Options</h3>
              <button 
                onClick={toggleMoreMenu}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-1">
              <MoreMenuItem 
                icon={<MapPin size={20} />} 
                label="Locations" 
                onClick={() => handleItemClick('locations')}
              />
              <MoreMenuItem 
                icon={<Settings size={20} />} 
                label="Settings" 
                onClick={() => handleItemClick('settings')}
              />
              <MoreMenuItem 
                icon={<LogOut size={20} />} 
                label="Log Out" 
                onClick={onLogout}
                className="text-red-600"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center space-y-1 ${
        isActive ? 'text-green-600' : 'text-gray-600'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
};

const MoreMenuItem = ({ icon, label, onClick, className = '' }) => {
  return (
    <button 
      className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-100 ${className}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default MobileNavigation;
