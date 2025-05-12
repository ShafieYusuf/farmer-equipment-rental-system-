import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaTractor } from 'react-icons/fa';

const LoginPage = ({ setIsLoggedIn, setIsAdmin, setIsOwner }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock login logic - in a real app, this would call an API
    setTimeout(() => {
      // For demo purposes, let's have a simple validation
      if (formData.email === 'admin@example.com' && formData.password === 'password') {
        // Admin login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', 'Admin User');
        localStorage.setItem('userAvatar', 'https://randomuser.me/api/portraits/men/41.jpg');
        setIsLoggedIn(true);
        setIsAdmin(true);
        if (setIsOwner) setIsOwner(false);
        navigate('/admin');
      } else if (formData.email === 'owner@example.com' && formData.password === 'password') {
        // Equipment owner login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'owner');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', 'Equipment Owner');
        localStorage.setItem('userAvatar', 'https://randomuser.me/api/portraits/women/68.jpg');
        setIsLoggedIn(true);
        setIsAdmin(false);
        if (setIsOwner) setIsOwner(true);
        navigate('/owner/dashboard');
      } else if (formData.email === 'farmer@example.com' && formData.password === 'password') {
        // Farmer login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'farmer');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', 'Farmer User');
        localStorage.setItem('userAvatar', 'https://randomuser.me/api/portraits/men/32.jpg');
        setIsLoggedIn(true);
        setIsAdmin(false);
        if (setIsOwner) setIsOwner(false);
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <FaTractor className="text-primary text-5xl" />
              <span className="text-3xl font-bold text-primary">FarmRent</span>
            </div>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-primary hover:text-accent">
                register for a new account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-accent">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="text-sm text-gray-500 text-center">
                <p className="mb-1">For testing purposes, you can use the following accounts:</p>
                <p><strong>Farmer:</strong> farmer@example.com / password</p>
                <p><strong>Equipment Owner:</strong> owner@example.com / password</p>
                <p><strong>Admin:</strong> admin@example.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 