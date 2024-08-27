import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapMarkerAlt, faPhone, faSave, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    createdAt: "",
    email: "",
    passwordHash: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/customers/${userId}`);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          country: response.data.country || "",
          zipcode: response.data.zipcode || "",
          phone: response.data.phone || "",
          username: response.data.username || "",
          createdAt: response.data.createdAt || "",
          email: response.data.email || "",
          passwordHash: response.data.passwordHash || "",
          updatedAt: response.data.updatedAt || "",
        });
        setLoading(false);
      } catch (err) {
        console.log("Error fetching user details:", err);
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.zipcode.trim() || !/^\d{6}$/.test(formData.zipcode)) newErrors.zipcode = "Zipcode must be a 5-digit number";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const userId = sessionStorage.getItem("userid");
      await axios.put(`http://localhost:6789/customers/${userId}`, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      navigate("/payment", { state: { cartItems, userDetails: formData } });
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Failed to update user details");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;

  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-teal-700 flex items-center">
        <FontAwesomeIcon icon={faSave} className="mr-3 text-teal-600" />
        Shipping Address and Other Details
      </h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.firstName ? 'border-red-500' : ''}`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.lastName ? 'border-red-500' : ''}`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <div className="relative">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.address ? 'border-red-500' : ''}`}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.city ? 'border-red-500' : ''}`}
                required
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.state ? 'border-red-500' : ''}`}
                required
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.country ? 'border-red-500' : ''}`}
                required
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.zipcode ? 'border-red-500' : ''}`}
                required
              />
              {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
            </div>
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <div className="relative">
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.phone ? 'border-red-500' : ''}`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Go Back
          </button>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
