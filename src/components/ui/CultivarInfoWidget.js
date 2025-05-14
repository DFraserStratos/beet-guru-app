import { useState } from 'react';
import { Info } from 'lucide-react';

const CultivarInfoWidget = ({ isSimplified = false }) => {
  const [selectedCultivar, setSelectedCultivar] = useState('Brigadier');
  
  // Common beet cultivar information for Canterbury, NZ
  const cultivars = {
    'Brigadier': {
      type: 'Fodder Beet',
      dryMatter: '12-15%',
      yield: '20-30 t/acre',
      growingTime: '24-28 weeks',
      description: "Low dry matter content, high sugar content. Suitable for all stock types. World's number one for strip grazing.",
    },
    'Feldherr': {
      type: 'Fodder Beet',
      dryMatter: '12-15%',
      yield: '20-30 t/acre',
      growingTime: '24-28 weeks',
      description: "Monogerm hybrid with light orange bulb color. Low bulb dry matter percentage, preferred by some farmers for grazing.",
    },
    'Robbos': {
      type: 'Fodder Beet',
      dryMatter: '16-18%',
      yield: '18-25 t/acre',
      growingTime: '24-28 weeks',
      description: "Medium dry matter content, can be grazed or lifted. Versatile and reliable cultivar.",
    },
    'Bangor': {
      type: 'Fodder Beet',
      dryMatter: '16-18%',
      yield: '18-25 t/acre',
      growingTime: '24-28 weeks',
      description: "Uniform fodder beet with a medium-bulb dry matter percentage. High yield potential.",
    },
  };
  
  const handleCultivarChange = (e) => {
    setSelectedCultivar(e.target.value);
  };
  
  const selectedInfo = cultivars[selectedCultivar];
  
  return (
    <div className="bg-white rounded-lg shadow h-full">
      <div className="flex items-center p-4 border-b">
        <Info size={18} className="text-green-600 mr-2" />
        <h3 className="font-medium text-gray-800">Cultivar Information</h3>
      </div>
      
      <div className="px-4 pb-4 pt-2">
        <div className="mb-3">
          <label htmlFor="cultivar-select" className="block text-sm text-gray-500 mb-1">
            Select Cultivar
          </label>
          <select
            id="cultivar-select"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
            value={selectedCultivar}
            onChange={handleCultivarChange}
          >
            {Object.keys(cultivars).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="block text-xs text-gray-500">Type</span>
            <span className="font-medium text-sm">{selectedInfo.type}</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="block text-xs text-gray-500">Dry Matter</span>
            <span className="font-medium text-sm">{selectedInfo.dryMatter}</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="block text-xs text-gray-500">Avg. Yield</span>
            <span className="font-medium text-sm">{selectedInfo.yield}</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="block text-xs text-gray-500">Growing Time</span>
            <span className="font-medium text-sm">{selectedInfo.growingTime}</span>
          </div>
        </div>
        
        {!isSimplified && (
          <div className="text-sm text-gray-600">
            {selectedInfo.description}
          </div>
        )}
        
        {isSimplified && (
          <div className="text-sm text-gray-600 truncate">
            {selectedInfo.description.length > 70 
              ? selectedInfo.description.substring(0, 70) + '...' 
              : selectedInfo.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default CultivarInfoWidget;