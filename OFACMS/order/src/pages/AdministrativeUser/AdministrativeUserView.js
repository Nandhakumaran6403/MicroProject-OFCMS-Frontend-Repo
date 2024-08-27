

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaUserAlt, FaEnvelope, FaTag, FaSignInAlt, FaEdit } from 'react-icons/fa';

const AdministrativeUserView = () => {
  const { id } = useParams();
  const [adminUser, setAdminUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:6789/admin-users/${id}`)
      .then(response => {
        setAdminUser(response.data);
      })
      .catch(err => {
        setError('Error fetching administrative user');
        console.error('Error fetching administrative user:', err);
      });
  }, [id]);

  if (!adminUser) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <div className="p-6 bg-white mt-12 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-teal-800">Administrative User Details</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaUserAlt className="text-teal-600 text-2xl mr-3" />
              <p className="text-lg font-semibold">Username: <span className="font-normal">{adminUser.userName ? adminUser.userName.toUpperCase() : '-'}</span></p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-teal-600 text-2xl mr-3" />
              <p className="text-lg font-semibold">Email ID: <span className="font-normal">{adminUser.email || '-'}</span></p>
            </div>
            <div className="flex items-center mb-4">
              <FaTag className="text-teal-600 text-2xl mr-3" />
              <p className="text-lg font-semibold">Role: <span className="font-normal">{adminUser.role ? adminUser.role.toUpperCase() : '-'}</span></p>
            </div>
            <div className="flex items-center mb-4">
              <FaSignInAlt className="text-teal-600 text-2xl mr-3" />
              <p className="text-lg font-semibold">Last Login Date: <span className="font-normal">{adminUser.lastLoginDate ? new Date(adminUser.lastLoginDate).toLocaleDateString() : '-'}</span></p>
            </div>
            <div className="flex justify-end mt-4">
              <Link
                to={`/adminuseredit/${adminUser.adminUserId}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 text-center flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeUserView;
