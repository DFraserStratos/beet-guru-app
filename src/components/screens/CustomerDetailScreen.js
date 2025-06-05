import { useEffect, useState } from 'react';
import { ArrowLeft, User, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';
import { referencesAPI } from '../../services/api';
import { useApi } from '../../hooks';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import DropdownMenu from '../ui/DropdownMenu';
import PaddockListItemSkeleton from '../ui/PaddockListItemSkeleton';
import PaddockForm from './PaddockForm';
import ErrorBoundary from '../utility/ErrorBoundary';

/**
 * Screen showing detailed view of a customer with paddock management for retailers
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CustomerDetailScreen = ({ 
  customerId, 
  onBack, 
  onCreateAssessment = () => {},
  isMobile 
}) => {
  // Paddock management state
  const [paddocks, setPaddocks] = useState([]);
  const [selectedPaddock, setSelectedPaddock] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [paddockToDelete, setPaddockToDelete] = useState(null);

  // Fetch customer data
  const { 
    data: customer, 
    loading: loadingCustomer, 
    error: customerError, 
    execute: fetchCustomer 
  } = useApi(api.customers.getById);

  // Setup paddock API hooks - using the same API as farmer's paddock screen
  const getPaddocksApi = useApi(referencesAPI.getLocations);
  const createPaddockApi = useApi(referencesAPI.createLocation);
  const updatePaddockApi = useApi(referencesAPI.updateLocation);
  const deletePaddockApi = useApi(referencesAPI.deleteLocation);

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
      fetchPaddocks();
    }
  }, [customerId, fetchCustomer]);

  // Function to fetch paddocks from the API
  const fetchPaddocks = async () => {
    // Filter paddocks by customerId (same as userId in farmer context)
    const result = await getPaddocksApi.execute(false, customerId);
    if (result) {
      setPaddocks(result);
    }
  };

  // Handle creating new assessment
  const handleCreateAssessment = () => {
    if (customer) {
      onCreateAssessment(customer);
    }
  };

  // Handle edit customer
  const handleEditCustomer = () => {
    console.log('Editing customer:', customer.name);
    // This could open a modal or navigate to edit customer screen
  };

  // Handle toggle status
  const handleToggleStatus = (status) => {
    console.log('Toggling status:', status);
    // This could trigger a backend call to update the customer status
  };

  // Handle creating a new paddock
  const handleCreatePaddock = async (paddockData) => {
    // Ensure paddock is linked to current customer
    const newPaddockData = {
      ...paddockData,
      userId: customerId
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
      icon: <Trash2 size={14} />,
      className: 'text-red-600 hover:text-red-800'
    }
  ];

  // Loading state
  if (loadingCustomer) {
    return (
      <PageContainer>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Error state
  if (customerError) {
    return (
      <PageContainer>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading customer: {customerError?.message}</p>
          <FormButton
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={onBack}
            className="mt-4"
          >
            Back to Customers
          </FormButton>
        </div>
      </PageContainer>
    );
  }

  if (!customer) {
    return (
      <PageContainer>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Customer not found</p>
          <FormButton
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={onBack}
            className="mt-4"
          >
            Back to Customers
          </FormButton>
        </div>
      </PageContainer>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <PageContainer>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <FormButton
              variant="outline"
              icon={<ArrowLeft size={16} />}
              onClick={onBack}
              className="mr-4"
            >
              {isMobile ? '' : 'Back'}
            </FormButton>
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                <p className="text-gray-500">{customer.email}</p>
              </div>
            </div>
          </div>
          <FormButton
            variant="primary"
            icon={<Plus size={16} />}
            onClick={handleCreateAssessment}
          >
            {isMobile ? 'New Assessment' : 'Create New Assessment'}
          </FormButton>
        </div>

        {/* Customer Info Card */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User size={24} className="text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleEditCustomer}
                  className="text-sm px-3 py-1.5 rounded border border-green-300 text-green-600 bg-green-50 hover:bg-green-100 flex items-center"
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(customer.status === 'active' ? 'inactive' : 'active')}
                  className={`text-sm px-3 py-1.5 rounded border flex items-center ${
                    customer.status === 'active'
                      ? 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                      : 'border-green-300 text-green-600 bg-green-50 hover:bg-green-100'
                  }`}
                >
                  <Trash2 size={14} className="mr-1" />
                  {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Farm Name */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Farm Name</p>
                <p className="font-medium text-gray-900">{customer.farmName || 'Not specified'}</p>
              </div>

              {/* Role */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="font-medium text-gray-900">{customer.role}</p>
              </div>

              {/* Customer Since */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer Since</p>
                <p className="font-medium text-gray-900">{formatDate(customer.relationshipStart)}</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">{customer.location}</p>
              </div>

              {/* Account Status */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  customer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Paddocks Management Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Paddocks
                </h2>
                <p className="text-gray-600">
                  Manage {customer.name}'s farm fields and paddocks
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
          <div>
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
                  Add {customer.name}'s first paddock to get started
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

export default CustomerDetailScreen; 