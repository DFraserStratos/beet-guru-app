import React from 'react';
import { PlusCircle, Info, Clock, AlertCircle } from 'lucide-react';
import { logger } from '../../utils/logger';
import WeatherWidget from '../ui/WeatherWidget';
import CultivarInfoWidget from '../ui/CultivarInfoWidget';
import SeasonalTimeline from '../ui/SeasonalTimeline';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import Card from '../ui/Card';
import PageContainer from '../layout/PageContainer';

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
    logger.info('Schedule reassessment');
  };

  const handleLearnMore = () => {
    // Logic to learn more about beet harvesting
    logger.info('Learn more about harvesting');
  };

  const headerSubtitle = (
    <>
      <p className="mb-2">
        Beet Guru simplifies estimating beet dry matter yield by calculating an accurate average from fresh weight samples. It provides a clear, reliable yield range, making your farm planning more effective and data-driven.
      </p>
      <p>
        Easy-to-use and intuitive, Beet Guru securely stores your grower and paddock details directly within each assessment. At the end of the process, you'll receive a comprehensive and easy-to-read report via email, streamlining your record-keeping and decision-making.
      </p>
    </>
  );

  return (
    <PageContainer>
      {/* Header Card */}
      <PageHeader
        title={`Welcome, ${user.name}`}
        subtitle={headerSubtitle}
        actions={(
          <FormButton variant="primary" icon={<PlusCircle size={16} />} onClick={handleNewAssessment}>

            {isMobile ? 'New' : 'New Assessment'}
          </FormButton>
        )}
      />

      {/* Mobile Layout (stacked) */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {/* Action Items Card */}
        <Card>
          <h3 className="font-medium text-gray-800 mb-4">Action Items</h3>
          <div className="space-y-3">
            <div className="flex items-center p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
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

            <div className="flex items-center p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
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
        </Card>

        {/* Weather Widget - Mobile Version */}
        <WeatherWidget isMobile={true} />

        {/* Growing Season Card - Simple Mobile Version */}
        <Card>
          <h3 className="font-medium text-gray-800 mb-4">Growing Season</h3>
          <SeasonalTimeline isSimplified={true} />
          <p className="text-sm text-gray-500 mt-2">Typical season for fodder beet in Canterbury, NZ</p>
        </Card>

        {/* Cultivar Info - Mobile Version */}
        <CultivarInfoWidget isSimplified={true} />
      </div>

      {/* Desktop Layout (2x2 grid) - Only visible on md and up */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Top Row */}
          <div className="col-span-8">
            {/* Action Items */}
            <Card className="h-full">
              <h3 className="font-medium text-gray-800 mb-4">Action Items</h3>
              <div className="space-y-3">
                <div className="flex items-center p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
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

                <div className="flex items-center p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
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
            </Card>
          </div>
          <div className="col-span-4">
            {/* Weather Widget */}
            <div className="h-full">
              <WeatherWidget />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Bottom Row */}
          <div className="col-span-8">
            {/* Growing Season */}
            <Card className="h-full">
              <h3 className="font-medium text-gray-800 mb-4">Growing Season</h3>
              
              {/* Seasonal timeline */}
              <div>
                <SeasonalTimeline isSimplified={true} />
              </div>
              
              <p className="text-sm text-gray-500 mt-2">Typical season for fodder beet in Canterbury, NZ</p>
              
              {/* Additional information visible only on desktop */}
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Seasonal Notes</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">Planting</span>
                    <span>October - December: Optimal planting time when soil temperatures reach 10°C</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">Growing</span>
                    <span>December - May: Approximately 24-28 weeks to reach maturity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">Harvesting</span>
                    <span>May - September: Harvest when needed, fodder beet can be stored in the ground</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
          <div className="col-span-4">
            {/* Cultivar Info */}
            <div className="h-full">
              <CultivarInfoWidget isSimplified={true} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomeScreen;
