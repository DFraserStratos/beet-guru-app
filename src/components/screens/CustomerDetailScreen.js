import { useEffect, useState } from 'react';
import { ArrowLeft, User, MapPin, FileText, Plus, BarChart3, Edit, Trash2, Download } from 'lucide-react';
import DataTable from '../ui/DataTable';
import api from '../../services/api';
import { useApi, usePagination } from '../../hooks';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import DropdownMenu from '../ui/DropdownMenu';

/**
 * Screen showing detailed view of a customer for retailers
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CustomerDetailScreen = ({ 
  customerId, 
  onBack, 
  onCreateAssessment = () => {},
  onViewReport = () => {},
  isMobile 
}) => {
  // Tab state
  const [activeTab, setActiveTab] = useState('reports');

  // Fetch customer data
  const { 
    data: customer, 
    loading: loadingCustomer, 
    error: customerError, 
    execute: fetchCustomer 
  } = useApi(api.customers.getById);

  // Fetch customer's locations/paddocks
  const { 
    data: locations, 
    loading: loadingLocations, 
    error: locationsError, 
    execute: fetchLocations 
  } = useApi(api.locations.getByUserId);

  // Fetch customer's reports
  const { 
    data: reports, 
    loading: loadingReports, 
    error: reportsError, 
    execute: fetchReports 
  } = useApi(api.reports.getByUserId);

  // Fetch customer's draft assessments
  const { 
    data: draftAssessments, 
    loading: loadingDrafts, 
    error: draftsError, 
    execute: fetchDrafts 
  } = useApi(api.assessments.getDraftAssessments);

  // Set up pagination for reports (10 items per page)
  const reportsPagination = usePagination(reports || [], 10);

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
      fetchLocations(customerId);
      fetchReports(customerId);
      fetchDrafts(); // Get all drafts and filter by customer locations
    }
  }, [customerId, fetchCustomer, fetchLocations, fetchReports, fetchDrafts]);

  // Handle creating new assessment
  const handleCreateAssessment = () => {
    if (customer) {
      onCreateAssessment(customer);
    }
  };

  // Handle view report
  const handleViewReport = (reportId) => {
    onViewReport(reportId);
  };

  // Handle edit paddock
  const handleEditPaddock = (paddock) => {
    // For now, just log the action - in the future this could open an edit modal
    console.log('Edit paddock:', paddock.name);
    // This could trigger a modal or navigate to an edit screen
  };

  // Handle delete paddock
  const handleDeletePaddock = (paddock) => {
    // For now, just log the action - in the future this could show a confirmation dialog
    console.log('Delete paddock:', paddock.name);
    // This could show a confirmation dialog and then delete the paddock
  };

  // Handle export reports
  const handleExportReports = () => {
    console.log('Exporting reports for customer:', customer.name);
    // This could trigger a download of all reports for this customer
  };

  // Handle add new paddock
  const handleAddPaddock = () => {
    console.log('Adding new paddock for customer:', customer.name);
    // This could open a modal or navigate to add paddock screen for this customer
  };

  // Handle toggle status
  const handleToggleStatus = (status) => {
    console.log('Toggling status:', status);
    // This could trigger a backend call to update the customer status
  };

  // Handle edit customer
  const handleEditCustomer = () => {
    console.log('Editing customer:', customer.name);
    // This could open a modal or navigate to edit customer screen
  };

  const getPaddockActions = (paddock) => [
    {
      label: 'Edit Paddock',
      onClick: () => handleEditPaddock(paddock),
      icon: <Edit size={14} />,
      className: 'text-green-600 hover:text-green-800'
    },
    {
      label: 'Delete Paddock',
      onClick: () => handleDeletePaddock(paddock),
      icon: <Trash2 size={14} />,
      className: 'text-red-600 hover:text-red-800'
    }
  ];

  const getReportActions = (report) => [
    {
      label: 'View Report',
      onClick: () => handleViewReport(report.id),
      icon: <FileText size={14} />,
      className: 'text-blue-600 hover:text-blue-800'
    }
  ];

  // Define columns for reports table - matching ReportsScreen for retailers
  const reportColumns = [
    { 
      key: 'created', 
      label: 'Date',
      render: (item) => new Date(item.created).toLocaleDateString('en-NZ', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    { 
      key: 'title', 
      label: 'Report Title',
      render: (item) => (
        <div className="max-w-48 truncate" title={item.title}>
          {item.title}
        </div>
      )
    },
    { 
      key: 'location', 
      label: 'Location',
      hideOnMobile: true,
      render: (item) => (
        <div className="max-w-32 truncate" title={item.location}>
          {item.location}
        </div>
      )
    },
    { 
      key: 'cultivar', 
      label: 'Cultivar/Crop Type',
      hideOnMobile: true,
      render: (item) => item.cultivar || 'Not specified'
    },
    { 
      key: 'season', 
      label: 'Season',
      hideOnMobile: true,
      render: (item) => item.season || 'Not specified'
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex items-center justify-end">
          <DropdownMenu 
            items={getReportActions(item)}
            className="inline-flex justify-end"
          />
        </div>
      )
    }
  ];

  // Define columns for locations table
  const locationColumns = [
    { 
      key: 'name', 
      label: 'Paddock Name',
      render: (item) => item.name
    },
    { 
      key: 'area', 
      label: 'Area (ha)',
      render: (item) => `${item.area} ha`
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex items-center justify-end">
          <DropdownMenu 
            items={getPaddockActions(item)}
            className="inline-flex justify-end"
          />
        </div>
      )
    }
  ];

  // Filter draft assessments for this customer's locations
  const customerDraftAssessments = draftAssessments && locations 
    ? draftAssessments.filter(assessment => {
        const assessmentLocation = locations.find(loc => loc.id === assessment.locationId);
        return assessmentLocation !== undefined;
      })
    : [];

  // Define columns for draft assessments table - matching AssessmentsScreen style for retailers
  const draftColumns = [
    { 
      key: 'date', 
      label: 'Started',
      render: (item) => new Date(item.date).toLocaleDateString('en-NZ', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    { 
      key: 'location', 
      label: 'Location'
    },
    { 
      key: 'cropType', 
      label: 'Crop Type',
      hideOnMobile: true,
      render: (item) => item.cropType || 'Not specified'
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex justify-end">
          <ArrowLeft size={16} className="text-green-600 rotate-180" />
        </div>
      )
    }
  ];

  // Filter columns based on mobile view for each table
  const visibleReportColumns = isMobile 
    ? reportColumns.filter(column => !column.hideOnMobile)
    : reportColumns;
    
  const visibleDraftColumns = isMobile 
    ? draftColumns.filter(column => !column.hideOnMobile)
    : draftColumns;

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

  // Tab configuration
  const tabs = [
    {
      id: 'reports',
      label: 'Reports',
      icon: <FileText size={16} />,
      count: reports?.length || 0
    },
    {
      id: 'paddocks',
      label: 'Paddocks',
      icon: <MapPin size={16} />,
      count: locations?.length || 0
    },
    {
      id: 'drafts',
      label: 'Draft Assessments',
      icon: <BarChart3 size={16} />,
      count: customerDraftAssessments?.length || 0
    }
  ];

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              <button
                onClick={handleExportReports}
                className="text-xs px-2 py-1 rounded border border-green-300 text-green-600 bg-green-50 hover:bg-green-100"
              >
                Export Reports
              </button>
            </div>
            
            {loadingReports ? (
              <div className="bg-white rounded-xl shadow p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : reportsError ? (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-red-500">Error loading reports: {reportsError?.message}</p>
              </div>
            ) : (
              <DataTable
                data={reports || []}
                columns={visibleReportColumns}
                onRowClick={(report) => handleViewReport(report.id)}
                pagination={reportsPagination}
                isMobile={isMobile}
                emptyMessage={
                  <div className="p-8 text-center">
                    <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No reports found</h3>
                    <p className="text-gray-500 mb-4">This customer hasn't generated any reports yet.</p>
                    <FormButton
                      variant="primary"
                      icon={<Plus size={16} />}
                      onClick={handleCreateAssessment}
                    >
                      Create First Assessment
                    </FormButton>
                  </div>
                }
              />
            )}
          </div>
        );

      case 'paddocks':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              <button
                onClick={handleAddPaddock}
                className="text-xs px-2 py-1 rounded border border-green-300 text-green-600 bg-green-50 hover:bg-green-100"
              >
                Add Paddock
              </button>
            </div>
            
            {loadingLocations ? (
              <div className="bg-white rounded-xl shadow p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : locationsError ? (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-red-500">Error loading paddocks: {locationsError?.message}</p>
              </div>
            ) : (
              <DataTable
                data={locations || []}
                columns={locationColumns}
                emptyMessage={
                  <div className="p-8 text-center">
                    <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No paddocks found</h3>
                    <p className="text-gray-500">This customer hasn't added any paddocks yet.</p>
                  </div>
                }
              />
            )}
          </div>
        );

      case 'drafts':
        return (
          <div className="space-y-4">
            {loadingDrafts ? (
              <div className="bg-white rounded-xl shadow p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : draftsError ? (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-red-500">Error loading draft assessments: {draftsError?.message}</p>
              </div>
            ) : (
              <DataTable
                data={customerDraftAssessments || []}
                columns={visibleDraftColumns}
                emptyMessage={
                  <div className="p-8 text-center">
                    <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No draft assessments</h3>
                    <p className="text-gray-500 mb-4">No assessments are currently in progress.</p>
                    <FormButton
                      variant="primary"
                      icon={<Plus size={16} />}
                      onClick={handleCreateAssessment}
                    >
                      Start New Assessment
                    </FormButton>
                  </div>
                }
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
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

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <User size={20} className="text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Customer Info</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Farm Name</p>
              <p className="font-medium text-gray-900">{customer.farmName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-900">{customer.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer Since</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{formatDate(customer.relationshipStart)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCustomer();
                  }}
                  className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <MapPin size={20} className="text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{customer.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Paddocks</p>
              <p className="font-medium text-gray-900">{locations?.length || 0} paddocks</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Area</p>
              <p className="font-medium text-gray-900">
                {locations ? locations.reduce((sum, loc) => sum + loc.area, 0).toFixed(1) : 0} ha
              </p>
            </div>
          </div>
        </div>

        {/* Activity Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <BarChart3 size={20} className="text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <p className="font-medium text-gray-900">{reports?.length || 0} reports</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Assessment</p>
              <p className="font-medium text-gray-900">
                {customer.lastAssessment ? formatDate(customer.lastAssessment) : 'No assessments'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  customer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => handleToggleStatus(customer.status === 'active' ? 'inactive' : 'active')}
                  className={`text-xs px-2 py-1 rounded border ${
                    customer.status === 'active'
                      ? 'border-red-300 text-red-600 hover:bg-red-50'
                      : 'border-green-300 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className={`flex ${isMobile ? 'overflow-x-auto' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200
                  ${isMobile ? 'whitespace-nowrap min-w-0 flex-shrink-0' : 'flex-1'}
                  ${
                    activeTab === tab.id
                      ? 'text-green-600 border-green-600 bg-green-50'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className={isMobile ? 'hidden sm:inline' : ''}>{tab.label}</span>
                <span className={`ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </PageContainer>
  );
};

export default CustomerDetailScreen; 