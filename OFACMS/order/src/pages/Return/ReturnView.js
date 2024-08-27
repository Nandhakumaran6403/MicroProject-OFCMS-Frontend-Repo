import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ReturnView = () => {
  const { id } = useParams(); // Return ID from URL
  const navigate = useNavigate();
  const [returnDetails, setReturnDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnDetails = async () => {
      try {
        // Fetch return details
        const returnResponse = await axios.get(`http://localhost:6789/returns/${id}`);
        setReturnDetails(returnResponse.data);

        // Fetch all return items
        const allReturnItemsResponse = await axios.get('http://localhost:6789/return-items/all');
        const allReturnItems = allReturnItemsResponse.data;

        // Filter return items by the specific returnId
        const filteredReturnItems = allReturnItems.filter(item => item.returnItem.returnId === parseInt(id));
        setOrderItems(filteredReturnItems);
      } catch (err) {
        setError('Failed to fetch return details or return items');
        console.error(err);
      }
    };

    fetchReturnDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/returnedit/${id}`);
  };

  const handleBack = () => {
    navigate('/returnviewall');
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
            <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">Return Details</h1>

            {returnDetails ? (
              <>
                {/* Return Details */}
                <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6 hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Return ID: {returnDetails.returnId}</h2>
                  <p className="text-gray-700"><strong>Order ID:</strong> {returnDetails.order.orderId}</p>
                  <p className="text-gray-700"><strong>Reason:</strong> {returnDetails.reason}</p>
                  <p className="text-gray-700"><strong>Return Date:</strong> {new Date(returnDetails.returnDate).toLocaleDateString()}</p>
                  <p className="text-gray-700"><strong>Status:</strong> {returnDetails.status}</p>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Items</h2>
                  {orderItems.length === 0 ? (
                    <p className="text-center text-gray-600">No items found for this return request.</p>
                  ) : (
                    orderItems.map((item) => (
                      <div key={item.orderItem.product.productId} className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
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
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-600 transition-colors duration-300"
                  >
                    <FaArrowLeft className="mr-2" /> Back to List
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">No details found for this return request.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnView;
