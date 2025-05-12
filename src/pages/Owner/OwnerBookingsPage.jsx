import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaClock, FaArrowLeft, FaExclamationCircle, FaUser, FaTractor, FaCalendarCheck, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      equipmentName: 'Combine Harvester',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'John Smith',
      farmerPhone: '(555) 123-4567',
      farmerEmail: 'john@example.com',
      farmLocation: '123 Farm Road, Agriville',
      requestDate: '2023-06-10',
      startDate: '2023-06-20',
      endDate: '2023-06-25',
      totalDays: 5,
      totalAmount: 1250,
      serviceFee: 125,
      netAmount: 1125,
      status: 'pending',
      notes: 'First-time renter, needs the equipment for wheat harvesting.'
    },
    {
      id: 2,
      equipmentName: 'Tractor',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'Sarah Johnson',
      farmerPhone: '(555) 234-5678',
      farmerEmail: 'sarah@example.com',
      farmLocation: '456 Country Lane, Farmville',
      requestDate: '2023-06-12',
      startDate: '2023-06-15',
      endDate: '2023-06-19',
      totalDays: 5,
      totalAmount: 750,
      serviceFee: 75,
      netAmount: 675,
      status: 'approved',
      notes: 'Reliable renter, has used your equipment before.'
    },
    {
      id: 3,
      equipmentName: 'Seed Drill',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'Michael Brown',
      farmerPhone: '(555) 345-6789',
      farmerEmail: 'michael@example.com',
      farmLocation: '789 Rural Route, Cropland',
      requestDate: '2023-06-08',
      startDate: '2023-06-22',
      endDate: '2023-06-25',
      totalDays: 3,
      totalAmount: 300,
      serviceFee: 30,
      netAmount: 270,
      status: 'completed',
      notes: 'Equipment returned in excellent condition.'
    },
    {
      id: 4,
      equipmentName: 'Rotavator',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'Emily Davis',
      farmerPhone: '(555) 456-7890',
      farmerEmail: 'emily@example.com',
      farmLocation: '101 Harvest Drive, Growtown',
      requestDate: '2023-06-14',
      startDate: '2023-06-30',
      endDate: '2023-07-02',
      totalDays: 3,
      totalAmount: 240,
      serviceFee: 24,
      netAmount: 216,
      status: 'pending',
      notes: 'New user, requesting delivery if possible.'
    },
    {
      id: 5,
      equipmentName: 'Disc Harrow',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'Robert Wilson',
      farmerPhone: '(555) 567-8901',
      farmerEmail: 'robert@example.com',
      farmLocation: '202 Meadow Lane, Fieldsville',
      requestDate: '2023-06-05',
      startDate: '2023-06-18',
      endDate: '2023-06-19',
      totalDays: 2,
      totalAmount: 240,
      serviceFee: 24,
      netAmount: 216,
      status: 'cancelled',
      notes: 'Farmer found alternative equipment.'
    },
    {
      id: 6,
      equipmentName: 'Sprayer',
      equipmentImage: 'https://via.placeholder.com/80',
      farmerName: 'Susan Miller',
      farmerPhone: '(555) 678-9012',
      farmerEmail: 'susan@example.com',
      farmLocation: '303 Ranch Road, Sproutville',
      requestDate: '2023-06-15',
      startDate: '2023-07-01',
      endDate: '2023-07-03',
      totalDays: 3,
      totalAmount: 270,
      serviceFee: 27,
      netAmount: 243,
      status: 'approved',
      notes: 'Regular customer, pays on time.'
    },
  ];

  // Load mock data on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 800);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (bookings.length === 0) return;
    
    let result = [...bookings];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(booking => 
        booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        booking.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(booking => booking.status === filterStatus);
    }
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, filterStatus]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // View booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Update booking status
  const updateBookingStatus = (id, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    let icon = null;
    
    switch(status) {
      case 'pending':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        icon = <FaClock className="mr-1" />;
        break;
      case 'approved':
        badgeClass = 'bg-blue-100 text-blue-800';
        icon = <FaCalendarCheck className="mr-1" />;
        break;
      case 'completed':
        badgeClass = 'bg-green-100 text-green-800';
        icon = <FaCheckCircle className="mr-1" />;
        break;
      case 'cancelled':
        badgeClass = 'bg-red-100 text-red-800';
        icon = <FaTimesCircle className="mr-1" />;
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Booking Details Modal
  const BookingDetailsModal = () => {
    if (!selectedBooking) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FaTractor className="mr-2 text-amber-600" /> Equipment
              </h3>
              <div className="flex items-center mb-3">
                <img 
                  src={selectedBooking.equipmentImage} 
                  alt={selectedBooking.equipmentName} 
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <div>
                  <div className="font-medium">{selectedBooking.equipmentName}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Rental Period:</span>
                  <div className="text-gray-900">
                    {formatDate(selectedBooking.startDate)} - {formatDate(selectedBooking.endDate)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Total Days:</span>
                  <div className="text-gray-900">{selectedBooking.totalDays} days</div>
                </div>
                <div>
                  <span className="text-gray-500">Booking Date:</span>
                  <div className="text-gray-900">{formatDate(selectedBooking.requestDate)}</div>
                </div>
              </div>
            </div>
            
            {/* Farmer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FaUser className="mr-2 text-amber-600" /> Farmer
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-2" />
                  <div className="text-gray-900">{selectedBooking.farmerName}</div>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-400 mr-2" />
                  <div className="text-gray-900">{selectedBooking.farmerPhone}</div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <div className="text-gray-900">{selectedBooking.farmerEmail}</div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-400 mr-2 mt-1" />
                  <div className="text-gray-900">{selectedBooking.farmLocation}</div>
                </div>
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-medium">${selectedBooking.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Fee (10%):</span>
                  <span className="text-red-600">-${selectedBooking.serviceFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-gray-700 font-medium">Net Earnings:</span>
                  <span className="font-medium">${selectedBooking.netAmount}</span>
                </div>
              </div>
            </div>
            
            {/* Status & Actions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Status & Actions</h3>
              <div className="mb-4">
                <span className="text-gray-500">Current Status:</span>
                <div className="mt-1">
                  <StatusBadge status={selectedBooking.status} />
                </div>
              </div>
              <div className="space-y-2">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateBookingStatus(selectedBooking.id, 'approved')}
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <FaCheckCircle className="mr-2" /> Approve Request
                    </button>
                    <button 
                      onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                      className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center"
                    >
                      <FaTimesCircle className="mr-2" /> Reject Request
                    </button>
                  </>
                )}
                {selectedBooking.status === 'approved' && (
                  <button 
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FaCheckCircle className="mr-2" /> Mark as Completed
                  </button>
                )}
              </div>
            </div>
            
            {/* Notes */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-700">{selectedBooking.notes || 'No notes available.'}</p>
            </div>
          </div>
          
          <div className="mt-6 text-right">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link to="/owner/dashboard" className="text-amber-600 hover:text-amber-700 flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Rental Requests</h1>
          <p className="text-gray-600 mt-1">Manage all booking requests for your equipment</p>
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
                placeholder="Search by equipment or farmer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Bookings List */}
        <div className="p-6">
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="border rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-amber-600 mr-2" />
                        <span className="text-sm font-medium">
                          Request Date: {formatDate(booking.requestDate)}
                        </span>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={booking.equipmentImage} 
                          alt={booking.equipmentName} 
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.equipmentName}</h3>
                          <p className="text-sm text-gray-600">Farmer: {booking.farmerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Rental Period:</span><br />
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Duration:</span> {booking.totalDays} days
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Total Amount:</span> ${booking.totalAmount}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Your Earnings:</span> ${booking.netAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => viewBookingDetails(booking)}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaExclamationCircle className="mx-auto text-gray-400 text-4xl mb-4" />
              <p className="text-gray-500">No bookings found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified) */}
        {filteredBookings.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredBookings.length}</span> of <span className="font-medium">{bookings.length}</span> bookings
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
      
      {/* Booking Details Modal */}
      {showDetailsModal && <BookingDetailsModal />}
    </div>
  );
};

export default OwnerBookingsPage; 