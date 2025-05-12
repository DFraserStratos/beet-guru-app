import { X } from 'lucide-react';
import { useState } from 'react';
import beetGuruSquareLogo from '../../BeetGuruSq.png';

const Header = ({ activeScreen }) => {
  return (
    <div className="bg-green-800 text-white border-b border-green-700">
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
  );
};

export default Header;