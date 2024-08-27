import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaCog, FaSignOutAlt, FaHome, FaInfoCircle, FaEnvelope, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserNavbar = ({ onSearch }) => {
    const cart = useSelector((state) => state.cart);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            const id = sessionStorage.getItem('userid');

            if (!id) {
                navigate('/');
                return;
            }

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
    }, [navigate]);

    useEffect(() => {
        if (typeof onSearch === 'function') {
            onSearch(searchTerm);
        }
    }, [searchTerm, onSearch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-gray-100">
                <div className="text-green-600 text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-6">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-gray-700 text-center mt-6">
                No user data available.
            </div>
        );
    }

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="sticky top-0 z-50">
            <nav className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-3 shadow-lg">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Left side: Logo and Links */}
                    <div className="flex items-center space-x-4">
                        <FaShoppingBag className="text-white text-3xl" />
                        <Link 
                            to="/usermain" 
                            className="text-5xl font-bold transition-all duration-300 transform hover:scale-110 hover:underline"
                            style={{ 
                                fontFamily: '"Dancing Script", cursive',
                                letterSpacing: '1.5px',
                                background: 'linear-gradient(45deg, #ffffff, #ffffff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block',
                            }}
                        >
                            N Mart
                        </Link>
                        <div className="hidden md:flex space-x-6 px-6">
                            <Link
                                to="/usermain"
                                className="text-white text-lg px-6 font-semibold flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300"
                            >
                                <FaHome className="text-xl" /> <span>Home</span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-white text-lg px-6 font-semibold flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300"
                            >
                                <FaInfoCircle className="text-xl" /> <span>About</span>
                            </Link>
                            <Link
                                to="/contact"
                                className="text-white text-lg px-6 font-semibold flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300"
                            >
                                <FaEnvelope className="text-xl" /> <span>Contact</span>
                            </Link>
                        </div>
                    </div>

                    {/* Centered Search Bar */}
                    <div className="flex-grow flex justify-center ">
                        <input
                            type="text"
                            placeholder="Search Here..."
                            className="p-2 px-6 rounded-lg border border-gray-300"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>

                    {/* Right side: Order History, Cart, and Profile */}
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/orderhistory"
                            className="text-white text-lg font-semibold flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300"
                        >
                            <FaShoppingCart className="text-2xl" /> <span>Order History</span>
                        </Link>
                        {/* <Link
                            to="/cart"
                            className="relative flex items-center"
                        >
                            <FaShoppingCart className="text-3xl text-white hover:text-yellow-300 transition-colors duration-300" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 transform translate-x-1/2 -translate-y-1/2">
                                    {cart.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </Link> */}
                         <Link
                            to="/cart"
                            className="relative flex items-center"
                        >
                            <FaShoppingCart className="text-3xl text-white hover:text-yellow-300 transition-colors duration-300" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 transform translate-x-1/2 -translate-y-1/2">
                                    {cart.reduce((total, item) => total + 1, 0)}
                                </span>
                            )}
                        </Link>
                        <div className="relative">
                            <button
                                onClick={handleDropdownToggle}
                                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-700 focus:outline-none transition-colors duration-300"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                <FaUserCircle className="text-white text-2xl" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-20 transition-transform transform scale-100 opacity-100 ease-out duration-300">
                                    <Link
                                        to="/userprofile"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FaUserCircle className="mr-2" /> Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FaCog className="mr-2" /> Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

UserNavbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

UserNavbar.defaultProps = {
    onSearch: () => {}, // Default no-op function
};

export default UserNavbar;
