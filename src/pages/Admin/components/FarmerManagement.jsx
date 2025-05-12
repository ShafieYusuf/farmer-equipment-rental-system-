import { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown, FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaFilter, FaArrowUp } from 'react-icons/fa';

// Mock farmer data
const mockFarmers = [
  {
    id: 'F1001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'Cedar Rapids, IA',
    registrationDate: '2023-05-10',
    equipmentCount: 3,
    totalRentals: 12,
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    lastLogin: '2023-08-25'
  },
  {
    id: 'F1002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    location: 'Des Moines, IA',
    registrationDate: '2023-06-15',
    equipmentCount: 5,
    totalRentals: 8,
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    lastLogin: '2023-08-27'
  },
  {
    id: 'F1003',
    name: 'Robert Chen',
    email: 'r.chen@example.com',
    phone: '(555) 333-2222',
    location: 'Ames, IA',
    registrationDate: '2023-07-05',
    equipmentCount: 2,
    totalRentals: 3,
    verificationStatus: 'Pending',
    accountStatus: 'Active',
    lastLogin: '2023-08-22'
  },
  {
    id: 'F1004',
    name: 'Lisa Martinez',
    email: 'lisa.m@example.com',
    phone: '(555) 444-5555',
    location: 'Sioux City, IA',
    registrationDate: '2023-07-22',
    equipmentCount: 0,
    totalRentals: 0,
    verificationStatus: 'Verified',
    accountStatus: 'Inactive',
    lastLogin: '2023-08-10'
  },
  {
    id: 'F1005',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '(555) 777-8888',
    location: 'Davenport, IA',
    registrationDate: '2023-08-01',
    equipmentCount: 1,
    totalRentals: 2,
    verificationStatus: 'Rejected',
    accountStatus: 'Active',
    lastLogin: '2023-08-26'
  }
];

const FarmerManagement = () => {
  const [farmers, setFarmers] = useState(mockFarmers);
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [accountStatusFilter, setAccountStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'descending' });
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // View farmer details
  const viewFarmerDetails = (farmer) => {
    setSelectedFarmer(farmer);
    setShowDetailsModal(true);
  };

  // Edit farmer
  const editFarmer = (farmer) => {
    setSelectedFarmer(farmer);
    setShowEditModal(true);
  };

  // Delete farmer modal
  const confirmDelete = (farmer) => {
    setSelectedFarmer(farmer);
    setShowDeleteModal(true);
  };

  // Handle farmer deletion
  const deleteFarmer = () => {
    setFarmers(farmers.filter(farmer => farmer.id !== selectedFarmer.id));
    setShowDeleteModal(false);
  };

  // Handle farmer verification
  const verifyFarmer = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { ...farmer, verificationStatus: 'Verified' } : farmer
    ));
    // Add success notification
    alert("Farmer verified successfully");
  };

  // Handle farmer rejection
  const rejectFarmer = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { ...farmer, verificationStatus: 'Rejected' } : farmer
    ));
    // Add success notification
    alert("Farmer verification rejected");
  };

  // Handle farmer account activation/deactivation
  const toggleAccountStatus = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { 
        ...farmer, 
        accountStatus: farmer.accountStatus === 'Active' ? 'Inactive' : 'Active' 
      } : farmer
    ));
    // Add success notification
    alert("Account status updated successfully");
  };

  // Handle saving edited farmer data
  const saveEditedFarmer = (editedData) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === selectedFarmer.id ? { ...farmer, ...editedData } : farmer
    ));
    setShowEditModal(false);
    // Add success notification
    alert("Farmer information updated successfully");
  };

  // Filter and sort farmers
  const filteredFarmers = farmers
    .filter(farmer => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        farmer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Verification status filter
      const matchesVerification = verificationFilter === 'all' || 
        farmer.verificationStatus.toLowerCase() === verificationFilter.toLowerCase();
      
      // Account status filter
      const matchesAccountStatus = accountStatusFilter === 'all' || 
        farmer.accountStatus.toLowerCase() === accountStatusFilter.toLowerCase();
      
      return matchesSearch && matchesVerification && matchesAccountStatus;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Status badge styling
  const getVerificationBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Account status badge styling
  const getAccountStatusBadgeClass = (status) => {
    return status.toLowerCase() === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Customer Management</h1>
        <button 
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
        >
          Add New Customer
        </button>
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
              placeholder="Search customers..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={accountStatusFilter}
              onChange={(e) => setAccountStatusFilter(e.target.value)}
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {/* Search Form */}
          <div>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers by name, email, or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Verification Status Filter */}
          <div>
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          {/* Account Status Filter */}
          <div>
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={accountStatusFilter}
              onChange={(e) => setAccountStatusFilter(e.target.value)}
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Farmers Table for Desktop */}
      <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment & Rentals
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                    <div className="text-sm text-gray-500">{farmer.email}</div>
                    <div className="text-sm text-gray-500">{farmer.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>Date: {farmer.registrationDate}</div>
                    <div>Last Login: {farmer.lastLogin}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>Equipment: {farmer.equipmentCount}</div>
                    <div>Rentals: {farmer.totalRentals}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerificationBadgeClass(farmer.verificationStatus)}`}>
                      {farmer.verificationStatus}
                    </span>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountStatusBadgeClass(farmer.accountStatus)}`}>
                      {farmer.accountStatus}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => viewFarmerDetails(farmer)} className="text-indigo-600 hover:text-indigo-900" title="View details">
                      <FaEye />
                    </button>
                    <button onClick={() => editFarmer(farmer)} className="text-blue-600 hover:text-blue-900" title="Edit farmer">
                      <FaEdit />
                    </button>
                    <button onClick={() => confirmDelete(farmer)} className="text-red-600 hover:text-red-900" title="Delete farmer">
                      <FaTrash />
                    </button>
                    {farmer.verificationStatus === 'Pending' && (
                      <>
                        <button 
                          onClick={() => verifyFarmer(farmer.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Verify farmer"
                        >
                          <FaCheckCircle />
                        </button>
                        <button 
                          onClick={() => rejectFarmer(farmer.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Reject verification"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => toggleAccountStatus(farmer.id)}
                      className={farmer.accountStatus === 'Active' ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                      title={farmer.accountStatus === 'Active' ? "Deactivate account" : "Activate account"}
                    >
                      {farmer.accountStatus === 'Active' ? <FaTimesCircle /> : <FaCheckCircle />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Farmer Cards */}
      <div className="sm:hidden space-y-4">
        {filteredFarmers.length > 0 ? (
          filteredFarmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{farmer.name}</h3>
                  <p className="text-sm text-gray-500">{farmer.email}</p>
                  <p className="text-xs text-gray-500">{farmer.phone}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerificationBadgeClass(farmer.verificationStatus)}`}>
                    {farmer.verificationStatus}
                  </span>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountStatusBadgeClass(farmer.accountStatus)}`}>
                    {farmer.accountStatus}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Location:</span>
                  <span className="ml-1 text-gray-900">{farmer.location}</span>
                </div>
                <div>
                  <span className="text-gray-500">Registered:</span>
                  <span className="ml-1 text-gray-900">{farmer.registrationDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Equipment:</span>
                  <span className="ml-1 text-gray-900">{farmer.equipmentCount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Rentals:</span>
                  <span className="ml-1 text-gray-900">{farmer.totalRentals}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => viewFarmerDetails(farmer)}
                  className="bg-indigo-100 text-indigo-700 p-2 rounded-md flex items-center text-sm"
                >
                  <FaEye className="mr-1" /> View
                </button>
                <button
                  onClick={() => editFarmer(farmer)}
                  className="bg-blue-100 text-blue-700 p-2 rounded-md flex items-center text-sm"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                {farmer.verificationStatus === 'Pending' && (
                  <>
                    <button
                      onClick={() => verifyFarmer(farmer.id)}
                      className="bg-green-100 text-green-700 p-2 rounded-md flex items-center text-sm"
                    >
                      <FaCheckCircle className="mr-1" /> Verify
                    </button>
                    <button
                      onClick={() => rejectFarmer(farmer.id)}
                      className="bg-red-100 text-red-700 p-2 rounded-md flex items-center text-sm"
                    >
                      <FaTimesCircle className="mr-1" /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => toggleAccountStatus(farmer.id)}
                  className={farmer.accountStatus === 'Active' 
                    ? "bg-red-100 text-red-700 p-2 rounded-md flex items-center text-sm"
                    : "bg-green-100 text-green-700 p-2 rounded-md flex items-center text-sm"
                  }
                >
                  {farmer.accountStatus === 'Active' 
                    ? <><FaTimesCircle className="mr-1" /> Deactivate</>
                    : <><FaCheckCircle className="mr-1" /> Activate</>
                  }
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
            No customers found matching your criteria.
          </div>
        )}
      </div>

      {/* Farmer Details Modal */}
      {showDetailsModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Customer Details</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500 text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {/* Farmer details content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1 sm:col-span-2">
                  <h3 className="font-medium text-gray-900">{selectedFarmer.name}</h3>
                  <p className="text-gray-500">{selectedFarmer.email}</p>
                  <p className="text-gray-500">{selectedFarmer.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Location</h4>
                  <p className="text-gray-900">{selectedFarmer.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Registration Date</h4>
                  <p className="text-gray-900">{selectedFarmer.registrationDate}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Last Login</h4>
                  <p className="text-gray-900">{selectedFarmer.lastLogin}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Equipment Count</h4>
                  <p className="text-gray-900">{selectedFarmer.equipmentCount}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Total Rentals</h4>
                  <p className="text-gray-900">{selectedFarmer.totalRentals}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Verification Status</h4>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerificationBadgeClass(selectedFarmer.verificationStatus)}`}>
                    {selectedFarmer.verificationStatus}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Account Status</h4>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountStatusBadgeClass(selectedFarmer.accountStatus)}`}>
                    {selectedFarmer.accountStatus}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    editFarmer(selectedFarmer);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 w-full sm:w-auto"
                >
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-md max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete the account for <span className="font-medium text-gray-900">{selectedFarmer.name}</span>? This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={deleteFarmer}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 w-full sm:w-auto"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (similar structure to existing modal but with mobile-friendly adjustments) */}
      {showEditModal && selectedFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Edit Farmer: {selectedFarmer.name}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const editedData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                location: formData.get('location'),
                verificationStatus: formData.get('verificationStatus'),
                accountStatus: formData.get('accountStatus')
              };
              saveEditedFarmer(editedData);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedFarmer.name}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedFarmer.email}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={selectedFarmer.phone}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedFarmer.location}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Verification Status</label>
                  <select
                    name="verificationStatus"
                    defaultValue={selectedFarmer.verificationStatus}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Account Status</label>
                  <select
                    name="accountStatus"
                    defaultValue={selectedFarmer.accountStatus}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
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

export default FarmerManagement; 