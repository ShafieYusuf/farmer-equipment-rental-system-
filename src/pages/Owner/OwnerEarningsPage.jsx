import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaCalendarAlt, FaChartBar, FaDollarSign, FaFilter, FaArrowLeft, FaFileInvoiceDollar, FaExclamationCircle } from 'react-icons/fa';

const OwnerEarningsPage = () => {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [filteredEarnings, setFilteredEarnings] = useState([]);
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    pendingPayments: 0,
    completedPayments: 0,
    monthlyEarnings: 0
  });
  const [timeframe, setTimeframe] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock earnings data
  const mockEarnings = [
    {
      id: 1,
      equipmentName: 'Combine Harvester',
      farmerName: 'John Smith',
      rentalPeriod: 'Jun 1 - Jun 5, 2023',
      totalDays: 5,
      amount: 1250,
      serviceFee: 125,
      netAmount: 1125,
      status: 'completed',
      paymentDate: '2023-06-07',
      transactionId: 'TRX-235689'
    },
    {
      id: 2,
      equipmentName: 'Tractor',
      farmerName: 'Sarah Johnson',
      rentalPeriod: 'Jun 10 - Jun 14, 2023',
      totalDays: 5,
      amount: 750,
      serviceFee: 75,
      netAmount: 675,
      status: 'completed',
      paymentDate: '2023-06-15',
      transactionId: 'TRX-241523'
    },
    {
      id: 3,
      equipmentName: 'Seed Drill',
      farmerName: 'Michael Brown',
      rentalPeriod: 'Jun 20 - Jun 22, 2023',
      totalDays: 3,
      amount: 300,
      serviceFee: 30,
      netAmount: 270,
      status: 'pending',
      paymentDate: null,
      transactionId: null
    },
    {
      id: 4,
      equipmentName: 'Rotavator',
      farmerName: 'Emily Davis',
      rentalPeriod: 'May 25 - May 26, 2023',
      totalDays: 2,
      amount: 160,
      serviceFee: 16,
      netAmount: 144,
      status: 'completed',
      paymentDate: '2023-05-28',
      transactionId: 'TRX-198752'
    },
    {
      id: 5,
      equipmentName: 'Plough',
      farmerName: 'David Miller',
      rentalPeriod: 'Apr 15 - Apr 18, 2023',
      totalDays: 4,
      amount: 280,
      serviceFee: 28,
      netAmount: 252,
      status: 'completed',
      paymentDate: '2023-04-20',
      transactionId: 'TRX-187654'
    },
    {
      id: 6,
      equipmentName: 'Sprayer',
      farmerName: 'Linda Wilson',
      rentalPeriod: 'Jul 2 - Jul 3, 2023',
      totalDays: 2,
      amount: 180,
      serviceFee: 18,
      netAmount: 162,
      status: 'pending',
      paymentDate: null,
      transactionId: null
    }
  ];

  // Calculate summary data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEarnings(mockEarnings);
      setFilteredEarnings(mockEarnings);
      
      // Calculate summary
      const totalEarnings = mockEarnings.reduce((total, earning) => total + earning.netAmount, 0);
      const pendingPayments = mockEarnings
        .filter(earning => earning.status === 'pending')
        .reduce((total, earning) => total + earning.netAmount, 0);
      const completedPayments = mockEarnings
        .filter(earning => earning.status === 'completed')
        .reduce((total, earning) => total + earning.netAmount, 0);
      
      // Calculate monthly earnings (current month)
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const monthlyEarnings = mockEarnings
        .filter(earning => {
          if (!earning.paymentDate) return false;
          const paymentDate = new Date(earning.paymentDate);
          return paymentDate.getMonth() + 1 === currentMonth && 
                 paymentDate.getFullYear() === currentYear;
        })
        .reduce((total, earning) => total + earning.netAmount, 0);
      
      setSummary({
        totalEarnings,
        pendingPayments,
        completedPayments,
        monthlyEarnings
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filter earnings based on timeframe
  useEffect(() => {
    if (earnings.length === 0) return;
    
    let filtered = [...earnings];
    
    if (timeframe === 'custom' && startDate && endDate) {
      filtered = filtered.filter(earning => {
        if (!earning.paymentDate) return false;
        const paymentDate = new Date(earning.paymentDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        return paymentDate >= start && paymentDate <= end;
      });
    } else if (timeframe === 'month') {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(earning => {
        if (!earning.paymentDate) return false;
        const paymentDate = new Date(earning.paymentDate);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      });
    } else if (timeframe === 'quarter') {
      const now = new Date();
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const currentYear = now.getFullYear();
      filtered = filtered.filter(earning => {
        if (!earning.paymentDate) return false;
        const paymentDate = new Date(earning.paymentDate);
        const paymentQuarter = Math.floor(paymentDate.getMonth() / 3);
        return paymentQuarter === currentQuarter && 
               paymentDate.getFullYear() === currentYear;
      });
    } else if (timeframe === 'year') {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(earning => {
        if (!earning.paymentDate) return false;
        const paymentDate = new Date(earning.paymentDate);
        return paymentDate.getFullYear() === currentYear;
      });
    }
    
    setFilteredEarnings(filtered);
  }, [earnings, timeframe, startDate, endDate]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    
    switch(status) {
      case 'completed':
        badgeClass = 'bg-green-100 text-green-800';
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

  const downloadReport = () => {
    // In a real app, this would generate and download a CSV/PDF report
    alert('Downloading earnings report...');
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading earnings data...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
              <p className="text-gray-600 mt-1">Track your equipment rental income</p>
            </div>
            <button
              onClick={downloadReport}
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              <FaDownload className="mr-2" />
              Download Report
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                  <FaDollarSign className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
                  <p className="text-2xl font-bold">${summary.totalEarnings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FaFileInvoiceDollar className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Completed Payments</p>
                  <p className="text-2xl font-bold">${summary.completedPayments}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  <FaCalendarAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pending Payments</p>
                  <p className="text-2xl font-bold">${summary.pendingPayments}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FaChartBar className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">This Month</p>
                  <p className="text-2xl font-bold">${summary.monthlyEarnings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <div className="mb-4 md:mb-0">
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                Timeframe
              </label>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  id="timeframe"
                  value={timeframe}
                  onChange={handleTimeframeChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            
            {timeframe === 'custom' && (
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Earnings Table */}
        <div className="overflow-x-auto">
          {filteredEarnings.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rented By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rental Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Fee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Earnings
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{earning.equipmentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{earning.farmerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{earning.rentalPeriod}</div>
                      <div className="text-xs text-gray-500">{earning.totalDays} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${earning.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">-${earning.serviceFee}</div>
                      <div className="text-xs text-gray-500">(10%)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${earning.netAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={earning.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(earning.paymentDate)}</div>
                      {earning.transactionId && (
                        <div className="text-xs text-gray-500">#{earning.transactionId}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center">
              <FaExclamationCircle className="mx-auto text-gray-400 text-4xl mb-4" />
              <p className="text-gray-500">No earnings found for the selected timeframe.</p>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified) */}
        {filteredEarnings.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredEarnings.length}</span> of <span className="font-medium">{earnings.length}</span> transactions
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
      
      {/* Tax Information */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Tax Information</h2>
        <p className="text-gray-600 mb-4">
          For tax purposes, you can download a report of your yearly earnings. 
          Remember that you are responsible for reporting all income earned through the platform.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 mb-2 sm:mb-0"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <button
            onClick={downloadReport}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            <FaDownload className="mr-2" />
            Download Tax Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerEarningsPage; 