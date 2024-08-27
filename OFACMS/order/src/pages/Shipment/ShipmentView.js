




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ShipmentView = () => {
    const { id } = useParams(); // Get the shipment ID from the URL
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShipmentDetails = async () => {
            try {
                // Fetch shipment details
                const shipmentResponse = await axios.get(`http://localhost:6789/shipments/${id}`);
                setShipment(shipmentResponse.data);
    
                // Extract product IDs from the shipment's order items
                const productIds = shipmentResponse.data.orderItem.product.productId;
                console.log('Product IDs:', productIds);
    
                // Fetch all inventory details
                const inventoryResponse = await axios.get('http://localhost:6789/inventory/all');
                setInventory(inventoryResponse.data);
    
                // Filter inventory based on product IDs
                const filtered = inventoryResponse.data.filter(item => item.product && item.product.productId === parseInt(productIds));
                console.log('Filtered Inventory:', filtered);
                setFilteredInventory(filtered);
            } catch (err) {
                setError('Error fetching shipment or inventory details.');
                console.error(err);
            }
        };
    
        fetchShipmentDetails();
    }, [id]);
    

    const handleDownload = async () => {
        const input = document.getElementById('invoice-content');
        try {
            // Hide the buttons before generating PDF
            document.querySelector('.action-buttons').style.display = 'none';
            
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width * 0.75;
            const imgHeight = (canvas.height * 0.75 * pdfWidth) / imgWidth;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`shipment_${id}.pdf`);
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            // Show the buttons again after generating PDF
            document.querySelector('.action-buttons').style.display = 'flex';
        }
    };

    const handleEdit = () => {
        navigate(`/shipmentedit/${id}`); // Redirect to the edit page
    };

    if (!shipment) return <p>Loading...</p>;

    const { orderItem, trackingNumber, shipmentDate, corrier, status } = shipment;
    const order = orderItem ? orderItem.order : {}; // Assuming order is a property of OrderItem
    const orderItems = orderItem ? [orderItem] : []; // Assuming the shipment contains only one order item

    const formatDate = (date) => {
        const dateObject = new Date(date);
        return dateObject.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:MM"
    };

    return (
        <div className="flex min-h-screen">
            <EmployeeSidebar />

            <div className="flex-1 ml-64 p-6">
                <EmployeeNavbar />
                <div className="container mx-auto p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6" id="invoice-content">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Pick List</h1>
                                <p className="text-gray-600">Date: {formatDate(shipmentDate)}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-semibold text-gray-800">Shipment Details</h2>
                                <p className="text-gray-600">Tracking Number: {trackingNumber}</p>
                                <p className="text-gray-600">Courier: {corrier}</p>
                                <p className="text-gray-600">Status: {status}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Order ID</h3>
                                    <p className="text-gray-600">{order.orderId || 'N/A'}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700">Order Date</h3>
                                    <p className="text-gray-600">{order.orderDate || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Item ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Product Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.length > 0 ? (
                                        orderItems.map(item => (
                                            <tr key={item.orderItemId} className="border-b border-gray-200">
                                                <td className="border border-gray-300 px-4 py-2">{item.orderItemId}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.product?.productName || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.quantity || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {item.product?.imageUrl ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                                                            alt={item.product.productName}
                                                            className="w-24 h-24 object-cover"
                                                        />
                                                    ) : (
                                                        <p>No image available</p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No order items available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Inventory Details</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Inventory ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Available Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventory.length > 0 ? (
                                        filteredInventory.map(item => (
                                            <tr key={item.inventoryId} className="border-b border-gray-200">
                                                <td className="border border-gray-300 px-4 py-2">{item.inventoryId || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.product?.productName || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.quantity || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No inventory details available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4 action-buttons">
                            <button
                                onClick={handleDownload}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                            >
                                Download PDF
                            </button>
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                                Edit Shipment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentView;
