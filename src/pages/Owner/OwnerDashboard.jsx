import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTools, FaCalendarAlt, FaDollarSign, FaBell, FaExclamationCircle, FaChartBar, FaStar, FaTractor, FaCheck, FaTimes, FaChartLine, FaArrowUp } from 'react-icons/fa';

const OwnerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEquipment: 0,
    pendingRequests: 0,
    activeRentals: 0,
    totalEarnings: 0,
    monthlyEarnings: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const statsScrollRef = useRef(null);

  useEffect(() => {
    // Simulate API call to fetch owner dashboard data
    setTimeout(() => {
      setStats({
        totalEquipment: 8,
        pendingRequests: 3,
        activeRentals: 2,
        totalEarnings: 2450,
        monthlyEarnings: 820
      });

      setNotifications([
        { id: 1, type: 'request', message: 'New rental request for Combine Harvester', time: '2 hours ago', isRead: false },
        { id: 2, type: 'payment', message: 'Payment received: $350 for Tractor rental', time: 'Yesterday', isRead: false },
        { id: 3, type: 'review', message: '5-star rating received for your Plough', time: '3 days ago', isRead: true },
        { id: 4, type: 'return', message: 'Seed Drill was returned on time', time: '1 week ago', isRead: true }
      ]);

      setPendingRequests([
        { 
          id: 1, 
          equipmentName: 'Combine Harvester',
          image: 'https://via.placeholder.com/80',
          farmerName: 'John Smith',
          requestDate: 'Jun 15, 2023',
          rentalPeriod: 'Jun 20 - Jun 25, 2023',
          amount: 450
        },
        { 
          id: 2, 
          equipmentName: 'Rotavator',
          image: 'https://via.placeholder.com/80',
          farmerName: 'Sarah Johnson',
          requestDate: 'Jun 14, 2023',
          rentalPeriod: 'Jun 18 - Jun 19, 2023',
          amount: 120
        },
        { 
          id: 3, 
          equipmentName: 'Disc Harrow',
          image: 'https://via.placeholder.com/80',
          farmerName: 'Michael Brown',
          requestDate: 'Jun 13, 2023',
          rentalPeriod: 'Jun 22 - Jun 23, 2023',
          amount: 180
        }
      ]);

      setLoading(false);
    }, 1000);
    
    // Scroll event listener
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

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'request': return <FaCalendarAlt className="text-blue-500" />;
      case 'payment': return <FaDollarSign className="text-green-500" />;
      case 'review': return <FaStar className="text-yellow-500" />;
      case 'return': return <FaTools className="text-purple-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const acceptRequest = (id) => {
    // In a real app, this would call an API
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
  };

  const rejectRequest = (id) => {
    // In a real app, this would call an API
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Equipment Owner Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Welcome back, {localStorage.getItem('userName') || 'Owner'}</p>
        </div>
        <Link 
          to="/owner/equipment/add" 
          className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors w-full sm:w-auto"
        >
          <FaPlus className="mr-2" />
          Add New Equipment
        </Link>
      </div>

      {/* Stats Cards - Horizontally scrollable on mobile */}
      <div className="mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div 
          ref={statsScrollRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto hide-scrollbar pb-2 sm:pb-0 sm:overflow-visible"
        >
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[180px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 sm:mr-4">
                <FaTools className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Equipment</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.totalEquipment}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Link to="/owner/equipment" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">View all equipment</Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[180px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-amber-100 text-amber-600 mr-3 sm:mr-4">
                <FaCalendarAlt className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Pending Requests</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.pendingRequests}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Link to="/owner/bookings" className="text-amber-600 hover:text-amber-800 text-xs sm:text-sm">View all requests</Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[180px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600 mr-3 sm:mr-4">
                <FaChartBar className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Active Rentals</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.activeRentals}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Link to="/owner/bookings" className="text-green-600 hover:text-green-800 text-xs sm:text-sm">View active rentals</Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[180px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600 mr-3 sm:mr-4">
                <FaDollarSign className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Earnings</p>
                <p className="text-lg sm:text-2xl font-bold">${stats.totalEarnings}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Link to="/owner/earnings" className="text-purple-600 hover:text-purple-800 text-xs sm:text-sm">View earnings details</Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator for small screens */}
        <div className="flex justify-center mt-2 sm:hidden">
          <div className="flex space-x-1">
            <div className="w-8 h-1 rounded-full bg-amber-600"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Additional Quick Access Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-amber-100 text-amber-600 mr-3 sm:mr-4">
              <FaChartLine className="text-base sm:text-xl" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Analytics Dashboard</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">View detailed performance metrics</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link to="/owner/analytics" className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm">Go to analytics</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Pending Rental Requests */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 className="font-bold text-base sm:text-lg text-gray-800">Pending Rental Requests</h2>
            </div>
            <div className="p-4 sm:p-6">
              {pendingRequests.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {pendingRequests.map(request => (
                    <div key={request.id} className="flex flex-col sm:flex-row border rounded-lg p-3 sm:p-4">
                      <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 text-center sm:text-left">
                        <img src={request.image} alt={request.equipmentName} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded mx-auto sm:mx-0" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="font-medium text-gray-900">{request.equipmentName}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">Requested by: {request.farmerName}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Request date: {request.requestDate}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Rental period: {request.rentalPeriod}</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 mt-1">Amount: ${request.amount}</p>
                          </div>
                          <div className="flex flex-row sm:flex-col justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                            <button 
                              onClick={() => acceptRequest(request.id)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 text-xs sm:text-sm flex-1 sm:flex-auto min-w-[90px] sm:min-w-0"
                            >
                              <FaCheck className="mr-1 sm:mr-2" /> Accept
                            </button>
                            <button 
                              onClick={() => rejectRequest(request.id)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 border border-red-600 text-red-600 rounded flex items-center justify-center hover:bg-red-50 text-xs sm:text-sm flex-1 sm:flex-auto min-w-[90px] sm:min-w-0"
                            >
                              <FaTimes className="mr-1 sm:mr-2" /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FaExclamationCircle className="mx-auto text-gray-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">No pending rental requests</p>
                </div>
              )}
              {pendingRequests.length > 0 && (
                <div className="mt-4 text-center sm:text-right">
                  <Link to="/owner/bookings" className="text-amber-600 hover:text-amber-800 font-medium text-sm">
                    View all requests
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 className="font-bold text-base sm:text-lg text-gray-800">Recent Notifications</h2>
            </div>
            <div className="p-3 sm:p-4">
              {notifications.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 sm:p-4 rounded-lg border ${notification.isRead ? 'bg-gray-50' : 'bg-amber-50 border-amber-200'}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-grow">
                          <p className={`text-xs sm:text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.isRead && (
                          <div className="ml-3 flex-shrink-0">
                            <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FaBell className="mx-auto text-gray-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">No notifications</p>
                </div>
              )}
            </div>
          </div>

          {/* Monthly Earnings Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-md mt-4 sm:mt-6">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 className="font-bold text-base sm:text-lg text-gray-800">Monthly Earnings</h2>
            </div>
            <div className="p-3 sm:p-4">
              <div className="text-center text-gray-700 font-medium py-2 sm:py-3 text-sm sm:text-base">
                ${stats.monthlyEarnings} this month
              </div>
              <div className="h-24 sm:h-32 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-xs sm:text-sm">Monthly earnings chart will appear here</p>
              </div>
              <div className="mt-3 sm:mt-4 text-center sm:text-right">
                <Link to="/owner/earnings" className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                  View detailed earnings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default OwnerDashboard; 