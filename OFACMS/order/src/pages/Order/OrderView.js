import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaFileInvoice, FaEdit, FaShoppingCart } from "react-icons/fa";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";

const OrderView = () => {
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

  const handleBackToHistory = () => {
    navigate('/orderviewall');
  };

  const handleInvoiceOrder = () => {
    navigate(`/invoiceview/${id}`);
  };

  const handleEditOrder = () => {
    navigate(`/orderedit/${id}`);
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="relative flex min-h-screen flex-col py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Order Details</h1>

            {/* Buttons Container */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackToHistory}
                className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Orders
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={handleInvoiceOrder}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                >
                  <FaFileInvoice className="mr-2" /> Invoice
                </button>
                <button
                  onClick={handleEditOrder}
                  className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                  <FaEdit className="mr-2" /> Update Status
                </button>
              </div>
            </div>

            {orderDetails && (
              <>
                {/* Order Details */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-2">Order ID: {orderDetails.orderId}</h2>
                  <p><strong>Customer Name:</strong> {orderDetails.customer.username.toUpperCase()}</p>
                  <p><strong>Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                  <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
                  <p><strong>Status:</strong> {orderDetails.status}</p>
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
                    <li key={item.product.productId} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-10">
                      {item.product.imageUrl && (
                        <img
                        src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                          alt={item.product.productName}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{item.product.productName}</p>
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
      </div>
    </div>
  );
};

export default OrderView;
