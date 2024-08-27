


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const ReturnViewAll = () => {
  const [returns, setReturns] = useState([]);
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get('http://localhost:6789/returns/all');
        const sortedReturns = response.data.sort((a, b) => b.returnId - a.returnId);
        setReturns(sortedReturns);
        setFilteredReturns(sortedReturns);
      } catch (err) {
        setError('Failed to fetch returns');
        console.error(err);
      }
    };
    fetchReturns();
  }, []);

  useEffect(() => {
    const result = returns.filter(item => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const searchTermInt = parseInt(searchTerm, 10);
      const matchesSearch = (item.order.orderId === searchTermInt || item.reason.toLowerCase().includes(lowercasedSearchTerm));
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredReturns(result);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm, statusFilter, returns]);

  // Pagination logic
  const indexOfLastReturn = currentPage * itemsPerPage;
  const indexOfFirstReturn = indexOfLastReturn - itemsPerPage;
  const currentReturns = filteredReturns.slice(indexOfFirstReturn, indexOfLastReturn);
  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this return request?')) {
      try {
        await axios.delete(`http://localhost:6789/returns/${id}`);
        const updatedReturns = returns.filter(item => item.returnId !== id);
        setReturns(updatedReturns);
        setFilteredReturns(updatedReturns);
      } catch (err) {
        setError('Failed to delete return');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="relative flex min-h-screen flex-col  py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-screen-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">All Return Requests</h1>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <div className="flex justify-end mb-6 space-x-4">
              <input
                type="text"
                placeholder="Search by Order ID or Reason"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-4 py-2 rounded-md w-80"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-4 py-2 rounded-md"
              >
                <option value="All">All Statuses</option>
                <option value="REQUESTED">Requested</option>
                <option value="PROCESSING">Processing</option>
                <option value="RETURNED">Returned</option>
              </select>
            </div>

            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100 border-b">
                  <th className="p-3 text-left font-medium text-blue-700">Return ID</th>
                  <th className="p-3 text-left font-medium text-blue-700">Order ID</th>
                  <th className="p-3 text-left font-medium text-blue-700">Reason</th>
                  <th className="p-3 text-left font-medium text-blue-700">Return Date</th>
                  <th className="p-3 text-left font-medium text-blue-700">Status</th>
                  <th className="p-3 text-left font-medium text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentReturns.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-600">No returns found.</td>
                  </tr>
                ) : (
                  currentReturns.map(item => (
                    <tr key={item.returnId} className="border-b hover:bg-blue-50 transition-colors duration-300">
                      <td className="p-3">{item.returnId}</td>
                      <td className="p-3">{item.order.orderId}</td>
                      <td className="p-3">{item.reason}</td>
                      <td className="p-3">{new Date(item.returnDate).toLocaleDateString()}</td>
                      <td className="p-3">{item.status}</td>
                      <td className="p-3 flex space-x-2">
                        <Link to={`/returnview/${item.returnId}`} className="text-blue-500 hover:text-blue-600 flex items-center space-x-1 transition-colors duration-300">
                          <FaEye />
                          <span>View</span>
                        </Link>
                        <Link to={`/returnedit/${item.returnId}`} className="text-yellow-500 hover:text-yellow-600 flex items-center space-x-1 transition-colors duration-300">
                          <FaEdit />
                          <span>Edit</span>
                        </Link>
                        <button onClick={() => handleDelete(item.returnId)} className="text-red-500 hover:text-red-600 flex items-center space-x-1 transition-colors duration-300">
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center disabled:opacity-50"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center disabled:opacity-50"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnViewAll;
