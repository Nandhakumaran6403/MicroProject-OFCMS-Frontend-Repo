import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OtpPageUpi = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [showModal, setShowModal] = useState(false); 
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true)

    setTimeout(() => {
      setShowModal(false);
      navigate('/orderconfirm', {
        state: location.state
      });
    }, 2000);
  };

  const content = {
    title: "Enter Your UPI PIN",
    verifyButton: "Submit",
    resend: "Cancel",
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>{content.title}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} method="post">
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full">
                {code.map((value, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="password"
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

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    {content.verifyButton}
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>{content.didNotReceive}</p> 
                  <Link className="flex flex-row items-center text-blue-600" to="#" target="_blank" rel="noopener noreferrer">
                    {content.resend}
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
            <p className="text-green-600 text-xl font-semibold">Your Order has been Placed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpPageUpi;
