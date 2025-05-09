import { useState } from 'react';
import { Calculator, Save } from 'lucide-react';
import FeedForecastWidget from '../ui/FeedForecastWidget';

const StockFeedScreen = ({ isMobile }) => {
  const [stockCount, setStockCount] = useState(50);
  const [feedAmount, setFeedAmount] = useState(20);
  const [dryMatterPercent, setDryMatterPercent] = useState(22);
  const [calculatedDays, setCalculatedDays] = useState(186);
  
  const handleCalculate = () => {
    // Simple mock calculation - in reality this would be more complex
    // This is just a placeholder to simulate a calculation
    const days = Math.round((feedAmount * dryMatterPercent) / (stockCount * 0.12));
    setCalculatedDays(days);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Stock Feed Calculator</h1>
      
      {/* Instructions */}
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Use this calculator to estimate how long your feed will last based on your stock count and feed amount.
          The calculator takes into account the dry matter percentage of your feed.
        </p>
      </div>
      
      {/* Feed Forecast Widget - Moved from Home Screen */}
      <FeedForecastWidget />
      
      {/* Calculator Form */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-green-600 text-white px-4 py-3 flex items-center">
          <Calculator size={20} className="mr-2" />
          <h3 className="font-medium">Feed Calculator</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Stock Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Stock
            </label>
            <input
              type="number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
              placeholder="Enter stock count"
              value={stockCount}
              onChange={(e) => setStockCount(parseInt(e.target.value) || 0)}
            />
            <p className="mt-1 text-xs text-gray-500">The number of animals that need to be fed</p>
          </div>
          
          {/* Feed Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Feed Amount (tonnes)
            </label>
            <input
              type="number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
              placeholder="Enter total feed in tonnes"
              value={feedAmount}
              onChange={(e) => setFeedAmount(parseFloat(e.target.value) || 0)}
            />
            <p className="mt-1 text-xs text-gray-500">The total amount of feed available</p>
          </div>
          
          {/* Dry Matter Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dry Matter Percentage (%)
            </label>
            <input
              type="number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
              placeholder="Enter dry matter percentage"
              value={dryMatterPercent}
              onChange={(e) => setDryMatterPercent(parseFloat(e.target.value) || 0)}
            />
            <p className="mt-1 text-xs text-gray-500">The dry matter content of your feed</p>
          </div>
          
          {/* Calculate Button */}
          <button
            className="w-full bg-green-600 text-white p-3 rounded-lg flex justify-center items-center shadow-md hover:bg-green-700 transition-colors"
            onClick={handleCalculate}
          >
            Calculate Feed Duration
          </button>
          
          {/* Results */}
          <div className="bg-green-50 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Results:</h4>
            <p className="text-gray-800">
              Based on your inputs, your feed will last approximately:
            </p>
            <p className="text-3xl font-bold text-green-600 text-center py-3">
              {calculatedDays} days
            </p>
            <p className="text-sm text-gray-600 text-center">
              This is based on an estimated daily intake of 12% of body weight in dry matter
            </p>
          </div>
          
          {/* Save Button */}
          <button
            className="w-full border border-green-600 text-green-600 p-3 rounded-lg flex justify-center items-center hover:bg-green-50 transition-colors"
          >
            <Save size={18} className="mr-2" />
            Save Calculation to Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockFeedScreen;