import { PlusCircle } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import SeasonalTimeline from '../ui/SeasonalTimeline';
import FeedForecastWidget from '../ui/FeedForecastWidget';
import CultivarInfoWidget from '../ui/CultivarInfoWidget';
import ReminderWidget from '../ui/ReminderWidget';

const HomeScreen = ({ onNavigate, isMobile, user = { name: 'John' } }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          Beet Guru simplifies estimating beet dry matter yield by calculating an accurate average from fresh weight samples. It provides a clear, reliable yield range, making your farm planning more effective and data-driven.
        </p>
        <p className="text-gray-600 mt-2">
          Easy-to-use and intuitive, Beet Guru securely stores your grower and paddock details directly within each assessment. At the end of the process, you'll receive a comprehensive and easy-to-read report via email, streamlining your record-keeping and decision-making.
        </p>
      </div>
      
      {/* New Assessment Button - Prominent at the top */}
      <button 
        className="w-full bg-green-600 text-white p-4 rounded-lg flex justify-center items-center shadow-md hover:bg-green-700 transition-colors"
        onClick={() => onNavigate('new-assessment')}
      >
        <PlusCircle size={24} className="mr-2" />
        <span className="font-medium text-lg">New Assessment</span>
      </button>
      
      {/* Main Content Area - Different layout for mobile vs desktop */}
      {isMobile ? (
        // Mobile Layout - Single column stack with updated order
        <div className="space-y-6">
          {/* Reminders */}
          <ReminderWidget onNavigate={onNavigate} />
          
          {/* Oxford Weather Widget */}
          <WeatherWidget isMobile={true} />
          
          {/* Seasonal Timeline */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Growing Season</h2>
            <SeasonalTimeline />
          </div>
          
          {/* Cultivar Info */}
          <CultivarInfoWidget />
        </div>
      ) : (
        // Desktop Layout - Two column grid for larger screens
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="col-span-2 space-y-6">
            {/* Reminders */}
            <ReminderWidget onNavigate={onNavigate} />
            
            {/* Growing Season Timeline */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Growing Season</h2>
              <SeasonalTimeline />
            </div>
            
            {/* Feed Forecast Widget - Added to fill space */}
            <FeedForecastWidget />
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget isMobile={false} />
            
            {/* Cultivar Info Widget */}
            <CultivarInfoWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;