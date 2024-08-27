import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaClock, FaTruck, FaBox } from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]); 
  const { orderResponse, userDetails } = location.state || {};

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:6789/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    if (orderResponse?.orderId) {
      fetchOrderDetails(orderResponse.orderId);

      setTimeout(() => {
        // window.location.reload(); // Reload the page  
          navigate('/usermain'); // Navigate to usermain after reload
          window.location.reload();
      }, 5000); // Wait 5 seconds before reload
    }
  }, [orderResponse, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmation</h1>
          <p className="text-lg text-gray-700">
            Your Order ID: <span className="font-semibold">{orderResponse?.orderId}</span>
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-semibold mb-6">Order Tracking Dashboard</h2>
          <div className="space-y-4">
            <div className={`flex items-center space-x-3 ${orderDetails?.status === 'PENDING' ? 'text-yellow-600' : 'text-gray-500'}`}>
              <FaClock className={`text-2xl ${orderDetails?.status === 'PENDING' ? 'text-yellow-500' : 'text-gray-300'}`} />
              <p className="text-lg font-medium">Order Placed</p>
            </div>
            <div className={`flex items-center space-x-3 ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(orderDetails?.status) ? 'text-blue-600' : 'text-gray-500'}`}>
              <FaBox className={`text-2xl ${orderDetails?.status === 'PROCESSING' ? 'text-blue-500' : 'text-gray-300'}`} />
              <p className="text-lg font-medium">Processing</p>
            </div>
            <div className={`flex items-center space-x-3 ${['SHIPPED', 'DELIVERED'].includes(orderDetails?.status) ? 'text-purple-600' : 'text-gray-500'}`}>
              <FaTruck className={`text-2xl ${orderDetails?.status === 'SHIPPED' ? 'text-purple-500' : 'text-gray-300'}`} />
              <p className="text-lg font-medium">Shipped</p>
            </div>
            <div className={`flex items-center space-x-3 ${orderDetails?.status === 'DELIVERED' ? 'text-green-600' : 'text-gray-500'}`}>
              <FaCheckCircle className={`text-2xl ${orderDetails?.status === 'DELIVERED' ? 'text-green-500' : 'text-gray-300'}`} />
              <p className="text-lg font-medium">Delivered</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Order Details</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">User Details</h3>
            <p className="text-gray-800">Name: <span className="font-semibold">{userDetails?.username.toUpperCase()}</span></p>
            <p className="text-gray-800">Email: <span className="font-semibold">{userDetails?.email}</span></p>
            <p className="text-gray-800">Phone: <span className="font-semibold">{userDetails?.phone}</span></p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
            <ul className="space-y-4">
              {cartItems?.map(item => (
                <li key={item.productId} className="flex items-center space-x-4 border-b pb-4">
                  <img  src={`data:image/jpeg;base64,${item.imageUrl}`} alt={item.productName} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-grow">
                    <p className="font-semibold text-lg">{item.productName}</p>
                    <p>Quantity: <span className="font-semibold">{item.quantity}</span></p>
                    <p>Total Price: <span className="font-semibold">Rs.{item.price * item.quantity}</span></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Total Amount: <span className="font-semibold text-blue-600">Rs.{orderResponse?.totalAmount}</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
