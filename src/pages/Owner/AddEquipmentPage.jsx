import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTractor, FaUpload, FaDollarSign, FaTags, FaClipboardList, FaInfoCircle, FaImage, FaArrowLeft } from 'react-icons/fa';

const AddEquipmentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    specifications: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    images: [],
    availability: 'available',
    location: '',
    customFields: []
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Equipment categories
  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'tractor', label: 'Tractors' },
    { value: 'harvesting', label: 'Harvesting Equipment' },
    { value: 'tillage', label: 'Tillage Equipment' },
    { value: 'planting', label: 'Planting Equipment' },
    { value: 'spraying', label: 'Spraying Equipment' },
    { value: 'irrigation', label: 'Irrigation Equipment' },
    { value: 'livestock', label: 'Livestock Equipment' },
    { value: 'storage', label: 'Storage & Handling' },
    { value: 'other', label: 'Other Equipment' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setErrors({
        ...errors,
        images: 'You can only upload a maximum of 5 images'
      });
      return;
    }
    
    // Create preview URLs for images
    const newImagePreviewUrls = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviewUrls.push(reader.result);
        if (newImagePreviewUrls.length === files.length) {
          setImagePreviewUrls(newImagePreviewUrls);
        }
      };
      reader.readAsDataURL(file);
    });
    
    setFormData({
      ...formData,
      images: files
    });
    
    // Clear error when user uploads
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Equipment name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dailyRate.trim()) {
      newErrors.dailyRate = 'Daily rate is required';
    } else if (isNaN(formData.dailyRate) || parseFloat(formData.dailyRate) <= 0) {
      newErrors.dailyRate = 'Please enter a valid daily rate';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo(0, 0);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to add equipment
    setTimeout(() => {
      setLoading(false);
      setShowSuccessMessage(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/owner/equipment');
      }, 2000);
    }, 1500);
  };

  const removeImage = (index) => {
    const newImagePreviewUrls = [...imagePreviewUrls];
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link to="/owner/equipment" className="text-amber-600 hover:text-amber-700 flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Equipment List
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Add New Equipment</h1>
          <p className="text-gray-600 mt-1">Enter details about the equipment you want to rent out</p>
        </div>
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Equipment added successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Please correct the errors below before submitting the form.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaInfoCircle className="mr-2 text-amber-600" /> Basic Information
              </h2>
            </div>
            
            {/* Equipment Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Equipment Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                placeholder="e.g. John Deere 6R Series Tractor"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                placeholder="Provide a detailed description of your equipment including its condition, features, and benefits"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            {/* Technical Specifications */}
            <div className="md:col-span-2">
              <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
                Technical Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                rows="3"
                value={formData.specifications}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter technical details like model, year, horsepower, dimensions, etc."
              ></textarea>
            </div>
            
            {/* Pricing */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center mt-4">
                <FaDollarSign className="mr-2 text-amber-600" /> Pricing Information
              </h2>
            </div>
            
            {/* Daily Rate */}
            <div>
              <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700">
                Daily Rental Rate (USD) *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="dailyRate"
                  name="dailyRate"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  className={`pl-7 block w-full px-3 py-2 border ${errors.dailyRate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                  placeholder="0.00"
                />
              </div>
              {errors.dailyRate && (
                <p className="mt-1 text-sm text-red-600">{errors.dailyRate}</p>
              )}
            </div>
            
            {/* Weekly Rate */}
            <div>
              <label htmlFor="weeklyRate" className="block text-sm font-medium text-gray-700">
                Weekly Rental Rate (USD) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="weeklyRate"
                  name="weeklyRate"
                  value={formData.weeklyRate}
                  onChange={handleChange}
                  className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            {/* Monthly Rate */}
            <div>
              <label htmlFor="monthlyRate" className="block text-sm font-medium text-gray-700">
                Monthly Rental Rate (USD) <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="monthlyRate"
                  name="monthlyRate"
                  value={formData.monthlyRate}
                  onChange={handleChange}
                  className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Equipment Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g. Chicago, IL"
              />
            </div>
            
            {/* Images */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center mt-4">
                <FaImage className="mr-2 text-amber-600" /> Equipment Images
              </h2>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5 files (max 2MB each)
                  </p>
                </div>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images}</p>
              )}
              
              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 shadow-md"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Availability */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center mt-4">
                <FaClipboardList className="mr-2 text-amber-600" /> Availability
              </h2>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="available"
                    name="availability"
                    type="radio"
                    value="available"
                    checked={formData.availability === 'available'}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label htmlFor="available" className="ml-3 block text-sm font-medium text-gray-700">
                    Available for rent immediately
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="scheduled"
                    name="availability"
                    type="radio"
                    value="scheduled"
                    checked={formData.availability === 'scheduled'}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label htmlFor="scheduled" className="ml-3 block text-sm font-medium text-gray-700">
                    Available on specific dates (you can set availability calendar later)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="unavailable"
                    name="availability"
                    type="radio"
                    value="unavailable"
                    checked={formData.availability === 'unavailable'}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label htmlFor="unavailable" className="ml-3 block text-sm font-medium text-gray-700">
                    Not available for rent at this time
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link
              to="/owner/equipment"
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Equipment...
                </>
              ) : (
                <>Add Equipment</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentPage; 