import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Leaf, Save, X } from 'lucide-react';
import { FormButton, FormField } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import PageHeader from '../ui/PageHeader';
import { useApi } from '../../hooks';
import api from '../../services/api';

/**
 * Cultivar Management screen for managing system cultivars
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CultivarManagementScreen = ({ onNavigate, isMobile = false }) => {
  const [cultivars, setCultivars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCultivar, setEditingCultivar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    yield: '',
    growingTime: '',
    dryMatter: '',
    isPggCultivar: false,
    cropTypeId: '1' // Default to Fodder Beet
  });

  // Load cultivars on mount
  useEffect(() => {
    loadCultivars();
  }, []);

  const loadCultivars = async () => {
    setIsLoading(true);
    try {
      // Load cultivars from API
      const response = await api.references.getCultivars();
      console.log('Loaded cultivars:', response); // Debug log
      setCultivars(response || []);
    } catch (error) {
      console.error('Failed to load cultivars:', error);
      // Set a fallback with existing cultivars if API fails
      setCultivars([
        { id: '1', name: 'Brigadier', cropTypeId: '1', dryMatter: '12-15%', yield: '20-30 t/acre', growingTime: '24-28 weeks', description: 'Low dry matter content, high sugar content. Suitable for all stock types. World\'s number one for strip grazing.', isPggCultivar: true },
        { id: '2', name: 'Feldherr', cropTypeId: '1', dryMatter: '19-21%', yield: '16-20 t/ha', growingTime: '190-210 days', isPggCultivar: true },
        { id: '3', name: 'Kyros', cropTypeId: '1', dryMatter: '17-19%', yield: '17-22 t/ha', growingTime: '185-205 days', isPggCultivar: false },
        { id: '4', name: 'Blizzard', cropTypeId: '1', dryMatter: '13-15%', yield: '15-19 t/ha', growingTime: '170-190 days', isPggCultivar: true },
        { id: '5', name: 'Blaze', cropTypeId: '1', dryMatter: '16-18%', yield: '18-24 t/ha', growingTime: '180-200 days', isPggCultivar: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddNew = () => {
    setEditingCultivar(null);
    setFormData({
      name: '',
      description: '',
      yield: '',
      growingTime: '',
      dryMatter: '',
      isPggCultivar: false,
      cropTypeId: '1'
    });
    setIsFormModalOpen(true);
  };

  const handleEdit = (cultivar) => {
    setEditingCultivar(cultivar);
    setFormData({
      name: cultivar.name || '',
      description: cultivar.description || '',
      yield: cultivar.yield || '',
      growingTime: cultivar.growingTime || '',
      dryMatter: cultivar.dryMatter || '',
      isPggCultivar: cultivar.isPggCultivar || false,
      cropTypeId: cultivar.cropTypeId || '1'
    });
    setIsFormModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCultivar) {
        // Update existing cultivar (simulate API call)
        const updatedCultivars = cultivars.map(c => 
          c.id === editingCultivar.id 
            ? { ...c, ...formData }
            : c
        );
        setCultivars(updatedCultivars);
        console.log('Updated cultivar:', { ...editingCultivar, ...formData });
      } else {
        // Add new cultivar (simulate API call)
        const newCultivar = {
          id: String(Date.now()),
          ...formData
        };
        setCultivars([...cultivars, newCultivar]);
        console.log('Added new cultivar:', newCultivar);
      }
      setIsFormModalOpen(false);
      setEditingCultivar(null);
    } catch (error) {
      console.error('Failed to save cultivar:', error);
      alert('Failed to save cultivar. Please try again.');
    }
  };

  const handleDelete = (cultivar) => {
    if (window.confirm(`Are you sure you want to delete ${cultivar.name}?`)) {
      setCultivars(cultivars.filter(c => c.id !== cultivar.id));
      console.log('Deleted cultivar:', cultivar.name);
    }
  };

  const handleCancel = () => {
    setIsFormModalOpen(false);
    setEditingCultivar(null);
  };

  return (
    <PageContainer>
      {/* Header with back button - only shown on mobile */}
      {isMobile && (
        <div className="flex items-center mb-4">
          <FormButton
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={() => onNavigate('home')}
            size="sm"
          >
            Back
          </FormButton>
        </div>
      )}
      
      {/* Page Header */}
      <PageHeader
        title="Cultivar Management"
        subtitle="Manage system cultivars used in assessments"
        actions={(
          <FormButton
            onClick={handleAddNew}
            variant="primary"
            icon={<Plus size={16} />}
          >
            {isMobile ? 'Add' : 'Add Cultivar'}
          </FormButton>
        )}
      />

      {isLoading ? (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
              Loading cultivars...
            </div>
          </div>
        </div>
      ) : (
        /* Cultivars List */
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {cultivars.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Leaf className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No cultivars found</h3>
              <p className="text-sm text-gray-500 mb-4">Add your first cultivar to get started with the system.</p>
              <FormButton
                onClick={handleAddNew}
                variant="primary"
                icon={<Plus size={16} />}
                size="sm"
              >
                Add First Cultivar
              </FormButton>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yield
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days to Maturity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dry Matter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PGG
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cultivars.map((cultivar) => (
                    <tr key={cultivar.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{cultivar.name}</div>
                          {cultivar.description && (
                            <div className="text-sm text-gray-500 max-w-xs truncate" title={cultivar.description}>
                              {cultivar.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cultivar.cropTypeId === '1' ? 'Fodder Beet' : 
                         cultivar.cropTypeId === '2' ? 'Sugar Beet' : 'Mangels'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cultivar.yield || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cultivar.growingTime || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cultivar.dryMatter || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cultivar.isPggCultivar ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(cultivar)}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Edit cultivar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cultivar)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete cultivar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Cultivar Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {editingCultivar ? 'Edit Cultivar' : 'Add New Cultivar'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FormField
                  label="Cultivar Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g., Brigadier"
                  required
                />
                
                <FormField
                  label="Crop Type"
                  name="cropTypeId"
                  type="select"
                  value={formData.cropTypeId}
                  onChange={handleFormChange}
                  options={[
                    { value: '1', label: 'Fodder Beet' },
                    { value: '2', label: 'Sugar Beet' },
                    { value: '3', label: 'Mangels' }
                  ]}
                  required
                />

                <FormField
                  label="Yield Potential"
                  name="yield"
                  type="text"
                  value={formData.yield}
                  onChange={handleFormChange}
                  placeholder="e.g., 20-30 t/acre"
                />

                <FormField
                  label="Days to Maturity"
                  name="growingTime"
                  type="text"
                  value={formData.growingTime}
                  onChange={handleFormChange}
                  placeholder="e.g., 24-28 weeks"
                />

                <FormField
                  label="Dry Matter %"
                  name="dryMatter"
                  type="text"
                  value={formData.dryMatter}
                  onChange={handleFormChange}
                  placeholder="e.g., 12-15%"
                />

                <div className="flex items-center">
                  <FormField
                    name="isPggCultivar"
                    type="checkbox"
                    value={formData.isPggCultivar}
                    onChange={handleFormChange}
                  >
                    PGG Cultivar
                  </FormField>
                </div>
              </div>

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="e.g., Low dry matter content, high sugar content. Suitable for all stock types. World's number one for strip grazing."
                rows={3}
              />

              <div className="flex justify-end space-x-3 mt-6">
                <FormButton
                  onClick={handleCancel}
                  variant="outline"
                  icon={<X size={16} />}
                >
                  Cancel
                </FormButton>
                <FormButton
                  onClick={handleSave}
                  variant="primary"
                  icon={<Save size={16} />}
                >
                  {editingCultivar ? 'Update' : 'Save'}
                </FormButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default CultivarManagementScreen; 