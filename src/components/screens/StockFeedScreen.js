import React from 'react';

/**
 * Stock Feed screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StockFeedScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Stock Feed Calculator</h1>
        <p className="text-gray-600">Calculate feed requirements for your stock</p>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">This is a stub StockFeedScreen component.</p>
      </div>
    </div>
  );
};

export default StockFeedScreen;