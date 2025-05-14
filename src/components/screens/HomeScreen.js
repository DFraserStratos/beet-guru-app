import React from 'react';
import { PlusCircle, Info, Clock, AlertCircle } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import CultivarInfoWidget from '../ui/CultivarInfoWidget';
import SeasonalTimeline from '../ui/SeasonalTimeline';

/**
 * Home screen component with dashboard widgets
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const HomeScreen = ({ onNavigate, isMobile = false, user = { name: 'John Doe' } }) => {
  const handleNewAssessment = () => {
    onNavigate('new-assessment');
  };

  const handleCompleteNow = () => {
    onNavigate('new-assessment');
  };

  const handleSchedule = () => {
    // Logic to schedule a reassessment
    console.log('Schedule reassessment');
  };

  const handleLearnMore = () => {
    // Logic to learn more about beet harvesting
    console.log('Learn more about harvesting');
  };

  return (
    <div className="space-y-6">
      {/* Welcome and Description */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, John Doe
        </h1>
        <p className="text-gray-600 mb-2">
          Beet Guru simplifies estimating beet dry matter yield by calculating an accurate average from fresh weight samples. It provides a clear, reliable yield range, making your farm planning more effective and data-driven.
        </p>
        <p className="text-gray-600">
          Easy-to-use and intuitive, Beet Guru securely stores your grower and paddock details directly within each assessment. At the end of the process, you'll receive a comprehensive and easy-to-read report via email, streamlining your record-keeping and decision-making.
        </p>
      </div>

      {/* New Assessment Button */}
      <button 
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        onClick={handleNewAssessment}
      >
        <PlusCircle size={20} className="mr-2" />
        New Assessment
      </button>

      {/* Reminders/Alerts Section */}
      <div>
        <div className="flex items-center p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg mb-2">
          <AlertCircle size={20} className="text-yellow-400 mr-3 flex-shrink-0" />
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-700">North Field assessment is due</span>
            <button 
              className="text-sm font-medium text-yellow-600 hover:text-yellow-800"
              onClick={handleCompleteNow}
            >
              Complete now
            </button>
          </div>
        </div>

        <div className="flex items-center p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg mb-2">
          <Clock size={20} className="text-blue-400 mr-3 flex-shrink-0" />
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-700">It's time to reassess West Paddock</span>
            <button 
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
              onClick={handleSchedule}
            >
              Schedule
            </button>
          </div>
        </div>

        <div className="flex items-center p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
          <Info size={20} className="text-blue-400 mr-3 flex-shrink-0" />
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-700">Beet harvesting season is approaching</span>
            <button 
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
              onClick={handleLearnMore}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Two column layout for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8/12 width) */}
        <div className="lg:col-span-8">
          {/* Seasonal Timeline */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-800 mb-4">Growing Season</h3>
            <SeasonalTimeline isSimplified={true} />
            <p className="text-sm text-gray-500 mt-2">Typical season for fodder beet in Canterbury, NZ</p>
          </div>
        </div>

        {/* Right Column (4/12 width) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Cultivar Info */}
          <CultivarInfoWidget isSimplified={true} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;