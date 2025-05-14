import React from 'react';

/**
 * Home screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Home</h1>
        <p className="text-gray-600">Welcome to Beet Guru</p>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">This is a stub HomeScreen component.</p>
      </div>
    </div>
  );
};

export default HomeScreen;