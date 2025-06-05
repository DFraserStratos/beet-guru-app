import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import PaddockCard from '../ui/PaddockCard';
import PaddockCardSkeleton from '../ui/PaddockCardSkeleton';
import CustomerSelector from '../ui/CustomerSelector';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { useCustomer } from '../../contexts/CustomerContext';
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
  const { selectedCustomer, requireCustomerSelection } = useCustomer();
  
  // For retailers and admins, require customer selection; for farmers, don't
  useEffect(() => {
    if (user?.accountType === 'retailer' || user?.isAdmin) {
      requireCustomerSelection(true);
    } else {
      requireCustomerSelection(false);
    }
  }, [user?.accountType, user?.isAdmin, requireCustomerSelection]);

  // Determine which user ID to use for filtering
  const getUserIdForFiltering = () => {
    if (user?.accountType === 'farmer') {
      return user.id;
    } else if (user?.accountType === 'retailer' || user?.isAdmin) {
      return selectedCustomer?.id || null;
    }
    return null;
  };

  // Use the API hook to fetch locations with their status
  const { 
    data: paddocks, 
    loading, 
    error, 
    execute: fetchPaddocks 
  } = useApi(api.references.getLocations);

  useEffect(() => {
    const userId = getUserIdForFiltering();
    // Only fetch data if:
    // 1. User is a farmer (always has userId)
    // 2. User is a retailer/admin AND has selected a customer
    if (user?.accountType === 'farmer' || ((user?.accountType === 'retailer' || user?.isAdmin) && userId)) {
      fetchPaddocks(true, userId);
    }
  }, [fetchPaddocks, user, selectedCustomer]);

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

  // Check if we should show data (for retailers/admins, need customer selection)
  const shouldShowData = user?.accountType === 'farmer' || ((user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer);

  return (
    <PageContainer>
      {/* Header Section */}
      <PageHeader
        title="Assessments"
        subtitle={
          (user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
            ? `Continue draft assessments for ${selectedCustomer.name}`
            : "Continue draft assessments for your locations"
        }
        actions={(
          <FormButton
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleNewAssessment}
            disabled={(user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer}
          >
            {isMobile ? 'New' : 'New Assessment'}
          </FormButton>
        )}
      />
      
      {/* Customer Selector - shown for retailers and admins */}
      <CustomerSelector user={user} isMobile={isMobile} />
      
      {/* Only show content if customer is selected (for retailers) or user is farmer */}
      {shouldShowData ? (
        <>
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
                    {(user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
                      ? `Start a new assessment for ${selectedCustomer.name} to begin tracking crop performance`
                      : "Start a new assessment to begin tracking your crop performance"
                    }
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
        </>
      ) : (
        // Show placeholder when no customer is selected (retailers and admins only)
        (user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Select a customer</h3>
            <p className="text-gray-500">
              Choose a customer from the dropdown above to view their draft assessments
            </p>
          </div>
        )
      )}
    </PageContainer>
  );
};

export default AssessmentsScreen;
