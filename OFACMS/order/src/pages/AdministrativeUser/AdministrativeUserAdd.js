


// src/pages/AdministrativeUserAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaCalendarAlt } from 'react-icons/fa'; // Importing icons

const AdministrativeUserAdd = () => {
  const [adminUser, setAdminUser] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
    lastLoginDate: ''
  });
  const [existingUsers, setExistingUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing admin users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:6789/admin-users/all');
        setExistingUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch existing users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === adminUser.email);

    if (emailExists) {
      // Show modal if email already exists
      setErrorMessage('This email ID is already in use. Try another unique one.');
      setShowErrorModal(true);
    } else {
      // Proceed with POST request if email is unique
      try {
        await axios.post('http://localhost:6789/admin-users', adminUser);
        setErrorMessage('Administrative User added successfully!');
        setShowErrorModal(true);
        setTimeout(() => {
          navigate('/adminmain');
        }, 2000); // Delay navigation to allow the modal to be seen
      } catch (err) {
        setErrorMessage('Error adding administrative user');
        setShowErrorModal(true);
        console.error('Error adding administrative user:', err);
      }
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <div className="p-6 bg-white mt-12 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-teal-800">Add Administrative User</h1>
          <div className="bg-gray-50 p-6 shadow-md rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <FaUser className="text-gray-500 ml-3" />
                <input
                  type="text"
                  name="userName"
                  value={adminUser.userName}
                  onChange={handleChange}
                  placeholder="Username"
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <FaEnvelope className="text-gray-500 ml-3" />
                <input
                  type="email"
                  name="email"
                  value={adminUser.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <FaLock className="text-gray-500 ml-3" />
                <input
                  type="password"
                  name="password"
                  value={adminUser.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <FaUserShield className="text-gray-500 ml-3" />
                <input
                  type="text"
                  name="role"
                  value={adminUser.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              {/* <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <FaCalendarAlt className="text-gray-500 ml-3" />
                <input
                  type="date"
                  name="lastLoginDate"
                  value={adminUser.lastLoginDate}
                  onChange={handleChange}
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div> */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="py-2 px-4 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold text-blue-600">Notification</h2>
            <p className="text-sm text-gray-700 mt-2">{errorMessage}</p>
            <button
              onClick={handleCloseErrorModal}
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrativeUserAdd;
