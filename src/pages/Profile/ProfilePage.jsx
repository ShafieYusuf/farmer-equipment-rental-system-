import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTractor, FaEdit, FaCalendarAlt, FaDollarSign, FaMoneyBillWave, FaPercentage, FaStar, FaTools } from 'react-icons/fa';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '(123) 456-7890',
    address: '123 Farm Road, Agriville',
    joinDate: 'January 2023',
    bookings: 0,
    equipment: 0,
    earnings: 0,
    rating: 0
  });

  useEffect(() => {
    // Get user info from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName') || 'User';
    
    // Set user data based on role (in a real app, this would come from an API)
    if (userRole === 'admin') {
      setUserData({
        name: userName,
        email: userEmail || 'admin@example.com',
        role: 'Administrator',
        phone: '(555) 123-4567',
        address: '456 Admin Street, Admin City',
        joinDate: 'December 2022',
        bookings: 0,
        equipment: 15,
        earnings: 0,
        rating: 0
      });
    } else if (userRole === 'owner') {
      setUserData({
        name: userName,
        email: userEmail || 'owner@example.com',
        role: 'Equipment Owner',
        phone: '(555) 987-6543',
        address: '789 Equipment Lane, Machinery City',
        joinDate: 'February 2023',
        bookings: 12,
        equipment: 8,
        earnings: 2450,
        rating: 4.8
      });
    } else {
      setUserData({
        name: userName,
        email: userEmail || 'user@example.com',
        role: 'Farmer',
        phone: '(123) 456-7890',
        address: '123 Farm Road, Agriville',
        joinDate: 'January 2023',
        bookings: 5,
        equipment: 0,
        earnings: 0,
        rating: 4.2
      });
    }
  }, []);

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className={`p-6 text-white ${userData.role === 'Equipment Owner' ? 'bg-gradient-to-r from-amber-600 to-amber-500' : 'bg-gradient-to-r from-primary/90 to-primary'}`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white">
                <FaUser className="text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-white/80 flex items-center mt-1">
                <FaEnvelope className="mr-2" />
                {userData.email}
              </p>
              <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                {userData.role}
              </div>
              {userData.role === 'Equipment Owner' && (
                <div className="mt-2 flex items-center text-white">
                  <FaStar className="text-yellow-300 mr-1" />
                  <span>{userData.rating.toFixed(1)} rating</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* User Info */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <FaPhone className={`${userData.role === 'Equipment Owner' ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div>
                    <div className="font-medium">Phone Number</div>
                    <div className="text-gray-600">{userData.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <FaMapMarkerAlt className={`${userData.role === 'Equipment Owner' ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">{userData.address}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <FaCalendarAlt className={`${userData.role === 'Equipment Owner' ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div>
                    <div className="font-medium">Member Since</div>
                    <div className="text-gray-600">{userData.joinDate}</div>
                  </div>
                </div>

                {userData.role === 'Equipment Owner' && (
                  <div className="flex items-start">
                    <div className="w-10 flex-shrink-0 flex justify-center">
                      <FaMoneyBillWave className="text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium">Payment Information</div>
                      <div className="text-gray-600">Bank Account: ****4532</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 text-right">
                <button className={`flex items-center ${userData.role === 'Equipment Owner' ? 'text-amber-500 hover:text-amber-600' : 'text-primary hover:text-primary/80'} font-medium ml-auto`}>
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Statistics</h2>
              
              <div className="space-y-4">
                {userData.role === 'Farmer' && (
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <FaCalendarAlt className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Active Bookings</div>
                        <div className="text-2xl font-bold">{userData.bookings}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {userData.role === 'Administrator' && (
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <FaTractor className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Equipment Listed</div>
                        <div className="text-2xl font-bold">{userData.equipment}</div>
                      </div>
                    </div>
                  </div>
                )}

                {userData.role === 'Equipment Owner' && (
                  <>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                          <FaTools className="text-amber-600 text-xl" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Equipment Listed</div>
                          <div className="text-2xl font-bold">{userData.equipment}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <FaDollarSign className="text-green-600 text-xl" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Total Earnings</div>
                          <div className="text-2xl font-bold">${userData.earnings}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <FaCalendarAlt className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Rental Requests</div>
                          <div className="text-2xl font-bold">{userData.bookings}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="text-center mt-4 text-sm text-gray-500">
                  <p>Account Status: <span className="text-green-500 font-medium">Active</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Sections Based on Role */}
          {userData.role === 'Farmer' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Bookings</h2>
              {userData.bookings > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">John Deere Tractor</h3>
                          <p className="text-sm text-gray-500">Booked: May 15 - May 20, 2023</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                      </div>
                    </div>
                    {/* More bookings would go here */}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No recent bookings found.</p>
              )}
            </div>
          )}
          
          {userData.role === 'Administrator' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Admin Overview</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24</div>
                      <div className="text-sm text-gray-500">Total Users</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">15</div>
                      <div className="text-sm text-gray-500">Equipment Items</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">8</div>
                      <div className="text-sm text-gray-500">Pending Bookings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {userData.role === 'Equipment Owner' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Activity</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">New Rental Request</h3>
                        <p className="text-sm text-gray-500">Farmer John requested your Combine Harvester</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Payment Received</h3>
                        <p className="text-sm text-gray-500">$350 for Tractor rental</p>
                        <p className="text-xs text-gray-400">Yesterday</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">New Review</h3>
                        <p className="text-sm text-gray-500">5-star rating received for your Plough</p>
                        <p className="text-xs text-gray-400">3 days ago</p>
                      </div>
                      <div className="flex text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Earnings Summary</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">${userData.earnings}</div>
                        <div className="text-sm text-gray-500">Total Earnings</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">$820</div>
                        <div className="text-sm text-gray-500">Monthly Average</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">$245</div>
                        <div className="text-sm text-gray-500">Pending Payments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 