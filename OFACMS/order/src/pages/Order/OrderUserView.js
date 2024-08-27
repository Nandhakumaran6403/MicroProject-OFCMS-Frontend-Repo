

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaClock, FaBox, FaShippingFast, FaCheckCircle, FaTimes, FaArrowLeft, FaUndo } from 'react-icons/fa';

const OrderUserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:6789/orders/${id}`);
        setOrderDetails(orderResponse.data);

        const itemsResponse = await axios.get('http://localhost:6789/order-items/all');
        const allOrderItems = itemsResponse.data;

        const filteredOrderItems = allOrderItems.filter(item => item.order.orderId === parseInt(id));
        setOrderItems(filteredOrderItems);
      } catch (err) {
        setError('Failed to fetch order data');
        console.error(err);
      }
    };

    fetchOrderData();
  }, [id]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-600';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-600';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-600';
      case 'DELIVERED':
        return 'bg-green-100 text-green-600';
      case 'RETURNED':
        return 'bg-pink-100 text-pink-600'; // New class for RETURNED
      case 'CANCELLED':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-200 text-gray-500';
    }
  };

  const handleBackToHistory = () => {
    navigate('/orderhistory');
  };

  // Define pulse animation style
  const pulseAnimation = {
    animation: 'pulse 2s infinite'
  };

  // Inline keyframes for pulse animation
  const keyframes = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  return (
    <div className="relative flex min-h-screen flex-col  py-12 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style> {/* Inline keyframes */}
      
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
        <button
          onClick={handleBackToHistory}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2 text-xl" /> Back to Order History
        </button>

        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Order Details</h1>

        {orderDetails && (
          <>
            {/* Order Tracking Dashboard */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">Order Tracking Dashboard</h2>
              <div className="relative">
                {/* Steps Indicator */}
                <div className="relative flex items-center justify-between">
                  <div className={`relative flex items-center transition-transform duration-500 ${orderDetails.status === 'PENDING' ? 'text-yellow-600 ' : 'text-gray-500'}`} style={orderDetails.status === 'PENDING' ? pulseAnimation : {}}>
                    <FaClock className="w-8 h-8 transition-transform duration-500" />
                    <p className="text-sm font-medium ml-2">Order Placed</p>
                  </div>
                  <div className={`relative flex items-center transition-transform duration-500 ${orderDetails.status === 'PROCESSING' ? 'text-blue-600 ' : 'text-gray-500'}`} style={orderDetails.status === 'PROCESSING' ? pulseAnimation : {}}>
                    <FaBox className="w-8 h-8 transition-transform duration-500" />
                    <p className="text-sm font-medium ml-2">Processing</p>
                    {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(orderDetails.status) && (
                      <div className="absolute w-full border-t-2 border-blue-600 top-5 left-1/2 transform -translate-x-1/2 transition-all duration-500"></div>
                    )}
                  </div>
                  <div className={`relative flex items-center transition-transform duration-500 ${orderDetails.status === 'SHIPPED' ? 'text-purple-600 ' : 'text-gray-500'}`} style={orderDetails.status === 'SHIPPED' ? pulseAnimation : {}}>
                    <FaShippingFast className="w-8 h-8 transition-transform duration-500" />
                    <p className="text-sm font-medium ml-2">Shipped</p>
                    {['SHIPPED', 'DELIVERED'].includes(orderDetails.status) && (
                      <div className="absolute w-full border-t-2 border-purple-600 top-5 left-1/2 transform -translate-x-1/2 transition-all duration-500"></div>
                    )}
                  </div>
                  <div className={`relative flex items-center transition-transform duration-500 ${orderDetails.status === 'DELIVERED' ? 'text-green-600 ' : 'text-gray-500'}`} style={orderDetails.status === 'DELIVERED' ? pulseAnimation : {}}>
                    <FaCheckCircle className="w-8 h-8 transition-transform duration-500" />
                    <p className="text-sm font-medium ml-2">Delivered</p>
                  </div>
                  {orderDetails.status === 'CANCELLED' && (
                  <div className="flex items-center text-red-600 animate-pulse">
                    <FaTimes className="w-8 h-8 transition-transform duration-500" />
                    <p className="text-sm font-medium ml-2">Cancelled</p>
                  </div>
                )}
                  {orderDetails.status === 'RETURNED' && (
                    <div className={`relative flex items-center transition-transform duration-500 text-pink-600`} style={pulseAnimation}>
                      <FaUndo className="w-8 h-8 transition-transform duration-500" />
                      <p className="text-sm font-medium ml-2">Returned</p>
                    </div>
                  )}

                </div>
                
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-2">Order ID: {orderDetails.orderId}</h2>
              <p><strong>Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(orderDetails.status)}`}>{orderDetails.status}</span></p>
              <p><strong>Total Amount:</strong> Rs.{orderDetails.totalAmount.toFixed(2)}</p>
            </div>
          </>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          {orderItems.length === 0 ? (
            <p className="text-center text-gray-600">No items found for this order.</p>
          ) : (
            <ul className="space-y-4">
              {orderItems.map((item) => (
                <li key={item.product.productId} className="flex items-center bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-10 hover:shadow-lg">
                  {item.product.imageUrl && (
                    <img
                      src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                      alt={item.product.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4 transition-transform duration-300 transform hover:scale-110"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.product.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs.{item.product.price.toFixed(2)}</p>
                    <p>Total: Rs.{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderUserView;






