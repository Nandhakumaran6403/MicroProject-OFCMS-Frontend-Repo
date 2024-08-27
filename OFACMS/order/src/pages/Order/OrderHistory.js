




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaEye, FaTimes, FaUndo } from 'react-icons/fa';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const customerId = sessionStorage.getItem("userid");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) {
        setError('User ID not found.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:6789/orders/all');
        const allOrders = response.data;

        // Filter orders for the specific customer
        const userOrders = allOrders.filter(order => order.customer.customerId === parseInt(customerId));

        // Sort orders by orderId in descending order
        const sortedOrders = userOrders.sort((a, b) => b.orderId - a.orderId);

        setOrders(sortedOrders);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      }
    };

    fetchOrders();
  }, [customerId]);

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orderuserview/${orderId}`);
  };

  const handleReturnOrder = (orderId) => {
    navigate(`/returnadd/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    navigate(`/canceladd/${orderId}`);
  };

  const handleYourCancels = () => {
    navigate(`/cancelspecific/${customerId}`);
  };

  const handleYourReturns = () => {
    navigate(`/returnspecific/${customerId}`);
  };

  const handleGoToMain = () => {
    navigate('/usermain');
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-r py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
        <button
          onClick={handleGoToMain}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2 text-xl" />
          Go to Main
        </button>
        <div className="absolute top-10 right-4 flex space-x-4 z-10">
          <button
            onClick={handleYourReturns}
            className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-900 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaUndo className="text-xl" />
            <span>Your Returns</span>
          </button>
        </div>

        <div className="pt-12">
          <h1 className="text-3xl font-extrabold mb-8 text-blue-800">Order History</h1>
          
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                {currentOrders.map((order) => (
                  <div key={order.orderId} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-10">
                    <h2 className="text-xl font-semibold mb-2 text-blue-700">Order ID: {order.orderId}</h2>
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> Rs.{order.totalAmount.toFixed(2)}</p>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleViewOrder(order.orderId)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <FaEye className="text-xl" />
                        <span>View</span>
                      </button>

                      {/* Conditionally render Cancel button */}
                      {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && order.status !== 'RETURNED' && (
                        <button
                          onClick={() => handleCancelOrder(order.orderId)}
                          className="bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaTimes className="text-xl" />
                          <span>Cancel</span>
                        </button>
                      )}

                      {/* Conditionally render Return button */}
                      {order.status === 'DELIVERED' && order.status !== 'RETURNED' && (
                        <button
                          onClick={() => handleReturnOrder(order.orderId)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaUndo className="text-xl" />
                          <span>Return</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                >
                  <FaArrowLeft className="text-xl" />
                </button>

                <span className="flex items-center text-lg font-semibold">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
