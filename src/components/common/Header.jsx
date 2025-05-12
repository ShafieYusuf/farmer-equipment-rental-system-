import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaTractor, FaUser, FaClipboardList, FaCalendarAlt, FaCog, FaUsers, FaChartBar, FaSignOutAlt, FaDollarSign, FaTags, FaPlus, FaChartLine, FaMoneyBillWave, FaCaretDown } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ isLoggedIn, isAdmin, isOwner, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    if (isLoggedIn) {
      const storedName = localStorage.getItem('userName') || 'User';
      const storedAvatar = localStorage.getItem('userAvatar') || '';
      
      setUserName(storedName);
      setUserAvatar(storedAvatar);
    }
  }, [isLoggedIn]);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    
    // Update app state
    setIsLoggedIn(false);
    closeMenu();
    closeUserMenu();
    
    // Redirect to login
    navigate('/login');
  };

  // Generate initials from user name for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // User profile dropdown component
  const UserProfileDropdown = ({ color = "green" }) => (
    <div className="relative" ref={userMenuRef}>
      <button 
        onClick={toggleUserMenu}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={userMenuOpen}
        aria-haspopup="true"
      >
        <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-${color}-100 text-${color}-800`}>
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={`${userName}'s profile`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium text-sm">{getInitials(userName)}</span>
          )}
        </div>
        <span className="hidden sm:inline-block text-sm font-medium truncate max-w-[100px]">{userName}</span>
        <FaCaretDown className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {userMenuOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{localStorage.getItem('userEmail')}</p>
          </div>
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FaUser className="mr-2" /> My Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );

  // Admin Header
  if (isAdmin) {
    return (
      <header className="bg-gray-800 text-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-3">
          <div className="flex justify-between items-center">
            {/* Admin Logo */}
            <Link to="/admin" className="flex items-center space-x-2" onClick={closeMenu}>
              <FaTractor className="text-green-500 text-2xl" />
              <span className="text-2xl font-bold text-white">Admin Panel</span>
            </Link>

            {/* Admin Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                end
              >
                <FaChartBar className="mr-2" /> Dashboard
              </NavLink>
              <NavLink 
                to="/admin/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
              >
                <FaCalendarAlt className="mr-2" /> Bookings
              </NavLink>
              <NavLink 
                to="/admin/equipment" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
              >
                <FaClipboardList className="mr-2" /> Equipment
              </NavLink>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
              >
                <FaUsers className="mr-2" /> Users
              </NavLink>
              <NavLink 
                to="/admin/transactions" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
              >
                <FaMoneyBillWave className="mr-2" /> Transactions
              </NavLink>
            </nav>

            {/* Admin Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink 
                to="/admin/settings" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium' : 'text-gray-300 hover:text-green-500'
                }
              >
                <FaCog />
              </NavLink>
              <UserProfileDropdown color="green" />
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-md p-4 flex flex-col space-y-3 z-50">
              <div className="flex items-center space-x-2 p-2 bg-gray-700 rounded-md mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-green-100 text-green-800">
                  {userAvatar ? (
                    <img src={userAvatar} alt={`${userName}'s profile`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-medium text-sm">{getInitials(userName)}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-gray-300">{localStorage.getItem('userEmail')}</p>
                </div>
              </div>
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
                end
              >
                <FaChartBar className="mr-2" /> Dashboard
              </NavLink>
              <NavLink 
                to="/admin/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaCalendarAlt className="mr-2" /> Bookings
              </NavLink>
              <NavLink 
                to="/admin/equipment" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaClipboardList className="mr-2" /> Equipment
              </NavLink>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaUsers className="mr-2" /> Users
              </NavLink>
              <NavLink 
                to="/admin/transactions" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaMoneyBillWave className="mr-2" /> Transactions
              </NavLink>
              <NavLink 
                to="/admin/settings" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaCog className="mr-2" /> Settings
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  isActive ? 'text-green-500 font-medium flex items-center' : 'text-gray-300 hover:text-green-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaUser className="mr-2" /> My Profile
              </NavLink>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 text-center rounded flex items-center justify-center" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }

  // Equipment Owner Header
  if (isOwner) {
    return (
      <header className="bg-gray-800 text-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-3">
          <div className="flex justify-between items-center">
            {/* Owner Logo */}
            <Link to="/owner/dashboard" className="flex items-center space-x-2" onClick={closeMenu}>
              <FaTractor className="text-amber-500 text-2xl" />
              <span className="text-2xl font-bold text-white">Owner Portal</span>
            </Link>

            {/* Owner Navigation - Desktop */}
            <nav className="hidden md:flex space-x-6">
              <NavLink 
                to="/owner/dashboard" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                end
              >
                <FaChartBar className="mr-2" /> Dashboard
              </NavLink>
              <NavLink 
                to="/owner/equipment" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
              >
                <FaClipboardList className="mr-2" /> My Equipment
              </NavLink>
              <NavLink 
                to="/owner/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
              >
                <FaCalendarAlt className="mr-2" /> Rental Requests
              </NavLink>
              <NavLink 
                to="/owner/earnings" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
              >
                <FaDollarSign className="mr-2" /> Earnings
              </NavLink>
              <NavLink 
                to="/owner/analytics" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
              >
                <FaChartLine className="mr-2" /> Analytics
              </NavLink>
            </nav>

            {/* Owner Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink 
                to="/owner/equipment/add" 
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-3 py-1 rounded-full transition-colors flex items-center text-sm"
              >
                <FaPlus className="mr-1" /> Add Equipment
              </NavLink>
              <UserProfileDropdown color="amber" />
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-md p-4 flex flex-col space-y-3 z-50">
              <div className="flex items-center space-x-2 p-2 bg-gray-700 rounded-md mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-amber-100 text-amber-800">
                  {userAvatar ? (
                    <img src={userAvatar} alt={`${userName}'s profile`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-medium text-sm">{getInitials(userName)}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-gray-300">{localStorage.getItem('userEmail')}</p>
                </div>
              </div>
              <NavLink 
                to="/owner/dashboard" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
                end
              >
                <FaChartBar className="mr-2" /> Dashboard
              </NavLink>
              <NavLink 
                to="/owner/equipment" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaClipboardList className="mr-2" /> My Equipment
              </NavLink>
              <NavLink 
                to="/owner/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaCalendarAlt className="mr-2" /> Rental Requests
              </NavLink>
              <NavLink 
                to="/owner/earnings" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaDollarSign className="mr-2" /> Earnings
              </NavLink>
              <NavLink 
                to="/owner/analytics" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaChartLine className="mr-2" /> Analytics
              </NavLink>
              <NavLink 
                to="/owner/equipment/add"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 text-center rounded flex items-center justify-center"
                onClick={closeMenu}
              >
                <FaPlus className="mr-2" /> Add Equipment
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  isActive ? 'text-amber-500 font-medium flex items-center' : 'text-gray-300 hover:text-amber-500 flex items-center'
                }
                onClick={closeMenu}
              >
                <FaUser className="mr-2" /> My Profile
              </NavLink>
              <button 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 text-center rounded flex items-center justify-center" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }

  // Farmer Header (regular user)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2" onClick={closeMenu}>
            <FaTractor className="text-primary text-2xl" />
            <span className="text-2xl font-bold text-primary">FarmRent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/equipment" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
            >
              Equipment
            </NavLink>
            <NavLink 
              to="/bookings" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
            >
              <FaCalendarAlt className="mr-1" /> My Bookings
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            ) : (
              <UserProfileDropdown />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-3 z-50">
            {isLoggedIn && (
              <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-green-100 text-green-800">
                  {userAvatar ? (
                    <img src={userAvatar} alt={`${userName}'s profile`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-medium text-sm">{getInitials(userName)}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">{localStorage.getItem('userEmail')}</p>
                </div>
              </div>
            )}
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/equipment" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Equipment
            </NavLink>
            <NavLink 
              to="/bookings" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
              }
              onClick={closeMenu}
            >
              <FaCalendarAlt className="mr-2" /> My Bookings
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>
            {isLoggedIn && (
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-medium flex items-center' : 'text-gray-600 hover:text-primary flex items-center'
                }
                onClick={closeMenu}
              >
                <FaUser className="mr-2" /> My Profile
              </NavLink>
            )}
            {!isLoggedIn ? (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="btn-primary text-center py-2"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 text-center rounded flex items-center justify-center" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 