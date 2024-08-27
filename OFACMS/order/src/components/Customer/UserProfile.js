


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaHome, FaCity, FaMapMarkedAlt, FaGlobe, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const id = sessionStorage.getItem('userid'); 

      try {
        const response = await axios.get(`http://localhost:6789/customers/${id}`);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError('Error fetching user details.');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="text-blue-600 text-2xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center mt-6">
      {error}
    </div>
  );

  if (!user) return (
    <div className="text-gray-700 text-center mt-6">
      No user data available.
    </div>
  );

  const userEntries = Object.entries(user).filter(([key]) => !['passwordHash', 'role', 'customerId'].includes(key));
  const totalPages = Math.ceil(userEntries.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userEntries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 border border-gray-200 bg-gradient-to-r from-white via-gray-50 to-gray-100">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/usermain"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 focus:outline-none"
        >
          <FaArrowLeft className="mr-2 text-xl" />
          <span className="text-lg font-semibold">Go to Main</span>
        </Link>
      </div>
      <h2 className="text-3xl font-extrabold mb-6 text-blue-800">Profile</h2>
      <div className="space-y-4">
        {currentItems.map(([key, value]) => (
          <div key={key} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md transition-transform  hover:scale-10">
            <span className="font-semibold text-gray-700 capitalize flex items-center">
              {key === 'firstName' && <FaUser className="mr-2 text-blue-500" />}
              {key === 'email' && <FaEnvelope className="mr-2 text-blue-500" />}
              {key === 'phone' && <FaPhone className="mr-2 text-blue-500" />}
              {key === 'address' && <FaHome className="mr-2 text-blue-500" />}
              {key === 'city' && <FaCity className="mr-2 text-blue-500" />}
              {key === 'state' && <FaMapMarkedAlt className="mr-2 text-blue-500" />}
              {key === 'zipCode' && <FaMapMarkedAlt className="mr-2 text-blue-500" />}
              {key === 'country' && <FaGlobe className="mr-2 text-blue-500" />}
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <p className="text-gray-800">
              {value ? (typeof value === 'string' ? value : new Date(value).toLocaleDateString()) : ' '}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center space-x-2"
        >
          <FaChevronLeft className="text-xl" />
          <span>Previous</span>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center space-x-2"
        >
          <span>Next</span>
          <FaChevronRight className="text-xl" />
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          to={`/customeredit/${user.customerId}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
        >
          <FaUser className="text-xl" />
          <span>Edit Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
