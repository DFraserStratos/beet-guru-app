import beetGuruSquareLogo from '../../BeetGuruSq.png';

const Header = ({ activeScreen, customerSelector = null }) => {
  return (
    <div className="bg-green-800 text-white">
      {/* Main header bar */}
      <div className="border-b border-green-700">
        <div className="p-4 flex items-center">
          {/* Logo and app name - left aligned */}
          <div className="flex items-center">
            <img 
              src={beetGuruSquareLogo} 
              alt="Beet Guru Logo" 
              className="h-10 w-10 mr-3 rounded-full" 
            />
            <span className="font-bold text-lg">Beet Guru</span>
          </div>
        </div>
      </div>
      
      {/* Customer selector area for mobile - seamlessly integrated */}
      {customerSelector && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3">
            {customerSelector}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
