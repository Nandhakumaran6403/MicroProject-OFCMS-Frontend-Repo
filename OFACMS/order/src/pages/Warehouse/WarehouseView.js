// src/pages/WarehouseView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa'; // Icons for Go Back and Edit
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const WarehouseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/warehouses/${id}`);
        setWarehouse(response.data);
      } catch (err) {
        setError('Failed to fetch warehouse');
        console.error(err);
      }
    };

    fetchWarehouse();
  }, [id]);

  const handleEdit = () => {
    navigate(`/warehouseedit/${id}`);
  };

  const handleGoBack = () => {
    navigate('/warehouseviewall');
  };

  if (!warehouse) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6 flex flex-col">
        <EmployeeNavbar />

        <div className="flex-1 py-24 flex flex-col">
          <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col flex-grow">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Warehouse Details</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-1/3">Warehouse Name:</span>
                <span className="text-gray-900">{warehouse.warehouseName}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-1/3">Location:</span>
                <span className="text-gray-900">{warehouse.location}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-1/3">Manager:</span>
                <span className="text-gray-900">{warehouse.manager}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-1/3">Contact Info:</span>
                <span className="text-gray-900">{warehouse.contactInfo}</span>
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <button
                onClick={handleGoBack}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center hover:bg-gray-400 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2 text-xl" />
                Go Back
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaEdit className="mr-2 text-xl" />
                Edit Warehouse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseView;
