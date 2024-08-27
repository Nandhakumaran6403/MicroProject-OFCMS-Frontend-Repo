import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const id = sessionStorage.getItem('adminid');

      try {
        const response = await axios.get(`http://localhost:6789/admin-users/${id}`);
        const fetchedUser = response.data;
        if (response.status === 200) {
          setUser(fetchedUser);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
    <AdminSidebar/>


<div className="flex-1 ml-64 p-6">

   <AdminNavbar />
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 border border-gray-200 bg-gradient-to-r from-white via-gray-50 to-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-800">Profile</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <span className="font-semibold text-gray-700 capitalize">Username:</span>
          <p className="text-gray-800">{user.userName.toUpperCase()}</p>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <span className="font-semibold text-gray-700 capitalize">Email ID:</span>
          <p className="text-gray-800">{user.email}</p>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <span className="font-semibold text-gray-700 capitalize">Role:</span>
          <p className="text-gray-800">{user.role.toUpperCase()}</p>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <span className="font-semibold text-gray-700 capitalize">Password:</span>
          <p className="text-gray-800">•••••••••••</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Link to={`/adminuseredit/${user.adminUserId}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105">
          Edit Profile
        </Link>
      </div>
    </div></div></div>
  );
};

export default AdminProfile;
