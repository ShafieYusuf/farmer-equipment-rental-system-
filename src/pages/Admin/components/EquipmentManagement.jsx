import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaSortAmountDown, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaExclamationTriangle, FaArrowUp } from 'react-icons/fa';
import apiService from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';

// All equipment categories
const categories = ['All', 'Tractors', 'Harvesters', 'Irrigation', 'Seeders', 'Sprayers', 'Tillage', 'Mowers'];

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'dateAdded', direction: 'descending' });
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const toast = useToast();

  // Add scroll event listener
  useEffect(() => {
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

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Fetch equipment data
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllEquipment();
      if (response.success) {
        setEquipment(response.data);
      } else {
        toast.error('Failed to fetch equipment');
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('An error occurred while fetching equipment');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle equipment approval
  const handleApproveEquipment = async (id) => {
    setIsProcessing(true);
    try {
      const response = await apiService.updateEquipmentDetails(id, { approvalStatus: 'Approved' });
      if (response.success) {
        setEquipment(equipment.map(item => 
          item.id === id ? { ...item, approvalStatus: 'Approved' } : item
        ));
        toast.success('Equipment approved successfully');
      } else {
        toast.error(response.error || 'Failed to approve equipment');
      }
    } catch (error) {
      console.error('Error approving equipment:', error);
      toast.error('An error occurred while approving equipment');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle equipment rejection
  const handleRejectEquipment = async (id) => {
    setIsProcessing(true);
    try {
      const response = await apiService.updateEquipmentDetails(id, { approvalStatus: 'Rejected' });
      if (response.success) {
        setEquipment(equipment.map(item => 
          item.id === id ? { ...item, approvalStatus: 'Rejected' } : item
        ));
        toast.success('Equipment rejected');
      } else {
        toast.error(response.error || 'Failed to reject equipment');
      }
    } catch (error) {
      console.error('Error rejecting equipment:', error);
      toast.error('An error occurred while rejecting equipment');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (item) => {
    setEquipmentToDelete(item);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const deleteEquipment = async () => {
    if (!equipmentToDelete) return;
    
    setIsProcessing(true);
    try {
      const response = await apiService.deleteEquipmentById(equipmentToDelete.id);
      if (response.success) {
        setEquipment(equipment.filter(item => item.id !== equipmentToDelete.id));
        toast.success('Equipment deleted successfully');
      } else {
        toast.error(response.error || 'Failed to delete equipment');
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('An error occurred while deleting equipment');
    } finally {
      setIsProcessing(false);
      setShowDeleteModal(false);
      setEquipmentToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEquipmentToDelete(null);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality is applied directly through filtering
  };

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort equipment
  const filteredEquipment = equipment
    .filter(item => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      // Availability filter
      const matchesAvailability = 
        filterAvailability === 'all' || 
        (filterAvailability === 'available' && item.availability === 'available') || 
        (filterAvailability === 'rented' && item.availability === 'rented') ||
        (filterAvailability === 'maintenance' && item.availability === 'maintenance');
      
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
      if (!a[sortConfig.key]) return 1;
      if (!b[sortConfig.key]) return -1;
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Availability badge styling
  const getAvailabilityBadgeClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Approval status badge styling
  const getApprovalBadgeClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <p className="text-gray-600">Loading equipment data...</p>
      </div>
    );
  }

  // Show error state if no equipment found and not loading
  if (!isLoading && (!equipment || equipment.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Equipment Found</h2>
          <p className="text-gray-600 mb-6">There are no equipment items in the system yet.</p>
          <Link 
            to="/admin/equipment/add" 
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add New Equipment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Equipment Management</h1>
        <Link 
          to="/admin/equipment/add" 
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
        >
          <FaPlus className="mr-2" /> Add New Equipment
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 sm:mb-6">
        {/* Mobile Search and Filter Toggle */}
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <div className="relative flex-1 mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search equipment..."
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
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:hidden space-y-3`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden sm:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Form */}
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search equipment by name, category, or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-48">
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Availability Filter */}
          <div className="md:w-48">
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table for Desktop */}
      <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price ($/day)
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
                      <img className="h-10 w-10 rounded-md object-cover" src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.location}</div>
                  <div className="text-sm text-gray-500">{item.specifications?.substring(0, 30)}{item.specifications?.length > 30 ? '...' : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAvailabilityBadgeClass(item.availability)}`}>
                      {item.availability || 'Unknown'}
                    </span>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getApprovalBadgeClass(item.approvalStatus)}`}>
                      {item.approvalStatus || 'Pending'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.ownerName}</div>
                  <div className="text-sm text-gray-500">{item.ownerContact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${item.pricePerDay?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link to={`/admin/equipment/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900" title="Edit">
                      <FaEdit />
                    </Link>
                    <button onClick={() => confirmDelete(item)} className="text-red-600 hover:text-red-900" title="Delete">
                      <FaTrash />
                    </button>
                    {item.approvalStatus === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApproveEquipment(item.id)}
                          disabled={isProcessing}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleRejectEquipment(item.id)}
                          disabled={isProcessing}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Equipment Cards */}
      <div className="sm:hidden space-y-4">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start mb-3">
                <img 
                  className="h-16 w-16 rounded-md object-cover mr-3"
                  src={item.imageUrl || 'https://via.placeholder.com/100'} 
                  alt={item.name} 
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category} • {item.location}</p>
                </div>
                <div className="flex flex-col space-y-1 ml-2">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAvailabilityBadgeClass(item.availability)}`}>
                    {item.availability || 'Unknown'}
                  </span>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getApprovalBadgeClass(item.approvalStatus)}`}>
                    {item.approvalStatus || 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm">
                  <span className="text-gray-500">Owner:</span> {item.ownerName}
                </div>
                <div className="text-sm font-medium">
                  <span className="text-gray-500">Price:</span> ${item.pricePerDay?.toFixed(2)}/day
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <Link to={`/admin/equipment/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900 p-1" title="Edit">
                    <FaEdit size={18} />
                  </Link>
                  <button onClick={() => confirmDelete(item)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                    <FaTrash size={18} />
                  </button>
                </div>
                
                {item.approvalStatus === 'Pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApproveEquipment(item.id)}
                      disabled={isProcessing}
                      className="bg-green-100 text-green-600 hover:bg-green-200 p-2 rounded-full"
                      title="Approve"
                    >
                      <FaCheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleRejectEquipment(item.id)}
                      disabled={isProcessing}
                      className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full"
                      title="Reject"
                    >
                      <FaTimesCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
            No equipment found matching your criteria.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-md max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete <span className="font-medium text-gray-900">{equipmentToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={deleteEquipment}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 w-full sm:w-auto"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" /> Processing...
                  </span>
                ) : 'Delete Equipment'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default EquipmentManagement; 