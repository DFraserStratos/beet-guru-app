import { useEffect, useState } from 'react';
import { ArrowLeft, User, MapPin, Plus, Edit, Trash2, Mail, Calendar, Building, Shield } from 'lucide-react';
import api from '../../services/api';
import { referencesAPI } from '../../services/api';
import { useApi } from '../../hooks';
import { useCustomer } from '../../contexts/CustomerContext';
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
  // Customer context for clearing selection
  const { clearCustomer } = useCustomer();
  
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

  // Handle selecting new customer
  const handleSelectNewCustomer = () => {
    clearCustomer();
    onBack();
  };

  // Handle creating new paddock
  const handleCreatePaddock = async (paddockData) => {
    try {
      const newPaddock = await createPaddockApi.execute({
        ...paddockData,
        userId: customerId // Associate with this customer
      });
      if (newPaddock) {
        setPaddocks([...paddocks, newPaddock]);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error creating paddock:', error);
    }
  };

  // Handle editing existing paddock
  const handleEditPaddock = async (paddockData) => {
    try {
      const updatedPaddock = await updatePaddockApi.execute(selectedPaddock.id, paddockData);
      if (updatedPaddock) {
        setPaddocks(paddocks.map(p => p.id === selectedPaddock.id ? updatedPaddock : p));
        setIsFormOpen(false);
        setSelectedPaddock(null);
      }
    } catch (error) {
      console.error('Error updating paddock:', error);
    }
  };

  // Handle edit click
  const handleEditClick = (paddock) => {
    setSelectedPaddock(paddock);
    setIsFormOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (paddock) => {
    setPaddockToDelete(paddock);
    setIsConfirmDeleteOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (paddockToDelete) {
      try {
        await deletePaddockApi.execute(paddockToDelete.id);
        setPaddocks(paddocks.filter(p => p.id !== paddockToDelete.id));
        setIsConfirmDeleteOpen(false);
        setPaddockToDelete(null);
      } catch (error) {
        console.error('Error deleting paddock:', error);
      }
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
            onClick={handleSelectNewCustomer}
            className="mt-4"
          >
            Change Customer
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
            onClick={handleSelectNewCustomer}
            className="mt-4"
          >
            Change Customer
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
        {/* Mobile-optimized Header Section */}
        <div className="space-y-4 mb-6">
          {/* Navigation and Primary Action */}
          <div className="flex items-center justify-between">
            <FormButton
              variant="outline"
              icon={<ArrowLeft size={16} />}
              onClick={handleSelectNewCustomer}
              size={isMobile ? "sm" : "md"}
            >
              {isMobile ? 'Back' : 'Change Customer'}
            </FormButton>
            <FormButton
              variant="primary"
              icon={<Plus size={16} />}
              onClick={handleCreateAssessment}
              size={isMobile ? "sm" : "md"}
            >
              {isMobile ? 'Assessment' : 'New Assessment'}
            </FormButton>
          </div>

          {/* Customer Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <User size={isMobile ? 20 : 24} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{customer.name}</h1>
                <div className="flex items-center mt-1 text-gray-600">
                  <Mail size={14} className="mr-1 flex-shrink-0" />
                  <p className="text-sm md:text-base truncate">{customer.email}</p>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <Shield size={12} className="mr-1" />
                    {customer.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          {/* Card Header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
              <div className="flex items-center space-x-2">
                <FormButton
                  variant="outline"
                  size="sm"
                  icon={<Edit size={14} />}
                  onClick={handleEditCustomer}
                >
                  {isMobile ? '' : 'Edit'}
                </FormButton>
                <FormButton
                  variant={customer.status === 'active' ? 'danger' : 'primary'}
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => handleToggleStatus(customer.status === 'active' ? 'inactive' : 'active')}
                >
                  {isMobile ? '' : (customer.status === 'active' ? 'Deactivate' : 'Activate')}
                </FormButton>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farm Details Group */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Farm Details</h3>
                
                <div className="flex items-start space-x-3">
                  <Building size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Farm Name</p>
                    <p className="font-medium text-gray-900 truncate">{customer.farmName || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900 truncate">{customer.location}</p>
                  </div>
                </div>
              </div>

              {/* Account Details Group */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Account Details</h3>
                
                <div className="flex items-start space-x-3">
                  <User size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-900 truncate">{customer.role}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">Customer Since</p>
                    <p className="font-medium text-gray-900">{formatDate(customer.relationshipStart)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paddocks Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Paddocks</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage {customer.name}'s farm fields and paddocks
                </p>
              </div>
              <FormButton 
                variant="primary" 
                size="sm"
                icon={<Plus size={16} />}
                onClick={() => {
                  setSelectedPaddock(null);
                  setIsFormOpen(true);
                }}
              >
                {isMobile ? 'Add' : 'Add Paddock'}
              </FormButton>
            </div>
          </div>

          {/* Paddocks List */}
          <div>
            {getPaddocksApi.loading ? (
              <ul className="divide-y divide-gray-100">
                {[...Array(3)].map((_, index) => (
                  <PaddockListItemSkeleton key={index} />
                ))}
              </ul>
            ) : paddocks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No paddocks found</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Add {customer.name}'s first paddock to get started with field management
                </p>
                <FormButton 
                  variant="primary" 
                  icon={<Plus size={16} />}
                  onClick={() => {
                    setSelectedPaddock(null);
                    setIsFormOpen(true);
                  }}
                >
                  Add First Paddock
                </FormButton>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {paddocks.map((paddock) => (
                  <li key={paddock.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <MapPin size={18} className="text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-medium text-gray-900 truncate">{paddock.name}</h3>
                          <p className="text-sm text-gray-500 truncate">
                            {paddock.area ? `${paddock.area} hectares` : 'Area not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
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
                onSave={selectedPaddock ? handleEditPaddock : handleCreatePaddock}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedPaddock(null);
                }}
                isLoading={createPaddockApi.loading || updatePaddockApi.loading}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Paddock</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{paddockToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <FormButton
                variant="danger"
                onClick={handleConfirmDelete}
                isLoading={deletePaddockApi.loading}
                className="flex-1"
              >
                Delete
              </FormButton>
              <FormButton
                variant="outline"
                onClick={() => {
                  setIsConfirmDeleteOpen(false);
                  setPaddockToDelete(null);
                }}
                className="flex-1"
              >
                Cancel
              </FormButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailScreen; 