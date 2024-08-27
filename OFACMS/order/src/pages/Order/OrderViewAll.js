



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaPlus, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Icons for View, Add, Delete, and Pagination
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const OrderViewAll = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:6789/orders/all');
                
                // Sort orders by orderId in descending order
                const sortedOrders = response.data.sort((a, b) => b.orderId - a.orderId);
                
                setOrders(sortedOrders);
                setFilteredOrders(sortedOrders);
                setLoading(false);
            } catch (err) {
                setError('Error fetching orders.');
                console.error(err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const result = orders.filter(order =>
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(result);
        setCurrentPage(1); // Reset to the first page when filtering
    }, [searchTerm, orders]);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Function to handle deleting an order
    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:6789/orders/${orderId}`);
            setOrders(orders.filter(order => order.orderId !== orderId));
            setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    // Handling different states
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-600 text-center">{error}</p>;
    if (!filteredOrders.length) return <p className="text-center text-gray-500">No orders available.</p>;

    return (
        <div className="flex min-h-screen">
            <EmployeeSidebar />
            <div className="flex-1 ml-64 p-6">
                <EmployeeNavbar />
                <div className="container mx-auto p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 px-6">All Orders</h1>
                        <div className="flex items-center space-x-2 px-6">
                            <input
                                type="text"
                                placeholder="Search by status"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border px-4 py-2 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Order Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Total Amount</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map(order => (
                                    <tr key={order.orderId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                                        <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.customer.username.toUpperCase()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">Rs.{order.totalAmount.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                        <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                            <Link
                                                to={`/orderview/${order.orderId}`}
                                                className="text-blue-600 hover:text-white px-3 py-2 rounded-lg flex items-center border border-transparent hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                <FaEye className="mr-1" /> View
                                            </Link>
                                            {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && order.status !== 'RETURNED' && (
                                                <Link
                                                    to={`/shipmentadd/${order.orderId}`}
                                                    className="text-green-600 hover:text-white px-3 py-2 rounded-lg flex items-center border border-transparent hover:bg-green-600 transition-colors duration-200"
                                                >
                                                    <FaPlus className="mr-1" /> PickList
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => handleDelete(order.orderId)}
                                                className="text-red-600 hover:text-white px-3 py-2 rounded-lg flex items-center border border-transparent hover:bg-red-600 transition-colors duration-200"
                                            >
                                                <FaTrash className="mr-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="mt-8 flex justify-between items-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                            >
                                <FaArrowLeft className="text-xl" />
                            </button>
                            <span className="text-lg font-semibold">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                            >
                                <FaArrowRight className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderViewAll;
