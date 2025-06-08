import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Shield, User, Building, Leaf, CheckCircle, XCircle, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import PageHeader from '../ui/PageHeader';
import DropdownMenu from '../ui/DropdownMenu';
import { useApi } from '../../hooks';
import api from '../../services/api';

/**
 * User Management screen for managing system users
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const UserManagementScreen = ({ onNavigate, isMobile = false }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Load users from API
      const response = await api.auth.getUsers();
      console.log('Loaded users:', response); // Debug log
      setUsers(response || []);
    } catch (error) {
      console.error('Failed to load users:', error);
      // Set fallback with existing users if API fails
      setUsers([
        { id: '1', name: 'John Smith', email: 'john@example.com', role: 'Farm Manager', accountType: 'farmer', isActive: true, isAdmin: false },
        { id: '2', name: 'Jane Wilson', email: 'jane@example.com', role: 'Agronomist', accountType: 'farmer', isActive: true, isAdmin: false },
        { id: '3', name: 'Mike Johnson', email: 'mike@retailer.com', role: 'Sales Manager', accountType: 'retailer', isActive: true, isAdmin: false },
        { id: '4', name: 'Sarah Brown', email: 'sarah@retailer.com', role: 'Account Manager', accountType: 'retailer', isActive: false, isAdmin: false },
        { id: '5', name: 'David Lee', email: 'david@example.com', role: 'Farm Owner', accountType: 'farmer', isActive: true, isAdmin: false },
        { id: '6', name: 'Emma Davis', email: 'emma@retailer.com', role: 'Territory Manager', accountType: 'retailer', isActive: true, isAdmin: false },
        { id: '7', name: 'Roland Reed', email: 'roland@example.com', role: 'Regional Manager', accountType: 'retailer', isActive: true, isAdmin: false },
        { id: '8', name: 'Amy Anderson', email: 'amy@beetguru.com', role: 'Agricom Admin', accountType: 'admin', isActive: true, isAdmin: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, isActive: !u.isActive }
          : u
      );
      setUsers(updatedUsers);
      console.log(`${user.isActive ? 'Deactivated' : 'Activated'} user:`, user.name);
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user.name);
    // TODO: Implement edit user functionality
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      const updatedUsers = users.filter(u => u.id !== user.id);
      setUsers(updatedUsers);
      console.log('Deleted user:', user.name);
    }
  };

  const getUserActions = (user) => [
    {
      label: 'Edit User',
      onClick: () => handleEditUser(user),
      icon: <Edit size={14} />,
      className: 'text-blue-600 hover:text-blue-800'
    },
    {
      label: user.isActive ? 'Deactivate' : 'Activate',
      onClick: () => handleToggleStatus(user),
      icon: user.isActive ? <UserX size={14} /> : <UserCheck size={14} />,
      className: user.isActive ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'
    },
    {
      label: 'Delete User',
      onClick: () => handleDeleteUser(user),
      icon: <Trash2 size={14} />,
      className: 'text-red-600 hover:text-red-800'
    }
  ];

  const getAccountTypeColor = (accountType) => {
    switch (accountType) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'retailer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeIcon = (accountType) => {
    switch (accountType) {
      case 'farmer': return <Leaf size={14} />;
      case 'retailer': return <Building size={14} />;
      case 'admin': return <Shield size={14} />;
      default: return <User size={14} />;
    }
  };

  // Get summary statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const adminUsers = users.filter(u => u.isAdmin).length;
  const farmerUsers = users.filter(u => u.accountType === 'farmer').length;
  const retailerUsers = users.filter(u => u.accountType === 'retailer').length;

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
        title="User Management"
        subtitle="Manage system users and their permissions"
      />

      {isLoading ? (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
              Loading users...
            </div>
          </div>
        </div>
      ) : (
        /* Users List */
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-sm text-gray-500">No users are currently registered in the system.</p>
            </div>
          ) : (
            <>
              {/* Mobile Row Layout */}
              {isMobile ? (
                <div className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <div key={user.id} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getAccountTypeColor(user.accountType)}`}>
                            {getAccountTypeIcon(user.accountType)}
                            <span className="ml-1 capitalize">{user.accountType}</span>
                          </span>
                          {!user.isActive && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <DropdownMenu 
                          items={getUserActions(user)}
                          className="inline-flex"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Desktop Table Layout */
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Account Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-2 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(user.accountType)}`}>
                              {getAccountTypeIcon(user.accountType)}
                              <span className="ml-1 capitalize">{user.accountType}</span>
                            </span>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                            {user.role}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {user.isActive ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle size={12} className="mr-1" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircle size={12} className="mr-1" />
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                            <DropdownMenu 
                              items={getUserActions(user)}
                              className="inline-flex justify-end"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default UserManagementScreen; 