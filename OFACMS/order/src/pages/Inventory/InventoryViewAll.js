

// src/pages/InventoryViewAll.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for actions and pagination
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const InventoryViewAll = () => {
  const navigate = useNavigate();
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get('http://localhost:6789/inventory/all');
        setInventories(response.data);
      } catch (err) {
        setError('Failed to fetch inventories');
        console.error(err);
      }
    };

    fetchInventories();
  }, []);

  const handleView = (id) => {
    navigate(`/inventoryview/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/inventoryedit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory?')) {
      try {
        await axios.delete(`http://localhost:6789/inventory/${id}`);
        setInventories(inventories.filter(inventory => inventory.inventoryId !== id));
      } catch (err) {
        setError('Failed to delete inventory');
        console.error(err);
      }
    }
  };

  // Search and filter inventories
  const filteredInventories = inventories.filter(inventory =>
    inventory.product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inventory.warehouse.warehouseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventories.length / itemsPerPage);

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className=" py-12">
          <div className="container mx-auto max-w-7xl bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Inventory List</h1>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <input
                type="text"
                placeholder="Search by Product or Warehouse"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 w-1/3"
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map(inventory => (
                  <tr key={inventory.inventoryId} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">{inventory.product.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inventory.warehouse.warehouseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inventory.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(inventory.lastUpdated).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        onClick={() => handleView(inventory.inventoryId)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(inventory.inventoryId)}
                        className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(inventory.inventoryId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default InventoryViewAll;
