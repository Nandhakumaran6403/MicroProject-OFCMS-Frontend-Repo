



// src/ShipmentsViewAll.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ShipmentsViewAll = () => {
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get('http://localhost:6789/shipments/all');
                
                // Sort shipments by shipmentId in descending order
                const sortedShipments = response.data.sort((a, b) => b.shipmentId - a.shipmentId);
                
                setShipments(sortedShipments);
            } catch (err) {
                setError('Error fetching shipments.');
                console.error(err);
            }
        };

        fetchShipments();
    }, []);

    // Filter shipments based on selected status
    const filteredShipments = shipments
        .filter(shipment => selectedStatus === 'All' || shipment.status === selectedStatus);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

    const handleView = (id) => {
        navigate(`/shipmentview/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/shipmentedit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this shipment?')) {
            try {
                await axios.delete(`http://localhost:6789/shipments/${id}`);
                setShipments(shipments.filter(shipment => shipment.shipmentId !== parseInt(id)));
            } catch (err) {
                setError('Error deleting shipment.');
                console.error(err);
            }
        }
    };

    return (
        <div className="flex min-h-screen ">
            <EmployeeSidebar />

            <div className="flex-1 ml-64 p-6">
                <EmployeeNavbar />
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">All Shipments</h1>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold">Filter by Status:</span>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="border p-2 rounded-md"
                            >
                                <option value="All">All Statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="PACKED">Packed</option>
                                <option value="REJECTED">Rejected</option>
                                {/* <option value="Cancelled">Cancelled</option> */}
                            </select>
                        </div>
                        <table className="w-full border-collapse mb-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left">Tracking Number</th>
                                    <th className="px-4 py-2 text-left">Shipment Date</th>
                                    <th className="px-4 py-2 text-left">Courier</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(shipment => (
                                    <tr key={shipment.shipmentId} className="border-b border-gray-200 transition-transform transform hover:bg-gray-50">
                                        <td className="px-4 py-2">{shipment.trackingNumber}</td>
                                        <td className="px-4 py-2">{shipment.shipmentDate}</td>
                                        <td className="px-4 py-2">{shipment.corrier}</td>
                                        <td className="px-4 py-2">{shipment.status}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                onClick={() => handleView(shipment.shipmentId)}
                                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center"
                                            >
                                                <FaEye className="mr-1" /> View
                                            </button>
                                            <button
                                                onClick={() => handleEdit(shipment.shipmentId)}
                                                className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300 flex items-center"
                                            >
                                                <FaEdit className="mr-1" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(shipment.shipmentId)}
                                                className="text-red-500 hover:text-red-700 transition-colors duration-300 flex items-center"
                                            >
                                                <FaTrash className="mr-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 flex items-center"
                            >
                                <FaChevronLeft />
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 flex items-center"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentsViewAll;
