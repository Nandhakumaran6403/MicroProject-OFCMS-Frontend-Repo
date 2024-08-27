import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa'; 
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

// Function to generate a random tracking number
const generateTrackingNumber = () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase(); // Simple alphanumeric generator
};

// Function to get the current date and time formatted for datetime-local input
const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const ShipmentAdd = () => {
    const { id } = useParams(); // Change this to match the parameter name in the route
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState([]);
    const [corrier, setCorrier] = useState(''); // Corrected variable name
    const [trackingNumber, setTrackingNumber] = useState(generateTrackingNumber());
    const [shipmentDate, setShipmentDate] = useState(getCurrentDateTime()); // Set to current date and time
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axios.get('http://localhost:6789/order-items/all');
                const allItems = response.data;

                // Filter order items based on the orderId
                const filteredItems = allItems.filter(item => item.order.orderId === parseInt(id));
                setOrderItems(filteredItems);
            } catch (err) {
                setError('Error fetching order items.');
                console.error(err);
            }
        };

        fetchOrderItems();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Iterate over each orderItemId and create a shipment entry for each
            for (const item of orderItems) {
                await axios.post('http://localhost:6789/shipments', {
                    orderItem: {
                        orderItemId: item.orderItemId
                    }, // Send single orderItemId
                    shipmentDate,
                    trackingNumber,
                    corrier, // Corrected variable name
                    status: 'PENDING'
                });
            }
            navigate('/shipmentviewall'); // Redirect to the shipment view all page
        } catch (err) {
            setError('Error creating shipment.');
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <EmployeeSidebar />

            <div className="flex-1 ml-64 p-6 flex flex-col">
                <EmployeeNavbar />
                <div className="container mx-auto p-4 flex flex-col flex-grow">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Shipment</h1>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col flex-grow">
                        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="shipmentDate">Shipment Date</label>
                                <input
                                    type="datetime-local"
                                    id="shipmentDate"
                                    value={shipmentDate}
                                    onChange={(e) => setShipmentDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="carrier">Courier</label>
                                <select
                                    id="carrier"
                                    value={corrier}
                                    onChange={(e) => setCorrier(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="" disabled>Select a courier</option>
                                    <option value="BLUE DART">BLUE DART</option>
                                    <option value="EXPRESS">EXPRESS</option>
                                    <option value="ABT COURIER">ABT COURIER</option>
                                    <option value="ST COURIER">ST COURIER</option>
                                    <option value="PROFESSIONAL COURIER">PROFESSIONAL COURIER</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="trackingNumber">Tracking Number</label>
                                <input
                                    type="text"
                                    id="trackingNumber"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    readOnly
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <FaSave className="mr-2" /> Create Shipment
                            </button>
                        </form>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => navigate('/orderviewall')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200 flex items-center"
                            >
                                <FaArrowLeft className="mr-2" /> Go Back
                            </button>
                        </div>
                        <div className="mt-6 flex-grow">
                            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Item ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map(item => (
                                        <tr key={item.orderItemId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                                            <td className="border border-gray-300 px-4 py-2">{item.orderItemId}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.product.productName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentAdd;
