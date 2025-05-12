import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaEye, FaCheck, FaTimes, FaExclamationTriangle, FaArrowUp } from 'react-icons/fa';

// Mock booking data
const mockBookings = [
  {
    id: 'B1001',
    equipmentId: 'E1001',
    equipmentName: 'John Deere 6155M Tractor',
    farmerName: 'John Smith',
    farmerEmail: 'john.smith@example.com',
    farmerPhone: '(555) 123-4567',
    startDate: '2023-08-15',
    endDate: '2023-08-18',
    totalDays: 3,
    totalAmount: 450,
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: '2023-08-10'
  },
  {
    id: 'B1002',
    equipmentId: 'E1002',
    equipmentName: 'Kubota L3901 Compact Tractor',
    farmerName: 'Sarah Johnson',
    farmerEmail: 'sarah.j@example.com',
    farmerPhone: '(555) 987-6543',
    startDate: '2023-08-20',
    endDate: '2023-08-25',
    totalDays: 5,
    totalAmount: 550,
    status: 'Active',
    paymentStatus: 'Paid',
    createdAt: '2023-08-15'
  },
  {
    id: 'B1003',
    equipmentId: 'E1005',
    equipmentName: 'Massey Ferguson 4710 Tractor',
    farmerName: 'Robert Chen',
    farmerEmail: 'r.chen@example.com',
    farmerPhone: '(555) 333-2222',
    startDate: '2023-09-05',
    endDate: '2023-09-10',
    totalDays: 5,
    totalAmount: 675,
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    createdAt: '2023-08-28'
  },
  {
    id: 'B1004',
    equipmentId: 'E1003',
    equipmentName: 'Case IH Combine Harvester',
    farmerName: 'Lisa Martinez',
    farmerEmail: 'lisa.m@example.com',
    farmerPhone: '(555) 444-5555',
    startDate: '2023-10-01',
    endDate: '2023-10-05',
    totalDays: 4,
    totalAmount: 1300,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    createdAt: '2023-09-15'
  },
  {
    id: 'B1005',
    equipmentId: 'E1004',
    equipmentName: 'Kinze 3660 16 Row Planter',
    farmerName: 'David Wilson',
    farmerEmail: 'david.w@example.com',
    farmerPhone: '(555) 777-8888',
    startDate: '2023-10-10',
    endDate: '2023-10-12',
    totalDays: 2,
    totalAmount: 400,
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    createdAt: '2023-09-30'
  }
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  // Handle toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Handle booking approval
  const approveBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Approved' } : booking
    ));
    // Add success notification
    alert("Booking approved successfully");
  };

  // Handle booking rejection
  const rejectBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Rejected' } : booking
    ));
    // Add success notification
    alert("Booking rejected");
  };

  // Handle view booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Handle close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
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

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.farmerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        booking.status.toLowerCase() === statusFilter.toLowerCase();
      
      // Payment status filter
      const matchesPayment = paymentFilter === 'all' || 
        booking.paymentStatus.toLowerCase().includes(paymentFilter.toLowerCase());

      // Date filter (simplified for demonstration)
      let matchesDate = true;
      const today = new Date();
      const bookingStart = new Date(booking.startDate);
      
      if (dateFilter === 'upcoming') {
        matchesDate = bookingStart > today;
      } else if (dateFilter === 'ongoing') {
        const bookingEnd = new Date(booking.endDate);
        matchesDate = bookingStart <= today && bookingEnd >= today;
      } else if (dateFilter === 'past') {
        const bookingEnd = new Date(booking.endDate);
        matchesDate = bookingEnd < today;
      }
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
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
  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status badge styling
  const getPaymentBadgeClass = (status) => {
    if (status.toLowerCase().includes('paid')) {
      return 'bg-green-100 text-green-800';
    } else if (status.toLowerCase().includes('awaiting')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status.toLowerCase().includes('refunded')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Booking Management</h1>
        <div className="flex w-full sm:w-auto space-x-2">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            Export Bookings
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 sm:mb-6">
        <div className="mb-4 flex justify-between items-center sm:hidden">
          <div className="relative flex-1 mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={toggleMobileFilters}
            className="bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded flex items-center"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>

        {/* Mobile Filters (toggleable) */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:hidden space-y-3`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="awaiting">Awaiting Payment</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <select
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-3 py-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Form */}
          <div>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Status Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          {/* Payment Status Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="awaiting">Awaiting Payment</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          
          {/* Date Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table for Desktop */}
      <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.equipmentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div className="font-medium">{booking.farmerName}</div>
                    <div className="text-xs">{booking.farmerEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>Start: {booking.startDate}</div>
                    <div>End: {booking.endDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${booking.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => viewBookingDetails(booking)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEye />
                    </button>
                    {booking.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => approveBooking(booking.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => rejectBooking(booking.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes />
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

      {/* Mobile Booking Cards */}
      <div className="sm:hidden space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-bold text-gray-900">{booking.id}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => viewBookingDetails(booking)}
                    className="text-indigo-600 hover:text-indigo-900 p-1"
                  >
                    <FaEye />
                  </button>
                  {booking.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => approveBooking(booking.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => rejectBooking(booking.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <h3 className="font-medium mb-2 line-clamp-1">{booking.equipmentName}</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Farmer:</span>
                  <span className="ml-1 text-gray-900">{booking.farmerName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <span className="ml-1 font-medium text-gray-900">${booking.totalAmount}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Dates:</span>
                  <span className="ml-1 text-gray-900">{booking.startDate} to {booking.endDate}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
            No bookings found matching your criteria.
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                <button 
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Booking Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Booking ID:</span>
                      <span className="font-medium">{selectedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentBadgeClass(selectedBooking.paymentStatus)}`}>
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span>{selectedBooking.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date:</span>
                      <span>{selectedBooking.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Days:</span>
                      <span>{selectedBooking.totalDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount:</span>
                      <span className="font-medium">${selectedBooking.totalAmount}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Equipment & Farmer</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Equipment ID:</span>
                      <span className="ml-2">{selectedBooking.equipmentId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Equipment:</span>
                      <span className="ml-2 font-medium">{selectedBooking.equipmentName}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-gray-500">Farmer Name:</span>
                      <span className="ml-2 font-medium">{selectedBooking.farmerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2">{selectedBooking.farmerEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2">{selectedBooking.farmerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
                <button
                  onClick={closeDetailsModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedBooking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        approveBooking(selectedBooking.id);
                        closeDetailsModal();
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Approve Booking
                    </button>
                    <button
                      onClick={() => {
                        rejectBooking(selectedBooking.id);
                        closeDetailsModal();
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Reject Booking
                    </button>
                  </>
                )}
              </div>
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

export default BookingManagement; 