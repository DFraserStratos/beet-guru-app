import React from 'react';

/**
 * Settings screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const SettingsScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Settings</h1>
        <p className="text-gray-600">Customize your app preferences</p>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">This is a stub SettingsScreen component.</p>
      </div>
    </div>
  );
};

export default SettingsScreen;