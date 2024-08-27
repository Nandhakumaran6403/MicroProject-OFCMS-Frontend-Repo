
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ReturnEdit = () => {
  const { id } = useParams(); // Return ID from URL
  const navigate = useNavigate();
  const [returnDetails, setReturnDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnDetails = async () => {
      try {
        // Fetch return details
        const returnResponse = await axios.get(`http://localhost:6789/returns/${id}`);
        setReturnDetails(returnResponse.data);
        setStatus(returnResponse.data.status);

        // Fetch all return items
        const allReturnItemsResponse = await axios.get('http://localhost:6789/return-items/all');
        const allReturnItems = allReturnItemsResponse.data;

        // Filter return items by the specific returnId
        const filteredReturnItems = allReturnItems.filter(item => item.returnItem.returnId === parseInt(id));
        setOrderItems(filteredReturnItems);
      } catch (err) {
        setError('Failed to fetch return details');
        console.error(err);
      }
    };

    fetchReturnDetails();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      // Get current date
      const currentDate = new Date().toISOString(); // ISO format

      // Update return details with current date
      await axios.put(`http://localhost:6789/returns/${id}`, {
        ...returnDetails, // Spread existing details
        status: status, // Update status
        returnDate: currentDate // Set current date as return date
      });
      navigate(`/returnview/${id}`); // Redirect to view page after saving
    } catch (err) {
      setError('Failed to update return details');
      console.error(err);
    }
  };

  const handleReturn = () => {
    navigate(`/returnview/${id}`); // Redirect to view page without saving
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="relative flex min-h-screen flex-col bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center mb-8">Edit Return</h1>

            {returnDetails ? (
              <>
                {/* Return Details */}
                <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-2">Return ID: {returnDetails.returnId}</h2>
                  <p className="text-gray-700"><strong>Order ID:</strong> {returnDetails.order.orderId}</p>
                  <p className="text-gray-700"><strong>Reason:</strong> {returnDetails.reason}</p>
                  <p className="text-gray-700"><strong>Return Date:</strong> {new Date(returnDetails.returnDate).toLocaleDateString()}</p>
                  
                  {/* Editable Status Field */}
                  <div className="mt-4">
                    <label className="block text-lg font-semibold mb-2" htmlFor="status">Status:</label>
                    <select
                      id="status"
                      value={status}
                      onChange={handleStatusChange}
                      className="block w-full p-3 border border-gray-300 rounded-md bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <option value="REQUESTED">Requested</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="RETURNED">Returned</option>
                    </select>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  {orderItems.length === 0 ? (
                    <p className="text-center text-gray-500">No items found for this return request.</p>
                  ) : (
                    orderItems.map((item) => (
                      <div key={item.orderItem.product.productId} className="bg-gray-200 p-4 rounded-lg shadow-md">
                        <div className="flex items-center space-x-4">
                          {item.orderItem.product.imageUrl && (
                            <img
                            src={`data:image/jpeg;base64,${item.orderItem.product.imageUrl}`}
                              alt={item.orderItem.product.productName}
                              className="w-20 h-20 object-cover rounded-md shadow-md"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-gray-800">{item.orderItem.product.productName}</p>
                            <p className="text-gray-600">Quantity: {item.orderItem.quantity}</p>
                            <p className="text-gray-600">Total Price: Rs.{item.orderItem.price * item.orderItem.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                  <button
                    onClick={handleReturn}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-600 transition-colors duration-300"
                  >
                    <FaArrowLeft className="mr-2" /> Return
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">No details found for this return request.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnEdit;
