import React from 'react';
import { PlusCircle } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import CultivarInfoWidget from '../ui/CultivarInfoWidget';
import SeasonalTimeline from '../ui/SeasonalTimeline';
import ReminderWidget from '../ui/ReminderWidget';
import RecentAssessmentCard from '../ui/RecentAssessmentCard';
import { FormButton } from '../ui/form';

/**
 * Home screen component with dashboard widgets
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const HomeScreen = ({ onNavigate, isMobile = false, user = { name: 'John Doe' } }) => {
  const handleNewAssessment = () => {
    onNavigate('new-assessment');
  };

  // Get most recent assessment (would come from API in real app)
  const recentAssessment = {
    id: '1',
    title: 'North Paddock Assessment',
    date: '2025-05-08',
    location: 'North Paddock',
    dryMatter: '21.8%',
    estimatedYield: '22.4 t/ha'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">
            Beet Guru helps you measure, manage, and maximize your fodder beet crops
          </p>
        </div>

        {/* New Assessment Button */}
        <FormButton
          variant="primary"
          size="lg"
          icon={<PlusCircle size={18} />}
          onClick={handleNewAssessment}
          fullWidth={isMobile}
        >
          New Assessment
        </FormButton>
      </div>

      {/* Mobile View */}
      {isMobile && (
        <div className="space-y-6">
          {/* Reminders */}
          <ReminderWidget />

          {/* Weather Widget */}
          <WeatherWidget />

          {/* Seasonal Timeline */}
          <SeasonalTimeline />

          {/* Cultivar Info */}
          <CultivarInfoWidget />
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reminders */}
            <ReminderWidget />

            {/* Recent Assessment (Desktop Only) */}
            <RecentAssessmentCard assessment={recentAssessment} onViewReport={() => onNavigate('reports')} />

            {/* Seasonal Timeline */}
            <SeasonalTimeline />
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Cultivar Info */}
            <CultivarInfoWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;