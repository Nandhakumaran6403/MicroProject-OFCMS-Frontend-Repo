// src/pages/WarehouseEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa'; 
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const WarehouseEdit = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6789/warehouses/${id}`, warehouse);
      navigate('/warehouseviewall'); // Redirect to warehouse list
    } catch (err) {
      setError('Failed to update warehouse');
      console.error(err);
    }
  };

  if (!warehouse) return <p>Loading...</p>;

  const handleGoBack = () => {
    navigate('/warehouseviewall');
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className=" py-12 flex items-center justify-center">
          <div className="container bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-semibold mb-6">Edit Warehouse</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="warehouseName">Warehouse Name</label>
                <input
                  type="text"
                  id="warehouseName"
                  name="warehouseName"
                  value={warehouse.warehouseName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={warehouse.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="manager">Manager</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={warehouse.manager}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="contactInfo">Contact Info</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={warehouse.contactInfo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </form>
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleGoBack}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2 text-xl" />
                Go Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaSave className="mr-2 text-xl" />
                Update Warehouse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseEdit;
