import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faListAlt, faUndo, faWarehouse, faShippingFast } from '@fortawesome/free-solid-svg-icons';

const EmployeeSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-r from-purple-500 to-blue-500 text-white min-h-screen  fixed shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Employee Dashboard</h2>
        <ul>
          <li className="mb-6">
            <Link
              to="/productviewall"
              className="flex items-center text-lg hover:bg-blue-600 px-4 py-3 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faBox} className="mr-3 text-xl" />
              Products
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/orderviewall"
              className="flex items-center text-lg hover:bg-blue-600 px-4 py-3 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faListAlt} className="mr-3 text-xl" />
              Orders
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/returnviewall"
              className="flex items-center text-lg hover:bg-blue-600 px-4 py-3 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faUndo} className="mr-3 text-xl" />
              Returns
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/stocklevelspage"
              className="flex items-center text-lg hover:bg-blue-600 px-4 py-3 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faWarehouse} className="mr-3 text-xl" />
              Stock Levels
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/shipmentviewall"
              className="flex items-center text-lg hover:bg-blue-600 px-4 py-3 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faShippingFast} className="mr-3 text-xl" />
              Shipments
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeSidebar;

