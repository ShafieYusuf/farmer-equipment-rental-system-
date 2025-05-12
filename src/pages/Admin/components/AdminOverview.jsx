import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaTractor, FaCalendarAlt, FaChartLine, 
  FaExclamationCircle, FaCheck, FaMoneyBillWave, FaCog,
  FaArrowUp
} from 'react-icons/fa';

const AdminOverview = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const statsScrollRef = useRef(null);
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalOwners: 0,
    totalEquipment: 0,
    activeBookings: 0,
    pendingApprovals: 0,
    totalTransactions: 0,
    platformRevenue: 0,
    recentIssues: 0
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
      setStats({
        totalFarmers: 156,
        totalOwners: 42,
        totalEquipment: 127,
        activeBookings: 38,
        pendingApprovals: 7,
        totalTransactions: 245,
        platformRevenue: 12586.75,
        recentIssues: 3
      });
      setLoading(false);
    }, 1000);

    // Scroll event listener for scroll-to-top button
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

  const cards = [
    { 
      title: 'User Management',
      icon: <FaUsers className="text-blue-600" />,
      description: 'Manage farmers and equipment owners',
      stats: `${stats.totalFarmers} farmers, ${stats.totalOwners} owners`,
      link: '/admin/users',
      color: 'blue'
    },
    { 
      title: 'Equipment Management',
      icon: <FaTractor className="text-indigo-600" />,
      description: 'Manage equipment listings',
      stats: `${stats.totalEquipment} equipment, ${stats.pendingApprovals} pending approvals`,
      link: '/admin/equipment',
      color: 'indigo'
    },
    { 
      title: 'Booking Management',
      icon: <FaCalendarAlt className="text-purple-600" />,
      description: 'View and manage bookings',
      stats: `${stats.activeBookings} active bookings`,
      link: '/admin/bookings',
      color: 'purple'
    },
    { 
      title: 'Transactions',
      icon: <FaMoneyBillWave className="text-green-600" />,
      description: 'Track and manage all financial transactions',
      stats: `${stats.totalTransactions} transactions, $${stats.platformRevenue.toFixed(2)} revenue`,
      link: '/admin/transactions',
      color: 'green'
    },
    { 
      title: 'Reports & Analytics',
      icon: <FaChartLine className="text-yellow-600" />,
      description: 'View platform performance data',
      stats: 'Revenue, usage, and growth stats',
      link: '/admin/reports',
      color: 'yellow'
    },
    { 
      title: 'System Issues',
      icon: <FaExclamationCircle className="text-red-600" />,
      description: 'Manage system issues and reports',
      stats: `${stats.recentIssues} issues require attention`,
      link: '/admin/issues',
      color: 'red'
    },
    { 
      title: 'Settings',
      icon: <FaCog className="text-gray-600" />,
      description: 'Configure platform settings',
      stats: 'Commission rates, policies, etc.',
      link: '/admin/settings',
      color: 'gray'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Admin Dashboard</h1>
      
      {/* Stats Summary - Horizontally scrollable on mobile */}
      <div className="mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div 
          ref={statsScrollRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto hide-scrollbar pb-2 sm:pb-0 sm:overflow-visible"
        >
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600 mr-3 sm:mr-4">
                <FaMoneyBillWave className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Platform Revenue</p>
                <p className="text-lg sm:text-2xl font-bold">${stats.platformRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 sm:mr-4">
                <FaUsers className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.totalFarmers + stats.totalOwners}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 text-indigo-600 mr-3 sm:mr-4">
                <FaTractor className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Equipment</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.totalEquipment}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600 mr-3 sm:mr-4">
                <FaCalendarAlt className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Active Bookings</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.activeBookings}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator for small screens */}
        <div className="flex justify-center mt-2 sm:hidden">
          <div className="flex space-x-1">
            <div className="w-8 h-1 rounded-full bg-primary"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
      
      {/* Admin Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <Link key={index} to={card.link} className="block">
            <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 sm:border-l-0 sm:border-t-4 border-${card.color}-500 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-full bg-${card.color}-100 mr-3 sm:mr-4`}>
                  {card.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{card.description}</p>
              <p className="text-xs sm:text-sm text-gray-500">{card.stats}</p>
            </div>
          </Link>
        ))}
      </div>
      
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

export default AdminOverview; 