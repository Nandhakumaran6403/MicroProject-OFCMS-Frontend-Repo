import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const OtpPage = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [showModal, setShowModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [failedAttempts,setFailedAttempts] = useState(0);
    const [showErrorModal, setShowErrorModal] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state || {};

  useEffect(() => {
    if (userDetails?.email) {
      axios.post('http://localhost:6789/api/send-otp', {
        email: userDetails.email
      })
      .then(response => {
        console.log(response.data);
        console.log('OTP sent successfully');
        
        setGeneratedOtp(response.data);
      })
      .catch(error => {
        console.error('Failed to send OTP', error);
      });
    }
  }, [userDetails]);

  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = code.join('');
    
    if (enteredOtp == generatedOtp) {
      setShowModal(true);
      setTimeout(() => {
        navigate('/orderconfirm', {
          state: location.state
        });
      }, 2000);
    } 
    else {
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            setErrorMessage('Invalid OTP. Please try again.');
            setShowErrorModal(true);
      
            if (newFailedAttempts >= 3) {
              setTimeout(() => navigate(-1), 2000);
            }
          }
    // else {
    //   alert('Invalid OTP. Please try again.');
    // }
    // else {
    //   const newFailedAttempts = failedAttempts + 1;
    //   setFailedAttempts(newFailedAttempts);

    //   if (newFailedAttempts >= 3) {
    //     navigate('/usermain'); 
    //   } else {
    //     alert('Invalid OTP. Please try again.');
    //   }
    // }
  };


  const handleCloseModal = () => {
        setShowErrorModal(false);
      };

  const content = {
    title: "Email OTP Verification",
    message: `We have sent a code to your Email Id ${userDetails ? userDetails.email : ''}.`,
    verifyButton: "Verify OTP",
    resend: "Resend",
    didNotReceive: "Didn't receive code?"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{content.title}</h1>
          <p className="text-gray-600">{content.message}</p>
        </div>

        <form onSubmit={handleSubmit} method="post">
          <div className="flex space-x-2 justify-center mb-6">
            {code.map((value, index) => (
              <div key={index} className="relative w-14">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-full h-14 text-2xl text-center border-2 border-gray-300 rounded-lg bg-white transition-all focus:border-blue-500 focus:outline-none"
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !value && index > 0) {
                      inputRefs.current[index - 1].focus();
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            {content.verifyButton}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p className="mb-2">{content.didNotReceive}</p>
            <Link className="text-blue-600 hover:underline" to="#" target="_blank" rel="noopener noreferrer">
              {content.resend}
            </Link>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 transform scale-110 transition-transform duration-300 animate__animated animate__fadeIn">
            <FaCheckCircle className="text-green-500 text-6xl animate__animated animate__heartBeat animate__infinite" />
            <p className="text-green-600 text-xl font-semibold">Your Order has been Placed</p>
          </div>
        </div>
      )}

{showErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 transform scale-110 transition-transform duration-300 animate__animated animate__fadeIn">
              <p className="text-red-600 text-xl font-semibold">{errorMessage}</p>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default OtpPage;

