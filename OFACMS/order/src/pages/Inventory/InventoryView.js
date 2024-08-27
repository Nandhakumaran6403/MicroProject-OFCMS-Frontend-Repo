// src/pages/InventoryView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa'; // Icons for Go Back and Edit
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const InventoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/inventory/${id}`);
        setInventory(response.data);
      } catch (err) {
        setError('Failed to fetch inventory');
        console.error(err);
      }
    };

    fetchInventory();
  }, [id]);

  const handleEdit = () => {
    navigate(`/inventoryedit/${id}`);
  };

  const handleGoBack = () => {
    navigate('/inventoryviewall');
  };

  if (!inventory) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className=" py-12">
          <div className="container mx-auto max-w-lg bg-white p-8 rounded-lg shadow-lg">
           
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="space-y-4">
              <p><strong className="text-gray-700">Product:</strong> {inventory.product.productName}</p>
              <p><strong className="text-gray-700">Warehouse:</strong> {inventory.warehouse.warehouseName}</p>
              <p><strong className="text-gray-700">Quantity:</strong> {inventory.quantity}</p>
              <p><strong className="text-gray-700">Last Updated:</strong> {new Date(inventory.lastUpdated).toLocaleString()}</p>
            </div>
            <div className="flex items-center mt-6 justify-between mb-6">
              <button
                onClick={handleGoBack}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Go Back
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaEdit className="mr-2" />
                Edit Inventory
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default InventoryView;
