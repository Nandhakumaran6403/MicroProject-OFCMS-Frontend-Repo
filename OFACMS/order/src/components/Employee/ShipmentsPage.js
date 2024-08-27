import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { FaBoxes, FaShippingFast, FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement);

const ShipmentsPage = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Shipments Over Time',
        data: [120, 100, 140, 130, 150, 170],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };


  const pieData = {
    labels: ['In Transit', 'Delivered', 'Pending'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-600">
                <FaBoxes className="text-2xl mr-2" /> Order Management
              </h2>
              <p>View and update status of the orders.</p>
              <Link to="/orderviewall" className="text-blue-600 hover:underline">Manage Orders</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-green-600">
                <FaShippingFast className="text-2xl mr-2" /> Shipment Management
              </h2>
              <p>Manage the shipment.</p>
              <Link to="/shipmentviewall" className="text-green-600 hover:underline">Shipment Manage</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                <FaChartLine className="text-2xl mr-2" /> Shipments Over Time
              </h3>
              <div style={{ height: '300px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-yellow-600">
                <FaChartPie className="text-2xl mr-2" /> Shipments Status
              </h3>
              <div style={{ height: '300px' }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white text-center rounded-lg mt-6">
          &copy; {new Date().getFullYear()} Nandha Mart. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ShipmentsPage;
