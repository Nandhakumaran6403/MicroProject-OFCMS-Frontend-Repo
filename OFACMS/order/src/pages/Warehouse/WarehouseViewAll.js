

// src/pages/WarehouseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for actions and pagination
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const WarehouseViewAll = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:6789/warehouses/all');
        setWarehouses(response.data);
      } catch (err) {
        setError('Failed to fetch warehouses');
        console.error(err);
      }
    };

    fetchWarehouses();
  }, []);

  const handleView = (id) => {
    navigate(`/warehouseview/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/warehouseedit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      try {
        await axios.delete(`http://localhost:6789/warehouses/${id}`);
        setWarehouses(warehouses.filter(warehouse => warehouse.warehouseId !== id));
      } catch (err) {
        setError('Failed to delete warehouse');
        console.error(err);
      }
    }
  };

  // Search and filter warehouses
  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWarehouses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredWarehouses.length / itemsPerPage);

  return (
    <div className="flex min-h-screen ">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className="flex-1 py-12">
          <div className="container mx-auto max-w-7xl bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">Warehouse List</h1>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <input
                type="text"
                placeholder="Search by Warehouse Name or Location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 w-1/3"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Warehouse Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Manager</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map(warehouse => (
                    <tr key={warehouse.warehouseId} className="transition-transform transform hover:scale-10">
                      <td className="px-6 py-4 whitespace-nowrap">{warehouse.warehouseName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{warehouse.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{warehouse.manager}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{warehouse.contactInfo}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                        <button
                          onClick={() => handleView(warehouse.warehouseId)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center"
                        >
                          <FaEye className="mr-1" />
                        </button>
                        <button
                          onClick={() => handleEdit(warehouse.warehouseId)}
                          className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200 flex items-center"
                        >
                          <FaEdit className="mr-1" />
                        </button>
                        <button
                          onClick={() => handleDelete(warehouse.warehouseId)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                        >
                          <FaTrash className="mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
              >
                <FaChevronLeft />
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseViewAll;
