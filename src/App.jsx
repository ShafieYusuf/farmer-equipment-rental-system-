import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './pages/Home/HomePage'
import EquipmentDetailsPage from './pages/Equipment/EquipmentDetailsPage'
import EquipmentListingPage from './pages/Equipment/EquipmentListingPage'
import BookingPage from './pages/Booking/BookingPage'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import BookingsManagementPage from './pages/Admin/BookingsManagementPage'
import UnauthorizedPage from './pages/NotFound/UnauthorizedPage'
import ProfilePage from './pages/Profile/ProfilePage'
import UsersManagementPage from './pages/Admin/UsersManagementPage'
import TransactionsPage from './pages/Admin/TransactionsPage'
import ReportsPage from './pages/Admin/ReportsPage'
import IssuesPage from './pages/Admin/IssuesPage'
import EquipmentManagementPage from './pages/Admin/EquipmentManagementPage'
import AddEquipment from './pages/Admin/components/AddEquipment'
import EditEquipment from './pages/Admin/components/EditEquipment'
import { ToastProvider } from './contexts/ToastContext'

// Equipment Owner Pages
import OwnerDashboard from './pages/Owner/OwnerDashboard'
import OwnerEquipmentManagementPage from './pages/Owner/EquipmentManagementPage'
import OwnerBookingsPage from './pages/Owner/OwnerBookingsPage'
import AddEquipmentPage from './pages/Owner/AddEquipmentPage'
import EditEquipmentPage from './pages/Owner/EditEquipmentPage'
import OwnerEarningsPage from './pages/Owner/OwnerEarningsPage'
import OwnerAnalyticsDashboard from './pages/Owner/OwnerAnalyticsDashboard'

// Layout wrapper component that conditionally renders Header and Footer
const Layout = ({ children, isLoggedIn, isAdmin, isOwner, setIsLoggedIn }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login';
  const isAdminPage = location.pathname.includes('/admin');
  const isOwnerPage = location.pathname.includes('/owner');
  const isFarmerPage = !isAdminPage && !isOwnerPage && !isAuthPage;
  
  // If user is not logged in and trying to access protected routes
  if (!isLoggedIn && !isAuthPage) {
    return <Navigate to="/login" replace />
  }
  
  // If farmer user tries to access admin pages
  if (isLoggedIn && !isAdmin && isAdminPage) {
    return <Navigate to="/unauthorized" replace />
  }
  
  // If admin user tries to access farmer or owner pages
  if (isLoggedIn && isAdmin && (isFarmerPage || isOwnerPage)) {
    return <Navigate to="/admin" replace />
  }
  
  // If farmer user tries to access owner pages
  if (isLoggedIn && !isOwner && isOwnerPage) {
    return <Navigate to="/unauthorized" replace />
  }
  
  // If owner user tries to access farmer pages
  if (isLoggedIn && isOwner && isFarmerPage) {
    return <Navigate to="/owner/dashboard" replace />
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={setIsLoggedIn} />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

// Admin Route - Only accessible by admins
const AdminRoute = ({ element, isLoggedIn, isAdmin, isOwner, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return (
    <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={setIsLoggedIn}>
      {element}
    </Layout>
  );
};

// Farmer Route - Only accessible by farmers
const FarmerRoute = ({ element, isLoggedIn, isAdmin, isOwner, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAdmin || isOwner) {
    return <Navigate to={isAdmin ? '/admin' : '/owner/dashboard'} replace />;
  }
  
  return (
    <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={setIsLoggedIn}>
      {element}
    </Layout>
  );
};

// Equipment Owner Route - Only accessible by equipment owners
const OwnerRoute = ({ element, isLoggedIn, isAdmin, isOwner, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isOwner) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return (
    <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={setIsLoggedIn}>
      {element}
    </Layout>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  // Check localStorage for user authentication and role on app load
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
      setIsAdmin(storedUserRole === 'admin');
      setIsOwner(storedUserRole === 'owner');
    }
  }, []);
  
  // Handle logout - clear localStorage and state
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsOwner(false);
  };

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Root redirect based on user role */}
          <Route path="/" element={
            isLoggedIn 
              ? (isAdmin 
                  ? <Navigate to="/admin" replace /> 
                  : (isOwner 
                      ? <Navigate to="/owner/dashboard" replace /> 
                      : <Navigate to="/home" replace />))
              : <Navigate to="/login" replace />
          } />
          
          {/* Public Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setIsOwner={setIsOwner} />} />
          <Route path="/unauthorized" element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={setIsLoggedIn}>
              <UnauthorizedPage />
            </Layout>
          } />
          
          {/* Farmer Routes - Only accessible by farmers */}
          <Route 
            path="/home" 
            element={<FarmerRoute element={<HomePage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/equipment" 
            element={<FarmerRoute element={<EquipmentListingPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/equipment/:id" 
            element={<FarmerRoute element={<EquipmentDetailsPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/about" 
            element={<FarmerRoute element={<AboutPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/contact" 
            element={<FarmerRoute element={<ContactPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/bookings" 
            element={<FarmerRoute element={<BookingPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          
          {/* Profile route - accessible by all users but content will differ based on role */}
          <Route 
            path="/profile" 
            element={<Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout}>
              <ProfilePage />
            </Layout>} 
          />
          
          {/* Equipment Owner Routes */}
          <Route 
            path="/owner/dashboard" 
            element={<OwnerRoute element={<OwnerDashboard />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/equipment" 
            element={<OwnerRoute element={<OwnerEquipmentManagementPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/equipment/add" 
            element={<OwnerRoute element={<AddEquipmentPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/equipment/edit/:id" 
            element={<OwnerRoute element={<EditEquipmentPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/bookings" 
            element={<OwnerRoute element={<OwnerBookingsPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/earnings" 
            element={<OwnerRoute element={<OwnerEarningsPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/owner/analytics" 
            element={<OwnerRoute element={<OwnerAnalyticsDashboard />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          
          {/* Admin Routes - Only accessible by admins */}
          <Route 
            path="/admin/*" 
            element={<AdminRoute element={<AdminDashboard setIsLoggedIn={handleLogout} />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/equipment" 
            element={<AdminRoute element={<EquipmentManagementPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/equipment/add" 
            element={<AdminRoute element={<AddEquipment />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/equipment/edit/:id" 
            element={<AdminRoute element={<EditEquipment />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/bookings" 
            element={<AdminRoute element={<BookingsManagementPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/users" 
            element={<AdminRoute element={<UsersManagementPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/transactions" 
            element={<AdminRoute element={<TransactionsPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/reports" 
            element={<AdminRoute element={<ReportsPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          <Route 
            path="/admin/issues" 
            element={<AdminRoute element={<IssuesPage />} isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout} />} 
          />
          
          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} isOwner={isOwner} setIsLoggedIn={handleLogout}>
                <NotFoundPage />
              </Layout>
            } 
          />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App
