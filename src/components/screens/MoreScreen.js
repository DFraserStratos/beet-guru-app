import { MapPin, Settings, LogOut, ChevronRight, Calculator, HelpCircle, FileText } from 'lucide-react';
import PageContainer from '../layout/PageContainer';
import { useAuth } from '../../context/AuthContext';

const MoreScreen = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  return (
    <PageContainer className="space-y-4">
      {/* User Profile Section */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-green-800 font-bold text-xl">{user?.initials || 'JD'}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user?.name || 'John Doe'}</h3>
            <p className="text-gray-600">{user?.email || 'john.doe@example.com'}</p>
            <p className="text-sm text-green-600 mt-1">{user?.role || 'Farm Manager'}</p>
          </div>
        </div>
      </div>
      
      {/* More Menu Options */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <ul className="divide-y divide-gray-100">
          <MenuItem 
            icon={<MapPin size={20} className="text-green-600" />}
            label="Locations"
            onClick={() => onNavigate('locations')}
          />
          <MenuItem 
            icon={<Calculator size={20} className="text-green-600" />}
            label="Stock Feed Calculator"
            onClick={() => onNavigate('stockfeed')}
          />
          <MenuItem 
            icon={<Settings size={20} className="text-gray-600" />}
            label="Settings"
            onClick={() => onNavigate('settings')}
          />
          <MenuItem 
            icon={<HelpCircle size={20} className="text-blue-600" />}
            label="About Us"
            onClick={() => onNavigate('about-us')}
          />
          <MenuItem 
            icon={<FileText size={20} className="text-blue-600" />}
            label="Terms & Conditions"
            onClick={() => onNavigate('terms')}
          />
          <MenuItem
            icon={<LogOut size={20} className="text-red-500" />}
            label="Log Out"
            onClick={logout}
            textColor="text-red-500"
          />
        </ul>
      </div>
      
      {/* App Info */}
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-gray-500 text-sm">Beet Guru v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">© 2025 Beet Guru Ltd.</p>
      </div>
    </PageContainer>
  );
};

const MenuItem = ({ icon, label, onClick, textColor = "text-gray-800" }) => {
  return (
    <li>
      <button 
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
        onClick={onClick}
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className={`font-medium ${textColor}`}>{label}</span>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
    </li>
  );
};

export default MoreScreen;
