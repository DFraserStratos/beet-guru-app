import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { useApi } from '../../hooks';
import { referencesAPI } from '../../services/api';
import { FormButton } from '../ui/form';
import { IconButton } from '../ui/buttons';
import PageContainer from '../layout/PageContainer';
import PaddockListItemSkeleton from '../ui/PaddockListItemSkeleton';
import PaddockForm from './PaddockForm';
import DropdownMenu from '../ui/DropdownMenu';
import ErrorBoundary from '../utility/ErrorBoundary';

/**
 * Paddocks Screen Component
 * 
 * Displays a list of paddocks for a farmer, with options to create
 * and edit paddocks. Each paddock has a name and area.
 * 
 * @param {Object} props
 * @param {boolean} props.isMobile - Whether the screen is in mobile view
 * @param {Object} props.user - Current user information
 * @returns {JSX.Element}
 */
const PaddocksScreen = ({ isMobile, user }) => {
  // State for paddock data
  const [paddocks, setPaddocks] = useState([]);
  const [selectedPaddock, setSelectedPaddock] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [paddockToDelete, setPaddockToDelete] = useState(null);
  
  // Setup API hooks
  const getPaddocksApi = useApi(referencesAPI.getLocations);
  const createPaddockApi = useApi(referencesAPI.createLocation);
  const updatePaddockApi = useApi(referencesAPI.updateLocation);
  const deletePaddockApi = useApi(referencesAPI.deleteLocation);
  
  // Fetch paddocks on component mount
  useEffect(() => {
    fetchPaddocks();
  }, []);
  
  // Function to fetch paddocks from the API
  const fetchPaddocks = async () => {
    // For farmers, filter by user ID; for retailers, show all
    const userId = user?.accountType === 'farmer' ? user.id : null;
    const result = await getPaddocksApi.execute(false, userId);
    if (result) {
      setPaddocks(result);
    }
  };
  
  // Handle creating a new paddock
  const handleCreatePaddock = async (paddockData) => {
    // Ensure paddock is linked to current user
    const newPaddockData = {
      ...paddockData,
      userId: user?.id
    };
    
    const result = await createPaddockApi.execute(newPaddockData);
    if (result) {
      // Update paddocks list
      setPaddocks([...paddocks, result]);
      setIsFormOpen(false);
    }
  };
  
  // Handle editing an existing paddock
  const handleEditPaddock = async (paddockData) => {
    const result = await updatePaddockApi.execute(paddockData.id, paddockData);
    if (result) {
      // Update paddocks list
      const updatedPaddocks = paddocks.map(paddock => 
        paddock.id === result.id ? result : paddock
      );
      setPaddocks(updatedPaddocks);
      setIsFormOpen(false);
      setSelectedPaddock(null);
    }
  };
  
  // Open edit form for a paddock
  const handleEditClick = (paddock) => {
    setSelectedPaddock(paddock);
    setIsFormOpen(true);
  };
  
  // Handle deleting a paddock
  const handleDeleteClick = (paddock) => {
    setPaddockToDelete(paddock);
    setIsConfirmDeleteOpen(true);
  };
  
  // Confirm paddock deletion
  const handleConfirmDelete = async () => {
    try {
      const result = await deletePaddockApi.execute(paddockToDelete?.id);
      if (result && result.success) {
        // Update paddocks list
        const updatedPaddocks = paddocks.filter(
          paddock => paddock.id !== paddockToDelete?.id
        );
        setPaddocks(updatedPaddocks);
      }
    } catch (error) {
      alert('Could not delete paddock: ' + error.message);
    } finally {
      setIsConfirmDeleteOpen(false);
      setPaddockToDelete(null);
    }
  };
  
  const getPaddockActions = (paddock) => [
    {
      label: 'Edit Paddock',
      onClick: () => handleEditClick(paddock),
      icon: <Edit size={14} />,
      className: 'text-green-600 hover:text-green-800'
    },
    {
      label: 'Delete Paddock',
      onClick: () => handleDeleteClick(paddock),
      icon: <Trash size={14} />,
      className: 'text-red-600 hover:text-red-800'
    }
  ];
  
  return (
    <>
      <PageContainer>
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Paddocks
              </h1>
              <p className="text-gray-600">
                Manage your farm fields and paddocks
              </p>
            </div>
            <FormButton 
              variant="primary" 
              icon={<Plus size={16} />}
              onClick={() => {
                setSelectedPaddock(null);
                setIsFormOpen(true);
              }}
            >
              Add Paddock
            </FormButton>
          </div>
        </div>
        
        {/* Paddocks List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {getPaddocksApi.loading ? (
            <ul className="divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <PaddockListItemSkeleton key={index} />
              ))}
            </ul>
          ) : paddocks.length === 0 ? (
            <div className="p-8 text-center">
              <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No paddocks found</h3>
              <p className="text-gray-500 mb-6">
                Add your first paddock to get started
              </p>
              <FormButton 
                variant="primary" 
                icon={<Plus size={16} />}
                onClick={() => {
                  setSelectedPaddock(null);
                  setIsFormOpen(true);
                }}
              >
                Add Paddock
              </FormButton>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {paddocks.map((paddock) => (
                <li key={paddock.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <MapPin size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-800">{paddock.name}</h3>
                        <p className="text-sm text-gray-500">
                          {paddock.area ? `${paddock.area} hectares` : 'Area not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <DropdownMenu 
                        items={getPaddockActions(paddock)}
                        className="inline-flex justify-end"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageContainer>

      {/* Create/Edit Paddock Form Modal */}
      {isFormOpen && (
        <ErrorBoundary>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <PaddockForm
                paddock={selectedPaddock}
                onSubmit={selectedPaddock ? handleEditPaddock : handleCreatePaddock}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedPaddock(null);
                }}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}
      
      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Delete Paddock</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{paddockToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <FormButton 
                variant="outline" 
                onClick={() => setIsConfirmDeleteOpen(false)}
              >
                Cancel
              </FormButton>
              <FormButton
                variant="danger"
                onClick={handleConfirmDelete}
                isLoading={deletePaddockApi.loading}
              >
                Delete
              </FormButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaddocksScreen; 