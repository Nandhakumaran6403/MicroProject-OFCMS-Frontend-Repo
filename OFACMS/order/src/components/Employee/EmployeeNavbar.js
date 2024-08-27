import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUser, FaCog, FaSignOutAlt, FaHome, FaTasks } from 'react-icons/fa';

const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const id = sessionStorage.getItem('adminid');

      if (id === null) {
        navigate('/');
      }
      
      try {
        const response = await axios.get(`http://localhost:6789/admin-users/${id}`);
        const fetchedUser = response.data;

        if (response.status === 200) {
          await axios.patch(`http://localhost:6789/admin-users/lastlogin/${id}`);
          setUser(fetchedUser);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError('Error fetching user details.');
        console.log('Error fetching user details:', err);
        navigate("/"); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHomeClick = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate("/adminmain");
      } else if (user.role === 'employee') {
        navigate("/employeemain");
      } else {
        navigate("/"); 
      }
    } else {
      navigate("/");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <div className="text-indigo-600 text-2xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 mt-6">{error}</div>
  );

  return (
    <div className="sticky top-0 z-50 flex-1 p-6">
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 shadow-lg rounded-b-lg rounded-lg">
      <div className="container mx-auto flex items-center justify-between">
        <button 
          onClick={handleHomeClick} 
          style={{ 
            fontFamily: '"Dancing Script", cursive', // Apply Dancing Script font
            letterSpacing: '1.5px', // Slightly increased spacing
            // textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // More pronounced shadow
            background: 'linear-gradient(45deg, #ffffff, #ffffff)', // Gradient background
            WebkitBackgroundClip: 'text', // Clip background to text
            WebkitTextFillColor: 'transparent', // Make text color transparent to show background
            display: 'inline-block', // Necessary for the gradient effect
          }}
          className="text-5xl font-bold transition-all duration-300 transform hover:scale-10 hover:underline"
        >
          N Mart
        </button>
        <div className="flex items-center space-x-6">
          <Link to="/employeemain" className="hover:text-gray-200 transition-colors duration-300">
            <FaHome className="inline-block mr-1" />
            Home
          </Link>
         
          <Link to="/auditlogadd" className="hover:text-gray-200 transition-colors duration-300">
            <FaTasks className="inline-block mr-1" />
            Audit
          </Link>
          {user && (
            <Link to={`/auditlogspecificstaff/${user?.adminUserId}`} className="hover:text-gray-200 transition-colors duration-300">
              <FaTasks className="inline-block mr-1" />
              My Audits
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none transition-colors duration-300 transform hover:scale-105"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span className="text-white text-xl font-bold">{user ? user.userName.charAt(0).toUpperCase() : 'S'}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-20 transition-transform transform scale-100 opacity-100 ease-out duration-300">
                <Link
                  to="/employeeprofile"
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav></div>
  );
};

export default EmployeeNavbar;
