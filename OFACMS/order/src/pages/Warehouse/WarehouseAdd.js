



// src/pages/WarehouseAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from 'react-icons/fa'; 
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import Modal from 'react-modal';

const WarehouseAdd = () => {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState({
    warehouseName: '',
    location: '',
    manager: '',
    contactInfo: ''
  });
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch existing warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:6789/warehouses/all');
        setWarehouses(response.data);
      } catch (err) {
        console.error('Failed to fetch warehouses:', err);
      }
    };
    fetchWarehouses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if warehouse name already exists
    const existingWarehouse = warehouses.find(w => w.warehouseName === warehouse.warehouseName);

    if (existingWarehouse) {
      // Show modal if name already exists
      setModalMessage('Warehouse name already exists, please try another name.');
      setModalIsOpen(true);
    } else {
      // Proceed with POST request
      try {
        await axios.post('http://localhost:6789/warehouses', warehouse);
        navigate('/warehouseviewall'); // Redirect to warehouse list
      } catch (err) {
        setError('Failed to add warehouse');
        console.error(err);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/warehouseviewall');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6 flex flex-col">
        <EmployeeNavbar />

        <div className="flex-1 py-12 flex items-center justify-center">
          <div className="container bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full flex flex-col">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Warehouse</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form className="flex-grow" onSubmit={handleSubmit}>
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
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <FaArrowLeft className="mr-2 text-xl" />
                  Go Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
                >
                  <FaPlus className="mr-2 text-xl" />
                  Add Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for error messages */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Error</h2>
          <p>{modalMessage}</p>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WarehouseAdd;
