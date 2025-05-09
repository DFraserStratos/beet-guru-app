import { X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ activeScreen }) => {
  return (
    <div className="bg-green-800 text-white border-b border-green-700">
      <div className="p-4 flex items-center justify-center">
        {/* Logo and app name - centered */}
        <div className="flex items-center">
          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
            <div className="text-green-800 font-bold text-xl">B</div>
          </div>
          <span className="font-bold text-lg">Beet Guru</span>
        </div>
      </div>
    </div>
  );
};

export default Header;