

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaSave,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaMapMarkedAlt,
  FaGlobe,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaLock
} from 'react-icons/fa';

const ITEMS_PER_PAGE = 4;

function CustomerEdit() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    username: '',
    passwordHash: '',
    role: 'user',
    updatedAt: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:6789/customers/${id}`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error('Error fetching customer:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const updatedCustomer = {
      ...customer,
      updatedAt: new Date().toISOString()
    };

    axios.put(`http://localhost:6789/customers/${id}`, updatedCustomer)
      .then(() => navigate('/usermain'))
      .catch(error => console.error('Error updating customer:', error));
  };

  const handleGoToMain = () => {
    navigate('/usermain');
  };

  const allFields = [
    'username',
    'email',
    'phone',
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zipCode',
    'country'
  ];

  const paginatedFields = allFields.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allFields.length / ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      setShowErrorModal(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      setShowErrorModal(true);
      return;
    }

    try {
      // Compare old password with passwordHash
      if (oldPassword !== customer.passwordHash) {
        setErrorMessage('Old password is incorrect. Please try again later.');
        setShowErrorModal(true);
        return;
      }

      // Check if new password is the same as old password
      if (newPassword === oldPassword) {
        setErrorMessage('New password cannot be the same as old password.');
        setShowErrorModal(true);
        return;
      }

      // Update passwordHash field
      const updatedCustomer = {
        ...customer,
        passwordHash: newPassword // Ensure server handles hashing
      };

      await axios.put(`http://localhost:6789/customers/${id}`, updatedCustomer);
      setCustomer(updatedCustomer);
      setShowModal(false);
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('Failed to change password.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg shadow-lg mt-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleGoToMain}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 focus:outline-none"
        >
          <FaArrowLeft className="mr-2 text-2xl" />
          <span className="text-lg font-semibold">Go to Main</span>
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {paginatedFields.map(key => (
          <div key={key} className="relative flex flex-col space-y-2">
            <label htmlFor={key} className="flex items-center text-lg font-medium text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').trim()}
              {key === 'email' && <FaEnvelope className="ml-2 text-blue-500" />}
              {key === 'phone' && <FaPhone className="ml-2 text-blue-500" />}
              {key === 'address' && <FaHome className="ml-2 text-blue-500" />}
              {key === 'city' && <FaCity className="ml-2 text-blue-500" />}
              {key === 'state' && <FaMapMarkedAlt className="ml-2 text-blue-500" />}
              {key === 'zipCode' && <FaMapMarkedAlt className="ml-2 text-blue-500" />}
              {key === 'country' && <FaGlobe className="ml-2 text-blue-500" />}
            </label>
            <input
              id={key}
              name={key}
              type={key === 'passwordHash' ? (showPassword ? 'text' : 'password') : (key === 'email' ? 'email' : 'text')}
              value={customer[key] || ''}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-200 hover:bg-blue-300 text-blue-600 rounded-full disabled:bg-gray-200 transition duration-300"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-200 hover:bg-blue-300 text-blue-600 rounded-full disabled:bg-gray-200 transition duration-300"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Flex container for the buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaLock className="text-xl" />
            <span>Change Password</span>
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaSave className="text-xl" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>

      {/* Modal for Change Password */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-lg font-medium text-gray-700">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-lg font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-lg font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleChangePassword}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Change Password
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Error Messages */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-lg text-gray-700 mb-4">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerEdit;
