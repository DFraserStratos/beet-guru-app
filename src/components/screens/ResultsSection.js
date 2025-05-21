import { Check, Calendar } from 'lucide-react';

/**
 * Results section with yield and feeding capacity boxes and visualization
 */
const ResultsSection = ({ data }) => (
  <div className="p-6 bg-green-50 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <Check size={14} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Yield Estimate</h3>
        </div>
        <div className="text-4xl font-bold text-green-600 mb-2">{data.estimatedYield}</div>
        <p className="text-gray-600 mb-1">Total: {data.totalYield}</p>
        <p className="text-xs text-gray-400">Based on 3.5 ha field</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <Calendar size={14} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Feeding Capacity</h3>
        </div>
        <div className="text-4xl font-bold text-green-600 mb-2">{data.feedingCapacity}</div>
        <p className="text-gray-600 mb-1">For {data.stockCount} animals</p>
        <p className="text-xs text-gray-400">Based on 8kg DM/animal/day</p>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Yield Visualization</h3>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="h-64 flex items-center justify-center">
          <div className="flex space-x-12 items-end h-full w-full max-w-md">
            {data.yieldBreakdown ? (
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-green-200 w-20 rounded-t" style={{ height: '30%' }}></div>
                  <p className="mt-2 text-sm font-medium">Leaf</p>
                  <p className="text-xs text-gray-500">{data.yieldBreakdown.leafYield}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 w-20 rounded-t" style={{ height: '70%' }}></div>
                  <p className="mt-2 text-sm font-medium">Bulb</p>
                  <p className="text-xs text-gray-500">{data.yieldBreakdown.bulbYield}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-700 w-20 rounded-t" style={{ height: '100%' }}></div>
                  <p className="mt-2 text-sm font-medium">Total</p>
                  <p className="text-xs text-gray-500">{data.yieldBreakdown.totalYield}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-green-200 w-20 rounded-t" style={{ height: '30%' }}></div>
                  <p className="mt-2 text-sm font-medium">Leaf</p>
                  <p className="text-xs text-gray-500">6.7 t/ha</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 w-20 rounded-t" style={{ height: '70%' }}></div>
                  <p className="mt-2 text-sm font-medium">Bulb</p>
                  <p className="text-xs text-gray-500">15.7 t/ha</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-700 w-20 rounded-t" style={{ height: '100%' }}></div>
                  <p className="mt-2 text-sm font-medium">Total</p>
                  <p className="text-xs text-gray-500">{data.estimatedYield}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ResultsSection;
