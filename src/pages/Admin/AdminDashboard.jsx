import { useState, useEffect } from 'react';
import { FaTractor, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt, FaTachometerAlt, FaPlus, FaBars, FaTimes, FaChartBar, FaHeadset } from 'react-icons/fa';
import { Link, useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// Admin components
import EquipmentManagement from './components/EquipmentManagement';
import BookingManagement from './components/BookingManagement';
import FarmerManagement from './components/FarmerManagement';
import SystemSettings from './components/SystemSettings';
import AdminOverview from './components/AdminOverview';
import AddEquipment from './components/AddEquipment';
import EditEquipment from './components/EditEquipment';

const AdminDashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update active page based on URL
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'overview';
    setActivePage(path);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <FaTachometerAlt />, path: '' },
    { id: 'equipment', label: 'Equipment Management', icon: <FaTractor />, path: 'equipment' },
    { id: 'bookings', label: 'Booking Management', icon: <FaCalendarAlt />, path: 'bookings' },
    { id: 'farmers', label: 'Customer Management', icon: <FaUsers />, path: 'farmers' },
    { id: 'reports', label: 'Reports & Analytics', icon: <FaChartBar />, path: 'reports' },
    { id: 'issues', label: 'Customer Support', icon: <FaHeadset />, path: 'issues' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: 'settings' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Close sidebar when a link is clicked on mobile
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <FaTractor className="mr-2" /> Admin Panel
        </h2>
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Sidebar - Responsive */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-gray-800 text-white w-full md:w-64 flex-shrink-0 flex flex-col fixed md:relative inset-0 z-40 md:z-auto`}>
        <div className="hidden md:block p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <FaTractor className="mr-2" /> Admin Panel
          </h2>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/admin/${item.path}`}
                  onClick={handleNavClick}
                  className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
                    activePage === item.id ? 'bg-gray-700 border-l-4 border-primary' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-400 hover:text-white w-full"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 overflow-auto md:h-full">
        <div className="p-4 sm:p-6">
          <Routes>
            <Route path="" element={<AdminOverview />} />
            <Route path="equipment" element={<EquipmentManagement />} />
            <Route path="equipment/add" element={<AddEquipment />} />
            <Route path="equipment/edit/:id" element={<EditEquipment />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="farmers" element={<FarmerManagement />} />
            <Route path="settings" element={<SystemSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 