import { Droplets } from 'lucide-react';

/**
 * Crop information section
 */
const CropInfo = ({ data, formatDate }) => (
  <div className="p-6 border-b md:border-r border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Information</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Crop Type</h3>
        <p className="text-gray-800">{data.cropType}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Cultivar</h3>
        <p className="text-gray-800">{data.reportCultivar}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Sowing Date</h3>
        <p className="text-gray-800">{formatDate(data.date)}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Assessment Date</h3>
        <p className="text-gray-800">{formatDate(data.date)}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Water Type</h3>
        <div className="flex items-center">
          <Droplets size={16} className="mr-1 text-blue-500" />
          <span className="capitalize">{data.waterType}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Est. Growing Cost</h3>
        <p className="text-gray-800">$2500/ha</p>
      </div>
    </div>
  </div>
);

export default CropInfo;
