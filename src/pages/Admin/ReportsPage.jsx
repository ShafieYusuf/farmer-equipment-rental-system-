import React, { useState, useEffect } from 'react';
import { FaDownload, FaFilter } from 'react-icons/fa';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
    { name: 'Aug', revenue: 4000 },
    { name: 'Sep', revenue: 2500 },
    { name: 'Oct', revenue: 1500 },
    { name: 'Nov', revenue: 2000 },
    { name: 'Dec', revenue: 2200 },
  ];

  const equipmentData = [
    { name: 'Tractors', value: 35 },
    { name: 'Harvesters', value: 20 },
    { name: 'Seeders', value: 15 },
    { name: 'Irrigation', value: 10 },
    { name: 'Drones', value: 20 },
  ];

  const bookingData = [
    { name: 'Jan', bookings: 65 },
    { name: 'Feb', bookings: 59 },
    { name: 'Mar', bookings: 80 },
    { name: 'Apr', bookings: 81 },
    { name: 'May', bookings: 56 },
    { name: 'Jun', bookings: 55 },
    { name: 'Jul', bookings: 40 },
    { name: 'Aug', bookings: 70 },
    { name: 'Sep', bookings: 90 },
    { name: 'Oct', bookings: 110 },
    { name: 'Nov', bookings: 95 },
    { name: 'Dec', bookings: 85 },
  ];

  const userGrowthData = [
    { name: 'Jan', users: 10 },
    { name: 'Feb', users: 25 },
    { name: 'Mar', users: 45 },
    { name: 'Apr', users: 70 },
    { name: 'May', users: 90 },
    { name: 'Jun', users: 120 },
    { name: 'Jul', users: 150 },
    { name: 'Aug', users: 190 },
    { name: 'Sep', users: 240 },
    { name: 'Oct', users: 280 },
    { name: 'Nov', users: 320 },
    { name: 'Dec', users: 370 },
  ];

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRange, activeTab]);

  const downloadReport = () => {
    // In a real app, this would generate a CSV or PDF report
    alert('Report download functionality would be implemented here');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'revenue':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="h-80 w-full flex items-center justify-center">
                <div className="text-gray-500">
                  Revenue chart visualization would be displayed here.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Total Revenue</h3>
                <p className="text-2xl font-bold text-green-600">$32,450</p>
                <p className="text-sm text-gray-500">+12% from previous period</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Average Transaction</h3>
                <p className="text-2xl font-bold text-blue-600">$245.50</p>
                <p className="text-sm text-gray-500">-3% from previous period</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Projected Revenue</h3>
                <p className="text-2xl font-bold text-purple-600">$41,200</p>
                <p className="text-sm text-gray-500">Based on current growth</p>
              </div>
            </div>
          </div>
        );
      case 'equipment':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Equipment Distribution</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 w-full flex items-center justify-center">
                  <div className="text-gray-500">
                    Equipment pie chart would be displayed here.
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Equipment Statistics</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {equipmentData.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(Math.random() * 40) + 60}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="h-80 w-full flex items-center justify-center">
                <div className="text-gray-500">
                  Bookings line chart would be displayed here.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Total Bookings</h3>
                <p className="text-2xl font-bold text-indigo-600">876</p>
                <p className="text-sm text-gray-500">+18% from previous period</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Average Duration</h3>
                <p className="text-2xl font-bold text-orange-600">4.2 days</p>
                <p className="text-sm text-gray-500">+0.5 days from previous period</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Completion Rate</h3>
                <p className="text-2xl font-bold text-green-600">94%</p>
                <p className="text-sm text-gray-500">+2% from previous period</p>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="h-80 w-full flex items-center justify-center">
                <div className="text-gray-500">
                  User growth line chart would be displayed here.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">370</p>
                <p className="text-sm text-gray-500">+15% from previous period</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Active Users</h3>
                <p className="text-2xl font-bold text-green-600">285</p>
                <p className="text-sm text-gray-500">77% of total users</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">New Sign-ups</h3>
                <p className="text-2xl font-bold text-purple-600">48</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive data insights for the platform</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="relative inline-block">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaFilter size={12} />
            </div>
          </div>
          
          <button
            onClick={downloadReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaDownload className="mr-2" size={14} />
            Download Report
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('revenue')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'revenue'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'equipment'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Equipment
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 