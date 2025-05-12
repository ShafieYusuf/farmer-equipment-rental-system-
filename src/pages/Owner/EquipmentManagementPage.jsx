import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown, FaExclamationCircle, FaCheck, FaTimes } from 'react-icons/fa';

const EquipmentManagementPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);
  
  // Mock equipment data
  const mockEquipment = [
    { 
      id: 1, 
      name: 'Combine Harvester', 
      category: 'harvesting', 
      description: 'Modern combine harvester for efficient grain harvesting',
      dailyRate: 250, 
      status: 'available',
      image: 'https://via.placeholder.com/200',
      rentalCount: 12,
      earnings: 3000
    },
    { 
      id: 2, 
      name: 'Tractor', 
      category: 'tractor', 
      description: 'Heavy-duty tractor with multiple attachments',
      dailyRate: 150, 
      status: 'rented',
      image: 'https://via.placeholder.com/200',
      rentalCount: 20,
      earnings: 2450
    },
    { 
      id: 3, 
      name: 'Seed Drill', 
      category: 'planting', 
      description: 'Precision seed drill for accurate planting',
      dailyRate: 100, 
      status: 'available',
      image: 'https://via.placeholder.com/200',
      rentalCount: 8,
      earnings: 800
    },
    { 
      id: 4, 
      name: 'Rotavator', 
      category: 'tillage', 
      description: 'Powerful rotavator for soil preparation',
      dailyRate: 80, 
      status: 'maintenance',
      image: 'https://via.placeholder.com/200',
      rentalCount: 15,
      earnings: 1200
    },
    { 
      id: 5, 
      name: 'Disc Harrow', 
      category: 'tillage', 
      description: 'Large disc harrow for primary tillage',
      dailyRate: 120, 
      status: 'available',
      image: 'https://via.placeholder.com/200',
      rentalCount: 10,
      earnings: 950
    },
    { 
      id: 6, 
      name: 'Sprayer', 
      category: 'spraying', 
      description: 'High-capacity sprayer for crops',
      dailyRate: 90, 
      status: 'available',
      image: 'https://via.placeholder.com/200',
      rentalCount: 7,
      earnings: 630
    },
    { 
      id: 7, 
      name: 'Plough', 
      category: 'tillage', 
      description: 'Heavy-duty plough for deep tilling',
      dailyRate: 70, 
      status: 'rented',
      image: 'https://via.placeholder.com/200',
      rentalCount: 9,
      earnings: 720
    },
    { 
      id: 8, 
      name: 'Potato Harvester', 
      category: 'harvesting', 
      description: 'Specialized equipment for potato harvesting',
      dailyRate: 200, 
      status: 'available',
      image: 'https://via.placeholder.com/200',
      rentalCount: 4,
      earnings: 800
    }
  ];

  // Categories for filter dropdown
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tractor', label: 'Tractors' },
    { value: 'harvesting', label: 'Harvesting Equipment' },
    { value: 'tillage', label: 'Tillage Equipment' },
    { value: 'planting', label: 'Planting Equipment' },
    { value: 'spraying', label: 'Spraying Equipment' }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    
    switch(status) {
      case 'available':
        badgeClass = 'bg-green-100 text-green-800';
        break;
      case 'rented':
        badgeClass = 'bg-blue-100 text-blue-800';
        break;
      case 'maintenance':
        badgeClass = 'bg-orange-100 text-orange-800';
        break;
      case 'unavailable':
        badgeClass = 'bg-red-100 text-red-800';
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

  // Load mock data on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEquipment(mockEquipment);
      setFilteredEquipment(mockEquipment);
      setLoading(false);
    }, 800);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...equipment];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
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
    
    setFilteredEquipment(result);
  }, [equipment, searchTerm, selectedCategory, sortConfig]);

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
    return sortConfig.direction === 'ascending' ? <FaSortUp className="text-amber-600" /> : <FaSortDown className="text-amber-600" />;
  };

  // Toggle equipment status
  const toggleEquipmentStatus = (id, currentStatus) => {
    let newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    const updatedEquipment = equipment.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEquipment(updatedEquipment);
  };

  // Confirm equipment deletion
  const confirmDelete = (id) => {
    setEquipmentToDelete(id);
    setShowDeleteModal(true);
  };

  // Delete equipment
  const deleteEquipment = () => {
    const updatedEquipment = equipment.filter(item => item.id !== equipmentToDelete);
    setEquipment(updatedEquipment);
    setShowDeleteModal(false);
    setEquipmentToDelete(null);
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this equipment? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700"
            onClick={deleteEquipment}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-800">My Equipment</h1>
            <Link
              to="/owner/equipment/add"
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add New Equipment
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-grow mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Equipment List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading equipment...</p>
            </div>
          ) : filteredEquipment.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => requestSort('name')}
                      className="group flex items-center space-x-1 focus:outline-none"
                    >
                      <span>Equipment</span>
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => requestSort('category')}
                      className="group flex items-center space-x-1 focus:outline-none"
                    >
                      <span>Category</span>
                      {getSortIcon('category')}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => requestSort('dailyRate')}
                      className="group flex items-center space-x-1 focus:outline-none"
                    >
                      <span>Daily Rate</span>
                      {getSortIcon('dailyRate')}
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
                      onClick={() => requestSort('earnings')}
                      className="group flex items-center space-x-1 focus:outline-none"
                    >
                      <span>Earnings</span>
                      {getSortIcon('earnings')}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.dailyRate}/day</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.earnings}</div>
                      <div className="text-xs text-gray-500">{item.rentalCount} rentals</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3 justify-end">
                        <Link
                          to={`/owner/equipment/edit/${item.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit equipment"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <button
                          onClick={() => toggleEquipmentStatus(item.id, item.status)}
                          className={`${
                            item.status === 'available' 
                              ? 'text-orange-600 hover:text-orange-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title={item.status === 'available' ? 'Mark as unavailable' : 'Mark as available'}
                        >
                          {item.status === 'available' ? (
                            <FaTimes className="text-lg" />
                          ) : (
                            <FaCheck className="text-lg" />
                          )}
                        </button>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete equipment"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center">
              <FaExclamationCircle className="mx-auto text-gray-400 text-4xl mb-4" />
              <p className="text-gray-500">No equipment found matching your criteria.</p>
              <Link 
                to="/owner/equipment/add"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700"
              >
                <FaPlus className="mr-2" /> Add your first equipment
              </Link>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified) */}
        {filteredEquipment.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredEquipment.length}</span> of <span className="font-medium">{equipment.length}</span> equipment
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default EquipmentManagementPage; 