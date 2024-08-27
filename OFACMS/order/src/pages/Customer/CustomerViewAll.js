



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaEye, FaTrashAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

function CustomerViewAll() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:6789/customers/all')
      .then(response => {
        const data = response.data;
        setCustomers(data);
        setFilteredCustomers(data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  useEffect(() => {
    const result = customers.filter(customer =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(result);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, customers]);

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(`http://localhost:6789/customers/${id}`)
        .then(() => {
          setCustomers(customers.filter(c => c.customerId !== id));
          setFilteredCustomers(filteredCustomers.filter(c => c.customerId !== id));
        })
        .catch(error => console.error('Error deleting customer:', error));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-teal-800">All Customers</h1>
          <div className="mb-4 flex justify-end items-center space-x-2">
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded-md"
            />
            <button
              onClick={() => setSearchTerm('')}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300"
            >
              Clear
            </button>
          </div>
          <div className="overflow-x-auto">
            <motion.table
              className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead>
                <tr className="bg-teal-100">
                  {['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Zip Code', 'Country', 'Username', 'Role', 'Actions'].map(header => (
                    <th key={header} className="border border-gray-300 px-4 py-3 text-left text-teal-800 font-medium">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map(customer => (
                  <motion.tr
                    key={customer.customerId}
                    className="hover:bg-gray-50 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="border border-gray-300 px-4 py-3">{customer.customerId}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.firstName || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.lastName || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.email}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.phone || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.address || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.city || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.state || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.zipCode || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.country || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.username.toUpperCase()}</td>
                    <td className="border border-gray-300 px-4 py-3">{customer.role}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex space-x-3">
                        <Link to={`/customerview/${customer.customerId}`} className="text-blue-500 hover:text-blue-700 transition duration-300">
                          <FaEye size={18} />
                        </Link>
                        {/* <Link to={`/customeredit/${customer.customerId}`} className="text-yellow-500 hover:text-yellow-700 transition duration-300">
                          <FaEdit size={18} />
                        </Link> */}
                        <button onClick={() => handleDelete(customer.customerId)} className="text-red-500 hover:text-red-700 transition duration-300">
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerViewAll;
