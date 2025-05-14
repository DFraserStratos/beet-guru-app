import React from 'react';

/**
 * More options screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MoreScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">More Options</h1>
        <p className="text-gray-600">Additional features and settings</p>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <button 
          className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => onNavigate('settings')}
        >
          <span className="font-medium">Settings</span>
        </button>
        
        <button 
          className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => onNavigate('locations')}
        >
          <span className="font-medium">Locations</span>
        </button>
        
        <button 
          className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => onNavigate('stock-feed')}
        >
          <span className="font-medium">Stock Feed Calculator</span>
        </button>
      </div>
    </div>
  );
};

export default MoreScreen;