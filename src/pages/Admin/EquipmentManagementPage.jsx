import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const EquipmentManagementPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be an API call
    const mockEquipment = [
      {
        id: 1,
        name: 'Tractor - John Deere 5075E',
        category: 'Tractors',
        dailyRate: 150,
        status: 'Available',
        owner: 'Farm Solutions Inc.',
        location: 'Dallas, TX'
      },
      {
        id: 2,
        name: 'Combine Harvester - Case IH 1660',
        category: 'Harvesters',
        dailyRate: 300,
        status: 'Rented',
        owner: 'Harvest Pro Equipment',
        location: 'Houston, TX'
      },
      {
        id: 3,
        name: 'Seeder - Bourgault 3320',
        category: 'Seeders',
        dailyRate: 120,
        status: 'Maintenance',
        owner: 'AgriTech Solutions',
        location: 'Austin, TX'
      },
      {
        id: 4,
        name: 'Sprayer - John Deere R4045',
        category: 'Sprayers',
        dailyRate: 180,
        status: 'Available',
        owner: 'Texas Farm Equipment',
        location: 'San Antonio, TX'
      },
      {
        id: 5,
        name: 'Plow - Kuhn Multi-Leader',
        category: 'Tillage',
        dailyRate: 80,
        status: 'Available',
        owner: 'Southern Farm Supplies',
        location: 'Fort Worth, TX'
      }
    ];
    
    setTimeout(() => {
      setEquipment(mockEquipment);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    // In a real application, this would be an API call
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipment(equipment.filter(item => item.id !== id));
    }
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipment Management</h1>
          <p className="text-gray-600">Manage all equipment listings on the platform</p>
        </div>
        <Link 
          to="/admin/equipment/add"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Equipment
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4 relative">
          <FaSearch className="text-gray-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search equipment by name, category, owner, or location..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.dailyRate}/day</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link to={`/admin/equipment/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                            <FaEdit className="text-lg" />
                          </Link>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No equipment found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentManagementPage; 