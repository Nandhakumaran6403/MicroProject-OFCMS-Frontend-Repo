

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaExclamationCircle } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    username: '',
    passwordHash: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);
  const [adminEmails, setAdminEmails] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await axios.get('http://localhost:6789/customers/all');
        const emails = response.data.map(customer => customer.email);
        setExistingEmails(emails);
      } catch (error) {
        console.error('Error fetching existing emails:', error);
      }
    };

    const fetchAdminEmails = async () => {
      try {
        const response = await axios.get('http://localhost:6789/admin-users/all');
        const emails = response.data.map(admin => admin.email);
        setAdminEmails(emails);
      } catch (error) {
        console.error('Error fetching admin emails:', error);
      }
    };

    fetchExistingEmails();
    fetchAdminEmails();
  }, []);

  useEffect(() => {
    if (existingEmails.includes(formData.email) || adminEmails.includes(formData.email)) {
      if (adminEmails.includes(formData.email)) {
        setModalMessage('Organizational Email IDs are not acceptable for registration. Please try another unique one.');
      } else {
        setModalMessage('The email you entered is already associated with an existing account. Please try another email or go to the login page.');
      }
      setShowModal(true);
    }
  }, [formData.email, existingEmails, adminEmails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format.';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone number must be 10 digits.';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters.';
    if (formData.passwordHash.length < 6) newErrors.passwordHash = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (adminEmails.includes(formData.email)) {
      setModalMessage('Organizational Email IDs are not acceptable for registration. Please try another unique one.');
      setShowModal(true);
      return;
    }

    if (existingEmails.includes(formData.email)) {
      setModalMessage('The email you entered is already associated with an existing account. Please try another email or go to the login page.');
      setShowModal(true);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:6789/customers', {
        ...formData,
        createdAt: new Date().toISOString()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful:', response.data);
      setModalMessage('Registration successful! You will be redirected shortly.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="font-[sans-serif] bg-white h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full max-w-screen-md mx-auto">
        <div className="p-4">
          <img src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?size=626&ext=jpg&ga=GA1.1.1788614524.1717200000&semt=ais_user" className="w-full h-full object-contain block mx-auto" alt="login-image" />
          <Link  
            to="/" 
            style={{ 
              fontFamily: '"Dancing Script", cursive',
              letterSpacing: '1.5px',
              background: 'linear-gradient(45deg, #d65563, #d65563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
            className="text-5xl font-bold transition-all mx-12 ml-20 px-6 text-cyan-800 duration-300 transform hover:scale-11 hover:underline text-center"
          >
            N Mart
          </Link>
        </div>

        <div className="flex items-center p-6">
          <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
            <div className="mb-8">
              <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold text-center">Create an account</h3>
            </div>

            <div className="mb-5">
              <label htmlFor="username" className="text-gray-800 text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-2 outline-none ${
                    errors.username ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter name"
                  required
                />
                <FaUser className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.username}</p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-gray-800 text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-2 outline-none ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter email"
                  required
                />
                <FaEnvelope className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="phone" className="text-gray-800 text-xs block mb-2">Phone</label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-2 outline-none ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter phone number"
                />
                <FaPhone className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.phone}</p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="passwordHash" className="text-gray-800 text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="passwordHash"
                  id="passwordHash"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  className={`w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-2 outline-none ${
                    errors.passwordHash ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter password"
                  required
                />
                <FaLock className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
              </div>
              {errors.passwordHash && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errors.passwordHash}
                </p>
              )}
            </div>

            <div className="flex items-center mb-5">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
              />
              <label htmlFor="accept-terms" className="ml-3 block text-sm text-gray-800">
                I accept the <Link to="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</Link>
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Create an account'}
              </button>
              <p className="text-sm mt-4 text-gray-800">
                Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">{modalMessage.includes('Registration successful! You will be redirected shortly.') ? 'Success!' : 'Error'}</h2>
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
