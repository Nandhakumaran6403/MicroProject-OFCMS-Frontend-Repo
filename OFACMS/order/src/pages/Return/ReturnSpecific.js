

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReturnSpecific = () => {
  const { id } = useParams(); // User ID from URL
  const navigate = useNavigate();
  const [returns, setReturns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [returnsPerPage] = useState(6); // Number of returns per page
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        // Fetch all returns
        const response = await axios.get('http://localhost:6789/returns/all');
        const allReturns = response.data;

        // Filter returns for the specific user
        const userReturns = allReturns.filter(item => item.order.customer.customerId === parseInt(id));

        // Sort returns by returnId in descending order
        const sortedReturns = userReturns.sort((a, b) => b.returnId - a.returnId);

        setReturns(sortedReturns);
      } catch (err) {
        setError('Failed to fetch returns');
        console.error(err);
      }
    };

    fetchReturns();
  }, [id]);

  // Pagination logic
  const indexOfLastReturn = currentPage * returnsPerPage;
  const indexOfFirstReturn = indexOfLastReturn - returnsPerPage;
  const currentReturns = returns.slice(indexOfFirstReturn, indexOfLastReturn);
  const totalPages = Math.ceil(returns.length / returnsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBack = () => {
    navigate('/orderhistory');
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="relative flex min-h-screen flex-col py-12 px-4">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-lg mx-auto w-full max-w-screen-lg rounded-lg">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2 text-xl" /> Go Back
        </button>
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Return Requests for User</h1>

        {currentReturns.length === 0 ? (
          <p className="text-center text-gray-600">No returns found for this user.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReturns.map((item) => (
                  <tr key={item.returnId} className="hover:bg-gray-50 transition-colors duration-200">
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.returnId}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.returnDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/returnuserview/${item.returnId}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                        <FaEye className="mr-2" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnSpecific;
