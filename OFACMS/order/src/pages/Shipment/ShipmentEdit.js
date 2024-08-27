import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ShipmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [shipmentDate, setShipmentDate] = useState('');

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const response = await axios.get(`http://localhost:6789/shipments/${id}`);
                setShipment(response.data);
                setStatus(response.data.status);

                // Set shipmentDate to the current date if it's empty or undefined
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:MM"
                setShipmentDate(response.data.shipmentDate || formattedDate);
            } catch (err) {
                setError('Error fetching shipment details.');
                console.error(err);
            }
        };

        fetchShipment();
    }, [id]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleShipmentDateChange = (e) => {
        setShipmentDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:6789/shipments/${id}`, {
                ...shipment,
                status,
                shipmentDate
            });
            navigate('/employeemain');
        } catch (err) {
            setError('Error updating shipment status.');
            console.error(err);
        }
    };

    if (!shipment) return <p>Loading...</p>;

    return (
        <div className="flex min-h-screen">
            <EmployeeSidebar />

            <div className="flex-1 ml-64 p-6">
                <EmployeeNavbar />
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Shipment</h1>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="trackingNumber">Tracking Number</label>
                                <input
                                    type="text"
                                    id="trackingNumber"
                                    value={shipment.trackingNumber}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="shipmentDate">Shipment Date</label>
                                <input
                                    type="datetime-local"
                                    id="shipmentDate"
                                    value={shipmentDate}
                                    onChange={handleShipmentDateChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="carrier">Courier</label>
                                <input
                                    type="text"
                                    id="corrier"
                                    value={shipment.corrier}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="PENDING">PENDING</option>
                                    {/* <option value="IN-TRANSIT">IN-TRANSIT</option> */}
                                    <option value="PACKED">PACKED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate('/employeemain')}
                                    className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
                                >
                                    <FaArrowLeft className="mr-2" /> Go Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <FaSave className="mr-2" /> Update Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentEdit;
