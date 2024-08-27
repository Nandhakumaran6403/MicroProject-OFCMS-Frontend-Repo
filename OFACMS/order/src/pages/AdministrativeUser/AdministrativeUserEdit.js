



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa'; 
import AdminNavbar from '../../components/Admin/AdminNavbar';

const AdministrativeUserEdit = () => {
  const { id } = useParams();
  const [adminUser, setAdminUser] = useState({
    userName: '',
    password: '',
    role: '',
    lastLoginDate: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:6789/admin-users/${id}`)
      .then(response => {
        setAdminUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching administrative user');
        setLoading(false);
        console.error('Error fetching administrative user:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:6789/admin-users/${id}`, adminUser)
      .then(() => {
        setModalMessage('Administrative User updated successfully!');
        setShowModal(true);
        setTimeout(() => {
          navigate(adminUser.role === "admin" ? '/adminmain' : '/employeemain');
        }, 2000); // Delay navigation to allow the modal to be seen
      })
      .catch(err => {
        setModalMessage('Error updating administrative user');
        setShowModal(true);
        console.error('Error updating administrative user:', err);
      });
  };

  const handleGoBack = () => {
    navigate( '/adminmain');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <div className="text-gray-700">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <EmployeeSidebar /> */}

      <div className="flex-1 p-6">
        <AdminNavbar />
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleGoBack}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
              >
                <FaArrowLeft className="text-xl" />
                <span>Go Back</span>
              </button>
              <h1 className="text-2xl font-bold text-blue-600">Edit Admin User</h1>
              <button
                type="submit"
                form="edit-form"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                <FaSave className="text-xl" />
                <span>Update User</span>
              </button>
            </div>
            <form id="edit-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={adminUser.userName}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm transition-shadow duration-300 focus:shadow-md focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={adminUser.email}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm bg-gray-50 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={adminUser.password}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm transition-shadow duration-300 focus:shadow-md focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={adminUser.role}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm transition-shadow duration-300 focus:shadow-md focus:border-blue-500"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-lg font-medium text-gray-700">Last Login Date</label>
                <input
                  type="date"
                  name="lastLoginDate"
                  value={adminUser.lastLoginDate}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm bg-gray-50 cursor-not-allowed"
                  readOnly
                />
              </div> */}
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold text-blue-600">Notification</h2>
            <p className="text-sm text-gray-700 mt-2">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrativeUserEdit;
