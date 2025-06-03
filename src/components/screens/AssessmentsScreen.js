import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import PaddockCard from '../ui/PaddockCard';
import PaddockCardSkeleton from '../ui/PaddockCardSkeleton';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import PageContainer from '../layout/PageContainer';


/**
 * Screen for displaying and managing assessments
 * @param {Object} props - Component props 
 * @returns {JSX.Element} Rendered component
 */
const AssessmentsScreen = ({ 
  onNavigate, 
  isMobile,
  onStartAssessment = () => {},
  onContinueDraft = () => {},
  user
}) => {
  // Use the API hook to fetch locations with their status
  // For farmers, filter by user ID; for retailers, show all
  const { 
    data: paddocks, 
    loading, 
    error, 
    execute: fetchPaddocks 
  } = useApi(api.references.getLocations, [true, user?.accountType === 'farmer' ? user.id : null]);

  useEffect(() => {
    // Pass user filtering parameter based on account type
    const userId = user?.accountType === 'farmer' ? user.id : null;
    fetchPaddocks(true, userId);
  }, [fetchPaddocks, user]);

  // Handle starting a new assessment for a location
  const handleStartAssessment = (location) => {
    onStartAssessment(location);
    onNavigate('new-assessment');
  };

  // Handle continuing a draft assessment
  const handleContinueDraft = (location) => {
    const draftAssessment = location.draftAssessment || null;
    onContinueDraft(location, draftAssessment);
    onNavigate('new-assessment');
  };

  // Handle clicking the New Assessment button (no pre-selected location)
  const handleNewAssessment = () => {
    onStartAssessment(null);
    onNavigate('new-assessment');
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <PageHeader
        title="Assessments"
        subtitle="Continue draft assessments for your locations"
        actions={(
          <FormButton
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleNewAssessment}
          >
            {isMobile ? 'New' : 'New Assessment'}
          </FormButton>
        )}
      />
      
      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {[...Array(3)].map((_, index) => (
              <PaddockCardSkeleton key={index} />
            ))}
          </ul>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading paddocks: {error.message}</p>
        </div>
      )}
      
      {/* Locations List */}
      {!loading && !error && paddocks && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Filter locations to only show drafts */}
          {paddocks.filter(paddock => paddock.status === 'draft').length === 0 ? (
            <div className="p-8 text-center">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No draft assessments found</h3>
              <p className="text-gray-500 mb-6">
                Start a new assessment to begin tracking your crop performance
              </p>
              <FormButton 
                variant="primary" 
                icon={<PlusCircle size={16} />}
                onClick={handleNewAssessment}
              >
                New Assessment
              </FormButton>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {paddocks.filter(paddock => paddock.status === 'draft').map((paddock) => (
                <li key={paddock.id} className="hover:bg-gray-50">
                  <PaddockCard 
                    paddock={paddock}
                    status={paddock.status}
                    onStart={handleStartAssessment}
                    onContinue={handleContinueDraft}
                    className="border-none shadow-none"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default AssessmentsScreen;
