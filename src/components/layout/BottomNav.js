import {
  Home,
  BarChart3,
  FileText,
  MoreHorizontal,
  Users,
  Leaf
} from 'lucide-react';

const BottomNav = ({ activeScreen, handleNavigate, user }) => {
  // Check if user is a retailer
  const isRetailer = user?.accountType === 'retailer';
  // Check if user is an admin
  const isAdmin = user?.isAdmin === true;
  
  // Define screens that should highlight the More tab based on user type
  const moreScreens = isAdmin
    ? ['more', 'settings', 'about-us', 'terms']
    : isRetailer 
      ? ['more', 'settings', 'about-us', 'terms', 'cultivar-management', 'user-management', 'reports']
      : ['more', 'locations', 'settings', 'about-us', 'terms', 'cultivar-management', 'user-management'];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-4 h-16">
        {/* Admin-specific navigation */}
        {isAdmin ? (
          <>
            <NavItem
              icon={<Users size={20} />}
              label="Users"
              isActive={activeScreen === 'user-management'}
              onClick={() => handleNavigate('user-management')}
            />
            <NavItem
              icon={<Leaf size={20} />}
              label="Cultivars"
              isActive={activeScreen === 'cultivar-management'}
              onClick={() => handleNavigate('cultivar-management')}
            />
            <NavItem
              icon={<FileText size={20} />}
              label="Reports"
              isActive={activeScreen === 'reports'}
              onClick={() => handleNavigate('reports')}
            />
          </>
        ) : (
          <>
            <NavItem
              icon={<Home size={20} />}
              label="Home"
              isActive={activeScreen === 'home'}
              onClick={() => handleNavigate('home')}
            />
            
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Assessments"
              isActive={activeScreen === 'assessments'}
              onClick={() => handleNavigate('assessments')}
            />
            {/* Conditional navigation based on user type */}
            {isRetailer ? (
              <NavItem
                icon={<Users size={20} />}
                label="Customers"
                isActive={activeScreen === 'customers'}
                onClick={() => handleNavigate('customers')}
              />
            ) : (
              <NavItem
                icon={<FileText size={20} />}
                label="Reports"
                isActive={activeScreen === 'reports'}
                onClick={() => handleNavigate('reports')}
              />
            )}
          </>
        )}
        
        <NavItem
          icon={<MoreHorizontal size={20} />}
          label="More"
          isActive={moreScreens.includes(activeScreen)}
          onClick={() => handleNavigate('more')}
        />
      </div>
    </div>
  );
};

// Bottom Nav Item Component
const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        ${isActive ? 'text-green-600' : 'text-gray-500'}
      `}
      onClick={onClick}
    >
      <div className={isActive ? 'text-green-600' : ''}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default BottomNav;
