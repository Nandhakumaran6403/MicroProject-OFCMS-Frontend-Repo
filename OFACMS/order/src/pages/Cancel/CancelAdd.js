



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const CancelAdd = () => {
  const { id } = useParams(); // Order ID from URL
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // New state for order details
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        // Fetch all order items from the backend
        const response = await axios.get('http://localhost:6789/order-items/all');
        const allOrderItems = response.data;

        // Filter order items by the specific orderId
        const filteredOrderItems = allOrderItems.filter(item => item.order.orderId === parseInt(id));
        setOrderItems(filteredOrderItems);
      } catch (err) {
        setError('Failed to fetch order items');
        console.error(err);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        // Fetch order details from the backend
        const response = await axios.get(`http://localhost:6789/orders/${id}`);
        setOrderDetails(response.data);
      } catch (err) {
        setError('Failed to fetch order details');
        console.error(err);
      }
    };

    fetchOrderItems();
    fetchOrderDetails();
  }, [id]);

  const handleCancel = async () => {
    try {

    
      await axios.put(`http://localhost:6789/orders/${id}`, {
        ...orderDetails,
        status: 'CANCELLED'
      });

      navigate('/orderhistory'); 
    } catch (err) {
      setError('Failed to submit cancel request');
      console.error(err);
    }
  };

  return (
    <div className="relative flex  flex-col py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Cancel Request</h1>

        {error && <p className="text-red-600 text-center mb-4 flex items-center justify-center"><FaExclamationTriangle className="mr-2" />{error}</p>}

        {orderItems.length === 0 ? (
          <p className="text-center">No items found for this order.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {orderItems.map((item) => (
              <div key={item.orderItemId} className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-10">
                <div className="flex items-center space-x-4">
                  {item.product.imageUrl && (
                    <img
                    src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                      alt={item.product.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.product.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total Price: ${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason for cancellation..."
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md mb-6 resize-none"
        ></textarea>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>

          <button
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Submit Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAdd;
