import { Calendar, MapPin, Sprout, Calendar as CalendarIcon } from 'lucide-react';

/**
 * Header section showing report metadata
 */
const ReportMetadata = ({ data, formatDate }) => (
  <div className="p-6 border-b border-gray-100">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.reportTitle}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex items-center text-gray-600">
        <Calendar size={18} className="mr-2 text-green-600" />
        <span>Report Date: {formatDate(data.reportCreated)}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin size={18} className="mr-2 text-green-600" />
        <span>Location: {data.location}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Sprout size={18} className="mr-2 text-green-600" />
        <span>Cultivar: {data.reportCultivar}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <CalendarIcon size={18} className="mr-2 text-green-600" />
        <span>Season: {data.reportSeason}</span>
      </div>
    </div>
  </div>
);

export default ReportMetadata;
