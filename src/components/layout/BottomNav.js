import {
  Home,
  BarChart3,
  FileText,
  PlusCircle
} from 'lucide-react';

const BottomNav = ({ activeScreen, handleNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-4 h-16">
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          isActive={activeScreen === 'dashboard'}
          onClick={() => handleNavigate('dashboard')}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          label="Assessments"
          isActive={activeScreen === 'assessments'}
          onClick={() => handleNavigate('assessments')}
        />
        <NavItem
          icon={<FileText size={20} />}
          label="Reports"
          isActive={activeScreen === 'reports'}
          onClick={() => handleNavigate('reports')}
        />
        <NavItem
          icon={<PlusCircle size={20} />}
          label="New"
          isActive={activeScreen === 'new-assessment'}
          onClick={() => handleNavigate('new-assessment')}
          highlight
        />
      </div>
    </div>
  );
};

// Bottom Nav Item Component
const NavItem = ({ icon, label, isActive, onClick, highlight = false }) => {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        ${isActive ? 'text-green-600' : 'text-gray-500'}
        ${highlight ? 'bg-green-50' : ''}
      `}
      onClick={onClick}
    >
      <div className={highlight && isActive ? 'text-white bg-green-600 p-1.5 rounded-full' : ''}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default BottomNav;
