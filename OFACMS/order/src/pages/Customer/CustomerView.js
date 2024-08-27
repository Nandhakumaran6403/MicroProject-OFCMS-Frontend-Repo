import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaArrowLeft } from 'react-icons/fa'; // Import an icon for the "Go Back" button

function CustomerView() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:6789/customers/${id}`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error('Error fetching customer:', error));
  }, [id]);

  if (!customer) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-blue-600 text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <div className="relative p-6 max-w-4xl mt-4 mx-auto bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-teal-800">Customer Details</h1>
          <div className="absolute top-6 right-6 flex items-center">
            <Link
              to={'/customerviewall'}
              className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition duration-300 transform hover:scale-105"
            >
              <FaArrowLeft className="mr-2 text-lg" />
              Go Back
            </Link>
          </div>
          <table className="w-full border-collapse border border-gray-300 mt-16 bg-gray-50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-100">
                <th className="border border-gray-300 px-6 py-3 text-left text-teal-600 font-semibold">Field</th>
                <th className="border border-gray-300 px-6 py-3 text-left text-teal-600 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(customer).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="border border-gray-300 px-6 py-4 font-medium capitalize text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-600">{value || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;