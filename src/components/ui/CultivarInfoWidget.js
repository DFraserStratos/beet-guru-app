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
  
  if (isSimplified) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center p-4 border-b">
          <Info size={18} className="text-green-600 mr-2" />
          <h3 className="font-medium">Cultivar Information</h3>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">
              Select Cultivar
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 px-3 border"
              value={selectedCultivar}
              onChange={handleCultivarChange}
            >
              {Object.keys(cultivars).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-medium">Fodder Beet</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Dry Matter</div>
              <div className="font-medium">12-15%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Avg. Yield</div>
              <div className="font-medium">20-30 t/acre</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Growing Time</div>
              <div className="font-medium">24-28 weeks</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-700">
            Low dry matter content, high sugar content. Suitable for all stock types. World's number one for strip grazing.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="flex items-center p-4">
        <Info size={18} className="text-green-600 mr-2" />
        <h3 className="font-medium">Cultivar Information</h3>
      </div>
      
      <div className="px-4 pb-4">
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
        
        <div className="text-sm text-gray-600">
          {selectedInfo.description}
        </div>
      </div>
    </div>
  );
};

export default CultivarInfoWidget;