import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);

      const id = sessionStorage.getItem("adminid");

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
    <nav className="bg-gradient-to-b from-teal-700 to-teal-900 text-white p-4 shadow-lg rounded-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* <Link to="/adminmain" className="text-3xl font-bold hover:text-gray-200 transition-colors duration-300">
          Nandha Mart
        </Link> */}
       <Link 
  to="/adminmain" 
  style={{ 
    fontFamily: '"Dancing Script", cursive', // Apply Dancing Script font
    letterSpacing: '1.5px', // Slightly increased spacing
    // textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // More pronounced shadow
    background: 'linear-gradient(45deg, #ffffff, #ffffff)', // Gradient background
    WebkitBackgroundClip: 'text', // Clip background to text
    WebkitTextFillColor: 'transparent', // Make text color transparent to show background
    display: 'inline-block', // Necessary for the gradient effect
  }}
  className="text-5xl font-bold transition-all duration-300 transform hover:scale-11 hover:underline"
>
  N Mart
</Link>


        <div className="flex items-center space-x-6">
          <Link to="/adminmain" className="text-lg font-semibold hover:text-gray-200 transition-colors duration-300">Home</Link>
          <Link to="/auditlogadd" className="text-lg font-semibold hover:text-gray-200 transition-colors duration-300">Audit</Link>
          {user && (
            <Link to={`/auditlogspecific/${user?.adminUserId}`} className="text-lg font-semibold hover:text-gray-200 transition-colors duration-300">
              My Audits
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none transition-transform transform hover:scale-110 duration-300"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span className="text-white text-lg font-bold">{user ? user.userName.charAt(0).toUpperCase() : 'A'}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-20 transition-transform transform scale-95 opacity-0 animate-dropdown">
                <Link
                  to="/adminprofile"
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-3 text-lg" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-3 text-lg" />
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-b-lg"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-lg" />
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

export default AdminNavbar;
