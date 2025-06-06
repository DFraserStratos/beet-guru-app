/**
 * Stock Feed Calculator Screen
 * 
 * DRAFT FEATURE - This is an experimental feature that was developed as a concept exploration.
 * While it's not currently accessible through the main navigation, it contains valuable 
 * functionality and should be preserved for future development and potential reactivation.
 * 
 * The calculator provides functionality for estimating feed duration based on:
 * - Stock count
 * - Feed amount (tonnes)
 * - Dry matter percentage
 * 
 * TODO: Future enhancements could include:
 * - Integration with assessment data for more accurate calculations
 * - Multiple stock types and their specific feed requirements
 * - Seasonal feeding adjustments
 * - Integration with paddock management
 * - Historical feed usage tracking
 */

import { useState } from 'react';
import { Calculator, Save, AlertTriangle } from 'lucide-react';
import FeedForecastWidget from '../ui/FeedForecastWidget';
import { PrimaryButton } from '../ui/buttons';
import PageContainer from '../layout/PageContainer';

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
    <PageContainer>
      {/* Page Header Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-gray-800">Stock Feed Calculator</h1>
        </div>
        <p className="text-gray-600">
          Use this calculator to estimate how long your feed will last based on your stock count and feed amount.
          The calculator takes into account the dry matter percentage of your feed.
        </p>
      </div>
      
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <span className="font-medium">Work in Progress:</span> This Stock Feed Calculator is an early concept exploration and is still under development. Calculations are based on simplified models and should be verified with actual field measurements.
            </p>
          </div>
        </div>
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
          <PrimaryButton className="w-full" onClick={handleCalculate}>
            Calculate Feed Duration
          </PrimaryButton>
          
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
          <PrimaryButton
            className="w-full border border-primary bg-white text-primary hover:bg-primary-light"
          >
            <Save size={18} className="mr-2" />
            Save Calculation to Report
          </PrimaryButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default StockFeedScreen;
