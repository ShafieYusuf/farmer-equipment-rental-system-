import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaFilter, FaFileDownload, FaMoneyBillWave, 
  FaCalendarAlt, FaExchangeAlt, FaChevronDown, FaChevronRight,
  FaEye, FaUndoAlt, FaCheckCircle, FaTimesCircle, FaClock,
  FaArrowUp
} from 'react-icons/fa';

const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const statsScrollRef = useRef(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    userRole: '',
    transactionType: '',
    status: '',
    searchTerm: ''
  });

  // Stats summary
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
    platformCommission: 0,
    pendingTransactions: 0,
    failedTransactions: 0
  });

  // Add a reference for filters
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch transactions
    setTimeout(() => {
      const mockTransactions = generateMockTransactions();
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      
      // Calculate summary stats
      const totalAmount = mockTransactions.reduce((sum, trans) => sum + trans.amount, 0);
      const commission = mockTransactions.reduce((sum, trans) => sum + trans.platformFee, 0);
      const pending = mockTransactions.filter(t => t.status === 'Pending').length;
      const failed = mockTransactions.filter(t => t.status === 'Failed').length;
      
      setStats({
        totalTransactions: mockTransactions.length,
        totalRevenue: totalAmount,
        platformCommission: commission,
        pendingTransactions: pending,
        failedTransactions: failed
      });
      
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

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...transactions];
    
    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.dateFrom));
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.dateTo));
    }
    
    // Apply role filter
    if (filters.userRole) {
      filtered = filtered.filter(t => t.userRole === filters.userRole);
    }
    
    // Apply type filter
    if (filters.transactionType) {
      filtered = filtered.filter(t => t.type === filters.transactionType);
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    
    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.id.toLowerCase().includes(term) ||
        t.userName.toLowerCase().includes(term) ||
        t.equipment.toLowerCase().includes(term)
      );
    }
    
    setFilteredTransactions(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      userRole: '',
      transactionType: '',
      status: '',
      searchTerm: ''
    });
    setFilteredTransactions(transactions);
  };

  // Export transactions as CSV
  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Date",
      "User Role",
      "User Name",
      "Equipment",
      "Type",
      "Amount",
      "Platform Fee",
      "Status",
      "Payment Method"
    ].join(",");
    
    const rows = filteredTransactions.map(t => [
      t.id,
      t.date,
      t.userRole,
      t.userName,
      t.equipment,
      t.type,
      t.amount,
      t.platformFee,
      t.status,
      t.paymentMethod
    ].join(","));
    
    const csv = [headers, ...rows].join("\\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // View transaction details
  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Process refund (mock function)
  const processRefund = (transactionId) => {
    // In a real app, this would call an API
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, status: 'Refunded' } : t
    ));
    setFilteredTransactions(filteredTransactions.map(t => 
      t.id === transactionId ? { ...t, status: 'Refunded' } : t
    ));
    setSelectedTransaction(null);
    alert(`Refund processed for transaction ${transactionId}`);
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Success':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FaCheckCircle className="mr-1" /> {status}
        </span>;
      case 'Pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FaClock className="mr-1" /> {status}
        </span>;
      case 'Failed':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FaTimesCircle className="mr-1" /> {status}
        </span>;
      case 'Refunded':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FaUndoAlt className="mr-1" /> {status}
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {status}
        </span>;
    }
  };

  // Generate mock transactions for demonstration
  const generateMockTransactions = () => {
    const types = ['Payment', 'Payout', 'Refund', 'Deposit'];
    const statuses = ['Success', 'Pending', 'Failed', 'Refunded'];
    const paymentMethods = ['Stripe', 'PayPal', 'Bank Transfer', 'Mobile Money'];
    const farmerNames = ['John Smith', 'Maria Garcia', 'Wei Chen', 'Fatima Ahmed', 'Robert Johnson'];
    const ownerNames = ['Farm Supplies Inc.', 'Green Fields Equipment', 'Harvest Technology', 'AgriMasters Ltd', 'Rural Solutions'];
    const equipments = ['Tractor - John Deere', 'Harvester - Case IH', 'Plow - Kubota', 'Seeder - New Holland', 'Irrigation System'];
    
    return Array.from({ length: 50 }, (_, i) => {
      const isPayment = Math.random() > 0.5;
      const amount = Math.floor(Math.random() * 900) + 100;
      const platformFee = Math.floor(amount * 0.1);
      const userRole = isPayment ? 'Farmer' : 'Owner';
      
      return {
        id: `TRX-${100000 + i}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        userRole,
        userName: userRole === 'Farmer' ? farmerNames[Math.floor(Math.random() * farmerNames.length)] : ownerNames[Math.floor(Math.random() * ownerNames.length)],
        equipment: equipments[Math.floor(Math.random() * equipments.length)],
        type: types[Math.floor(Math.random() * types.length)],
        amount,
        platformFee,
        finalAmount: amount - platformFee,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        bookingId: `BKG-${200000 + i}`,
        rentalPeriod: `${new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} to ${new Date(Date.now() + Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`,
        notes: Math.random() > 0.7 ? 'Customer requested early termination.' : ''
      };
    });
  };

  // Add toggle mobile filters function after the scrollToTop function
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (selectedTransaction) {
    // Transaction Detail View
    return (
      <div className="container-custom py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <button 
            onClick={() => setSelectedTransaction(null)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 sm:mb-0"
          >
            <FaChevronRight className="transform rotate-180 mr-2" /> Back to Transactions
          </button>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button 
              className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 flex items-center justify-center"
              onClick={() => processRefund(selectedTransaction.id)}
              disabled={selectedTransaction.status === 'Refunded' || selectedTransaction.status === 'Failed'}
            >
              <FaUndoAlt className="mr-2" /> Issue Refund
            </button>
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center">
              <FaFileDownload className="mr-2" /> Export Receipt
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 text-white p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold">Transaction #{selectedTransaction.id}</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-3 sm:space-y-0">
              <div className="w-full sm:w-auto">
                <p className="text-xs sm:text-sm opacity-80">Date</p>
                <p className="font-semibold">{selectedTransaction.date}</p>
              </div>
              <div className="w-full sm:w-auto">
                <p className="text-xs sm:text-sm opacity-80">Status</p>
                <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
              </div>
              <div className="w-full sm:w-auto">
                <p className="text-xs sm:text-sm opacity-80">Amount</p>
                <p className="font-semibold text-lg sm:text-xl">${selectedTransaction.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-700">Transaction Details</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Transaction Type</p>
                    <p className="font-medium">{selectedTransaction.type}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{selectedTransaction.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Booking Reference</p>
                    <p className="font-medium text-blue-600 hover:underline cursor-pointer">{selectedTransaction.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Rental Period</p>
                    <p className="font-medium">{selectedTransaction.rentalPeriod}</p>
                  </div>
                  {selectedTransaction.notes && (
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Notes</p>
                      <p className="font-medium">{selectedTransaction.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-700">Financial Breakdown</h2>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Amount</span>
                      <span className="font-medium">${selectedTransaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Commission (10%)</span>
                      <span className="font-medium">-${selectedTransaction.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="font-semibold">Final Amount</span>
                      <span className="font-bold">${selectedTransaction.finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-bold mt-5 sm:mt-6 mb-3 sm:mb-4 text-gray-700">User Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">User Type</p>
                    <p className="font-medium">{selectedTransaction.userRole}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedTransaction.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Equipment</p>
                    <p className="font-medium">{selectedTransaction.equipment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Transaction Management</h1>
        <div className="flex w-full sm:w-auto space-x-2">
          <button 
            onClick={exportCSV}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
          >
            <FaFileDownload className="mr-2" /> Export CSV
          </button>
        </div>
      </div>
      
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
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 sm:mr-4">
                <FaExchangeAlt className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Transactions</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.totalTransactions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600 mr-3 sm:mr-4">
                <FaMoneyBillWave className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Platform Commission</p>
                <p className="text-lg sm:text-2xl font-bold">${stats.platformCommission.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3 sm:mr-4">
                <FaClock className="text-base sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Pending Transactions</p>
                <p className="text-lg sm:text-2xl font-bold">{stats.pendingTransactions}</p>
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

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {/* Mobile Search and Filter Toggle */}
        <div className="mb-4 flex justify-between items-center sm:hidden">
          <div className="relative flex-1 mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange({ target: { name: 'searchTerm', value: e.target.value } })}
            />
          </div>
          <button 
            onClick={toggleMobileFilters}
            className="bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        {/* Mobile Filters (collapsible) */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:hidden space-y-3 mb-4`}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
            <select
              name="userRole"
              value={filters.userRole}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Roles</option>
              <option value="Farmer">Farmer</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <select
              name="transactionType"
              value={filters.transactionType}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Types</option>
              <option value="Payment">Payment</option>
              <option value="Payout">Payout</option>
              <option value="Refund">Refund</option>
              <option value="Deposit">Deposit</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <button
              onClick={applyFilters}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden sm:block">
          <div className="flex items-center mb-4">
            <div className="relative flex-grow mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions by ID, user, or equipment..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border ${showFilters ? 'bg-gray-200 border-gray-300' : 'border-gray-300'} rounded-lg`}
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {showFilters ? <FaChevronDown className="ml-2" /> : <FaChevronRight className="ml-2" />}
            </button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                <select
                  name="userRole"
                  value={filters.userRole}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Roles</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <select
                  name="transactionType"
                  value={filters.transactionType}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Types</option>
                  <option value="Payment">Payment</option>
                  <option value="Payout">Payout</option>
                  <option value="Refund">Refund</option>
                  <option value="Deposit">Deposit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="md:col-span-5 flex justify-end space-x-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Clear Filters
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transactions Table - Desktop View */}
      <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div className="font-medium text-gray-900">{transaction.userName}</div>
                    <div className="text-xs text-gray-500">{transaction.userRole}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.equipment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => viewTransactionDetails(transaction)}
                    className="text-green-600 hover:text-green-900 flex items-center justify-end"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Transaction Cards */}
      <div className="sm:hidden space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-bold text-gray-900">{transaction.id}</span>
                </div>
                <div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-base font-medium line-clamp-1">{transaction.type}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">User:</span>
                  <span className="ml-1 text-gray-900">{transaction.userName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Role:</span>
                  <span className="ml-1 text-gray-900">{transaction.userRole}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Equipment:</span>
                  <span className="ml-1 text-gray-900">{transaction.equipment}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium">
                  <span className="text-gray-500">Amount:</span>
                  <span className="ml-1 text-gray-900">${transaction.amount.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => viewTransactionDetails(transaction)}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  <FaEye className="mr-1" /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Transaction Details</h2>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-500 text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              {/* Transaction details content */}
              {/* ... existing code ... */}
              
              <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  Close
                </button>
                {selectedTransaction.status === 'Success' && (
                  <button
                    onClick={() => processRefund(selectedTransaction.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 w-full sm:w-auto"
                  >
                    Process Refund
                  </button>
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

export default TransactionsPage; 