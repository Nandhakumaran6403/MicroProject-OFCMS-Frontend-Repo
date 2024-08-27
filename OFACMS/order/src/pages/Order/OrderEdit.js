import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaSave, FaRegTimesCircle } from "react-icons/fa";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customer: {
      customerId: '' // Changed from username to customerId
    },
    orderDate: '',
    paymentMethod: '',
    paymentStatus: '',
    totalAmount: 0,
    status: ''
  });
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch order details
        const orderResponse = await axios.get(`http://localhost:6789/orders/${id}`);
        setOrderDetails(orderResponse.data);

        // Fetch order items
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

  const handleStatusChange = (event) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      status: event.target.value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update order status
      await axios.put(`http://localhost:6789/orders/${id}`, { 
        ...orderDetails, // Spread the existing details
        status: orderDetails.status // Update the status
      });

      // If status is SHIPPED, update inventory
      if (orderDetails.status === 'SHIPPED') {
        try {
          // Fetch all inventory
          const inventoryResponse = await axios.get('http://localhost:6789/inventory/all');
          const allInventory = inventoryResponse.data;

          // Update inventory based on order items
          for (const item of orderItems) {
            const productId = item.product.productId;
            const itemQuantity = item.quantity;

            // Find the relevant inventory item
            const inventoryItem = allInventory.find(inv => inv.product.productId === productId);
            if (inventoryItem) {
              const updatedQuantity = inventoryItem.quantity - itemQuantity;

              // Update the inventory
              await axios.put(`http://localhost:6789/inventory/${inventoryItem.inventoryId}`, {
                ...inventoryItem,
                quantity: updatedQuantity
              });
            }
          }
        } catch (inventoryError) {
          console.error('Failed to update inventory', inventoryError);
          setError('Failed to update inventory');
        }
      }

      navigate(`/orderview/${id}`);
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate(`/orderview/${id}`);
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="flex min-h-screen ">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="relative flex min-h-screen flex-col py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Edit Order</h1>

            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300 flex items-center mb-6"
            >
              <FaArrowLeft className="mr-2" /> Back to Order View
            </button>

            {orderDetails && (
              <>
                {/* Order Details */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Order ID: {orderDetails.orderId}</h2>
                  <p><strong>Customer ID:</strong> {orderDetails.customer.customerId}</p>
                  <p><strong>Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                  <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
                  <p><strong>Total Amount:</strong> Rs.{orderDetails.totalAmount.toFixed(2)}</p>

                  {/* Editable Status Field */}
                  <div className="mt-4">
                    <label className="block text-lg font-semibold mb-2 text-gray-700" htmlFor="status">Status:</label>
                    <select
                      id="status"
                      value={orderDetails.status}
                      onChange={handleStatusChange}
                      className="block w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="RETURNED">RETURNED</option>
                    </select>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
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

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300 flex items-center"
                  >
                    <FaRegTimesCircle className="mr-2" /> Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
