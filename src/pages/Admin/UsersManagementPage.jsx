import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUserEdit, FaUserTimes, FaUserPlus, FaFilter, FaSort, FaSortUp, FaSortDown, FaEllipsisV, FaArrowUp } from 'react-icons/fa';

const UsersManagementPage = () => {
  // State for users data
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Mock data for demonstration
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'farmer', status: 'active', joinDate: '2023-01-15', lastLogin: '2023-05-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'farmer', status: 'active', joinDate: '2023-02-10', lastLogin: '2023-05-19' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joinDate: '2022-12-01', lastLogin: '2023-05-21' },
    { id: 4, name: 'Mark Wilson', email: 'mark@example.com', role: 'farmer', status: 'inactive', joinDate: '2023-03-05', lastLogin: '2023-04-15' },
    { id: 5, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'farmer', status: 'active', joinDate: '2023-01-20', lastLogin: '2023-05-18' },
    { id: 6, name: 'David Brown', email: 'david@example.com', role: 'farmer', status: 'active', joinDate: '2023-04-12', lastLogin: '2023-05-17' },
    { id: 7, name: 'Emily Davis', email: 'emily@example.com', role: 'support', status: 'active', joinDate: '2023-03-22', lastLogin: '2023-05-20' },
    { id: 8, name: 'Michael Taylor', email: 'michael@example.com', role: 'farmer', status: 'pending', joinDate: '2023-05-05', lastLogin: 'N/A' },
  ];

  // Load mock data on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 800);
    
    // Add scroll listener for scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add toggle mobile filters function after the scrollToTop function
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Handle search and filtering
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (selectedRole !== 'all') {
      result = result.filter(user => user.role === selectedRole);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, selectedRole, sortConfig]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon based on current sort state
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-300" />;
    return sortConfig.direction === 'ascending' ? <FaSortUp className="text-primary" /> : <FaSortDown className="text-primary" />;
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
  };

  // Handle add new user
  const handleAddUser = () => {
    setCurrentUser(null); // null indicates a new user
    setShowModal(true);
  };

  // Modal form component
  const UserModal = () => {
    const [formData, setFormData] = useState(
      currentUser ? 
      { ...currentUser } : 
      { name: '', email: '', role: 'farmer', status: 'active' }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (currentUser) {
        // Update existing user
        const updatedUsers = users.map(user => 
          user.id === currentUser.id ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
      } else {
        // Add new user
        const newUser = {
          id: users.length + 1,
          ...formData,
          joinDate: new Date().toISOString().slice(0, 10),
          lastLogin: 'N/A'
        };
        setUsers([...users, newUser]);
      }
      
      setShowModal(false);
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {currentUser ? 'Edit User' : 'Add New User'}
            </h2>
            <button 
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700 text-xl p-1"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 pt-4 space-y-2 sm:space-y-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                {currentUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // User status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    
    switch(status) {
      case 'active':
        badgeClass = 'bg-green-100 text-green-800';
        break;
      case 'inactive':
        badgeClass = 'bg-red-100 text-red-800';
        break;
      case 'pending':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Users Management</h1>
            <button
              onClick={handleAddUser}
              className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <FaUserPlus className="mr-2" />
              Add New User
            </button>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          {/* Mobile Search and Filter Toggle */}
          <div className="flex justify-between items-center sm:hidden mb-4">
            <div className="relative flex-1 mr-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={toggleMobileFilters}
              className="bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded flex items-center"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>

          {/* Mobile Filters (toggleable) */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:hidden space-y-3 mb-4`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          
          {/* Desktop Search and Filters */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
              <option value="support">Support</option>
            </select>
          </div>
        </div>
        
        {/* Users Table & Mobile Cards */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => requestSort('name')}
                          className="group flex items-center space-x-1 focus:outline-none"
                        >
                          <span>Name</span>
                          {getSortIcon('name')}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => requestSort('email')}
                          className="group flex items-center space-x-1 focus:outline-none"
                        >
                          <span>Email</span>
                          {getSortIcon('email')}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => requestSort('role')}
                          className="group flex items-center space-x-1 focus:outline-none"
                        >
                          <span>Role</span>
                          {getSortIcon('role')}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => requestSort('status')}
                          className="group flex items-center space-x-1 focus:outline-none"
                        >
                          <span>Status</span>
                          {getSortIcon('status')}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => requestSort('joinDate')}
                          className="group flex items-center space-x-1 focus:outline-none"
                        >
                          <span>Join Date</span>
                          {getSortIcon('joinDate')}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative inline-block text-left">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <FaUserEdit className="text-lg" />
                              </button>
                              {user.status === 'active' ? (
                                <button
                                  onClick={() => handleStatusChange(user.id, 'inactive')}
                                  className="text-red-600 hover:text-red-900"
                                  title="Deactivate user"
                                >
                                  <FaUserTimes className="text-lg" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(user.id, 'active')}
                                  className="text-green-600 hover:text-green-900"
                                  title="Activate user"
                                >
                                  <FaUserPlus className="text-lg" />
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{user.email}</div>
                        </div>
                        <StatusBadge status={user.status} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 my-3">
                        <div>
                          <p className="text-xs text-gray-500">Role</p>
                          <p className="text-sm capitalize">{user.role}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Join Date</p>
                          <p className="text-sm">{user.joinDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Login</p>
                          <p className="text-sm">{user.lastLogin}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="inline-flex items-center px-3 py-1.5 text-xs bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200"
                        >
                          <FaUserEdit className="mr-1" /> Edit
                        </button>
                        
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(user.id, 'inactive')}
                            className="inline-flex items-center px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            <FaUserTimes className="mr-1" /> Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(user.id, 'active')}
                            className="inline-flex items-center px-3 py-1.5 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200"
                          >
                            <FaUserPlus className="mr-1" /> Activate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-gray-500">No users found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified) */}
        <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 bg-gray-50 space-y-2 sm:space-y-0">
          <div>
            <p className="text-xs sm:text-sm text-gray-700">
              Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
            </p>
          </div>
          <div className="flex justify-center sm:justify-end space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* User Modal */}
      {showModal && <UserModal />}
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default UsersManagementPage; 