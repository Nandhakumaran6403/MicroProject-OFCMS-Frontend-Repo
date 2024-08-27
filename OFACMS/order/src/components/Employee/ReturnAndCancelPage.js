import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { FaBoxOpen, FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement);

const ReturnAndCancelPage = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Returns Over Time',
        data: [10, 20, 15, 30, 25, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };


  const doughnutData = {
    labels: ['Returned', 'Not Returned'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(201, 203, 207, 1)'],
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
           

            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaChartBar className="text-2xl text-teal-600 mr-2" /> Return Manage
              </h2>
              <p>View and handle return requests.</p>
              <Link to="/returnviewall" className="text-teal-600 hover:underline">Manage Returns</Link>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 flex items-center">
                <FaChartLine className="text-2xl mr-2" /> Returns Over Time
              </h3>
              <div style={{ height: '250px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>


            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 flex items-center">
                <FaBoxOpen className="text-2xl mr-2" /> Return Status
              </h3>
              <div style={{ height: '250px' }}>
                <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
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

export default ReturnAndCancelPage;
