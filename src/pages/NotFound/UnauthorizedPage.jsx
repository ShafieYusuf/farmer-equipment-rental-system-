import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const UnauthorizedPage = () => {
  const userRole = localStorage.getItem('userRole');
  const redirectPath = userRole === 'admin' ? '/admin' : '/home';
  
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <FaLock className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2 mb-6">You don't have permission to view this page</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are trying to access is restricted based on your user role.
          Please return to your dashboard.
        </p>
        <Link 
          to={redirectPath}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 