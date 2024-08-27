import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faListAlt, 
  faUndo, 
  faWarehouse, 
  faShippingFast, 
  faUserPlus, 
  faUserCog, 
  faUsers 
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-teal-700 to-teal-900 text-white min-h-screen fixed shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li className="mb-6">
            <Link
              to="/employeemain"
              className="flex items-center text-lg hover:bg-teal-600 px-4 py-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3 text-xl" />
              Act as Employee
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/adminuseradd"
              className="flex items-center text-lg hover:bg-teal-600 px-4 py-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-3 text-xl" />
              Add Employee
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/adminuserviewall"
              className="flex items-center text-lg hover:bg-teal-600 px-4 py-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faUserCog} className="mr-3 text-xl" />
              Manage Employees
            </Link>
          </li>

          <li className="mb-6">
            <Link
              to="/auditlogviewall"
              className="flex items-center text-lg hover:bg-teal-600 px-4 py-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faListAlt} className="mr-3 text-xl" />
              Manage Audit Logs
            </Link>
          </li>

          <li className="mb-6">
            <Link
              to="/customerviewall"
              className="flex items-center text-lg hover:bg-teal-600 px-4 py-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faBox} className="mr-3 text-xl" />
              View Customers
            </Link>
          </li>

         
         
         
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
