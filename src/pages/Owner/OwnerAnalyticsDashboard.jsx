import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FaCalendarAlt, FaChartLine, FaChartPie, FaChartBar, 
  FaExclamationTriangle, FaInfoCircle, FaLightbulb, FaAngleDown
} from 'react-icons/fa';

const OwnerAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRentals: 0,
    totalIncome: 0,
    totalUsers: 0,
    utilization: 0,
    cancellations: 0
  });

  // Mock data for the charts
  const [rentalPerformanceData, setRentalPerformanceData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [utilizationData, setUtilizationData] = useState([]);
  const [cancellationData, setCancellationData] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch analytics data
    setLoading(true);
    setTimeout(() => {
      // Different data based on the selected time range
      if (timeRange === 'week') {
        // Weekly data - last 7 days
        setRentalPerformanceData([
          { name: 'Mon', tractors: 3, harvesters: 1, plows: 2 },
          { name: 'Tue', tractors: 4, harvesters: 2, plows: 1 },
          { name: 'Wed', tractors: 2, harvesters: 0, plows: 3 },
          { name: 'Thu', tractors: 5, harvesters: 1, plows: 2 },
          { name: 'Fri', tractors: 6, harvesters: 3, plows: 2 },
          { name: 'Sat', tractors: 8, harvesters: 4, plows: 5 },
          { name: 'Sun', tractors: 4, harvesters: 2, plows: 3 }
        ]);

        setIncomeData([
          { name: 'Mon', income: 450 },
          { name: 'Tue', income: 650 },
          { name: 'Wed', income: 400 },
          { name: 'Thu', income: 800 },
          { name: 'Fri', income: 950 },
          { name: 'Sat', income: 1500 },
          { name: 'Sun', income: 1200 }
        ]);

        setUtilizationData([
          { name: 'Tractors', value: 78 },
          { name: 'Harvesters', value: 45 },
          { name: 'Plows', value: 65 },
          { name: 'Seeders', value: 35 },
          { name: 'Irrigation', value: 55 }
        ]);

        setCancellationData([
          { name: 'Weather', value: 45 },
          { name: 'Price', value: 20 },
          { name: 'Found Alternative', value: 15 },
          { name: 'Technical Issues', value: 10 },
          { name: 'Other', value: 10 }
        ]);

        setMetrics({
          totalRentals: 32,
          totalIncome: 5950,
          totalUsers: 18,
          utilization: 62,
          cancellations: 5
        });
      } else if (timeRange === 'month') {
        // Monthly data - last 30 days
        setRentalPerformanceData([
          { name: 'Week 1', tractors: 15, harvesters: 7, plows: 10 },
          { name: 'Week 2', tractors: 20, harvesters: 9, plows: 12 },
          { name: 'Week 3', tractors: 18, harvesters: 8, plows: 15 },
          { name: 'Week 4', tractors: 25, harvesters: 12, plows: 18 }
        ]);

        setIncomeData([
          { name: 'Week 1', income: 2200 },
          { name: 'Week 2', income: 3400 },
          { name: 'Week 3', income: 2800 },
          { name: 'Week 4', income: 4100 }
        ]);

        setUtilizationData([
          { name: 'Tractors', value: 72 },
          { name: 'Harvesters', value: 42 },
          { name: 'Plows', value: 68 },
          { name: 'Seeders', value: 38 },
          { name: 'Irrigation', value: 52 }
        ]);

        setCancellationData([
          { name: 'Weather', value: 40 },
          { name: 'Price', value: 25 },
          { name: 'Found Alternative', value: 15 },
          { name: 'Technical Issues', value: 12 },
          { name: 'Other', value: 8 }
        ]);

        setMetrics({
          totalRentals: 124,
          totalIncome: 12500,
          totalUsers: 42,
          utilization: 58,
          cancellations: 15
        });
      } else {
        // Yearly data - last 12 months
        setRentalPerformanceData([
          { name: 'Jan', tractors: 42, harvesters: 18, plows: 25 },
          { name: 'Feb', tractors: 38, harvesters: 15, plows: 22 },
          { name: 'Mar', tractors: 45, harvesters: 22, plows: 30 },
          { name: 'Apr', tractors: 65, harvesters: 35, plows: 40 },
          { name: 'May', tractors: 78, harvesters: 42, plows: 50 },
          { name: 'Jun', tractors: 95, harvesters: 58, plows: 65 },
          { name: 'Jul', tractors: 110, harvesters: 65, plows: 72 },
          { name: 'Aug', tractors: 115, harvesters: 70, plows: 80 },
          { name: 'Sep', tractors: 90, harvesters: 55, plows: 62 },
          { name: 'Oct', tractors: 75, harvesters: 40, plows: 55 },
          { name: 'Nov', tractors: 60, harvesters: 30, plows: 42 },
          { name: 'Dec', tractors: 50, harvesters: 25, plows: 35 }
        ]);

        setIncomeData([
          { name: 'Jan', income: 6500 },
          { name: 'Feb', income: 5800 },
          { name: 'Mar', income: 7200 },
          { name: 'Apr', income: 10500 },
          { name: 'May', income: 12800 },
          { name: 'Jun', income: 15600 },
          { name: 'Jul', income: 19800 },
          { name: 'Aug', income: 21500 },
          { name: 'Sep', income: 16200 },
          { name: 'Oct', income: 12500 },
          { name: 'Nov', income: 9800 },
          { name: 'Dec', income: 7500 }
        ]);

        setUtilizationData([
          { name: 'Tractors', value: 75 },
          { name: 'Harvesters', value: 48 },
          { name: 'Plows', value: 62 },
          { name: 'Seeders', value: 42 },
          { name: 'Irrigation', value: 58 }
        ]);

        setCancellationData([
          { name: 'Weather', value: 38 },
          { name: 'Price', value: 22 },
          { name: 'Found Alternative', value: 18 },
          { name: 'Technical Issues', value: 14 },
          { name: 'Other', value: 8 }
        ]);

        setMetrics({
          totalRentals: 863,
          totalIncome: 145700,
          totalUsers: 218,
          utilization: 65,
          cancellations: 112
        });
      }
      
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  // Color schemes for charts
  const COLORS = ['#FF8A00', '#FFB547', '#FFA500', '#FF8C00', '#FFC04D'];
  const CANCEL_COLORS = ['#FF8A00', '#FFB547', '#FFC04D', '#FFD700', '#FFCC00'];

  // Business suggestions based on the data
  const businessSuggestions = [
    "Your tractor utilization is high. Consider investing in more models.",
    "Rentals spike during weekends. Consider weekend-specific promotions.",
    "Harvesters have the lowest utilization. Consider discounting them.",
    "Weather is the top reason for cancellations. Offer flexible rescheduling options.",
    "July-August shows peak demand. Ensure all equipment is operational during these months."
  ];

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Insights and performance metrics for your equipment</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="mr-2 text-gray-600 flex items-center">
            <FaCalendarAlt className="mr-1" /> Time Range:
          </span>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
            <FaAngleDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Rentals</h3>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalRentals}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-gray-900">${metrics.totalIncome}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Unique Renters</h3>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Utilization</h3>
          <p className="text-3xl font-bold text-gray-900">{metrics.utilization}%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Cancellations</h3>
          <p className="text-3xl font-bold text-gray-900">{metrics.cancellations}</p>
        </div>
      </div>

      {/* Business Suggestions */}
      {showSuggestions && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <FaLightbulb className="text-amber-500 text-xl mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Business Insights & Suggestions</h3>
                <ul className="mt-2 space-y-2">
                  {businessSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span className="text-gray-600">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              onClick={() => setShowSuggestions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Equipment Rental Performance Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <FaChartBar className="text-amber-500 mr-2" /> 
              Equipment Rental Performance
            </h2>
            <button className="text-sm text-amber-600 hover:text-amber-800 flex items-center">
              <FaInfoCircle className="mr-1" /> Details
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rentalPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tractors" name="Tractors" fill="#FF8A00" />
                <Bar dataKey="harvesters" name="Harvesters" fill="#FFB547" />
                <Bar dataKey="plows" name="Plows" fill="#FFC04D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income Visualization Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <FaChartLine className="text-amber-500 mr-2" /> 
              Income Visualization
            </h2>
            <button className="text-sm text-amber-600 hover:text-amber-800 flex items-center">
              <FaInfoCircle className="mr-1" /> Details
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Income']}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  name="Income" 
                  stroke="#FF8A00" 
                  fill="#FFB547" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Utilization Rates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <FaChartPie className="text-amber-500 mr-2" /> 
              Equipment Utilization Rates
            </h2>
            <button className="text-sm text-amber-600 hover:text-amber-800 flex items-center">
              <FaInfoCircle className="mr-1" /> Details
            </button>
          </div>
          <div className="h-80 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Utilization Rate']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <ul className="space-y-2">
                {utilizationData.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-gray-700">{item.name}: <strong>{item.value}%</strong></span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  <FaInfoCircle className="inline mr-1 text-amber-500" /> 
                  Utilization is calculated as the percentage of available days that each equipment type was rented.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Reason Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <FaExclamationTriangle className="text-amber-500 mr-2" /> 
              Cancellation Reason Analysis
            </h2>
            <button className="text-sm text-amber-600 hover:text-amber-800 flex items-center">
              <FaInfoCircle className="mr-1" /> Details
            </button>
          </div>
          <div className="h-80 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cancellationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {cancellationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CANCEL_COLORS[index % CANCEL_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <ul className="space-y-2">
                {cancellationData.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: CANCEL_COLORS[index % CANCEL_COLORS.length] }}></span>
                    <span className="text-gray-700">{item.name}: <strong>{item.value}%</strong></span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  <FaInfoCircle className="inline mr-1 text-amber-500" /> 
                  Understanding cancellation reasons can help improve your rental experience and reduce cancellations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalyticsDashboard; 