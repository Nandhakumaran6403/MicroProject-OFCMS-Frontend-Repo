

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './Cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductsPage = ({ searchTerm }) => {  // Added searchTerm prop
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:6789/product/all');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setModalMessage('Product Added');
        setModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    useEffect(() => {
        if (modalOpen) {
            const timer = setTimeout(() => {
                handleCloseModal();
            }, 1000); // Close the modal after 1 second

            return () => clearTimeout(timer); // Clean up the timer on component unmount
        }
    }, [modalOpen, handleCloseModal]);

    const filteredProducts = products.filter((product) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            product.productName.toLowerCase().includes(lowercasedSearchTerm) ||
            product.categoryName.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        (acc[product.categoryName] = acc[product.categoryName] || []).push(product);
        return acc;
    }, {});

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="container mx-auto mt-10 p-6">
            <h1 className="text-4xl font-bold mb-8 text-teal-600">Products</h1>

            {Object.keys(groupedProducts).map((categoryName) => (
                <div key={categoryName} className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-teal-500">{categoryName}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {groupedProducts[categoryName].map((product) => (
                            <div key={product.productId} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full max-w-xs">
                                <img
                                    src={`data:image/jpeg;base64,${product.imageUrl}`}
                                    alt={product.productName}
                                    className="w-full h-48 object-cover p-4 transform transition-transform duration-300 hover:scale-110"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productName}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                    <p className="text-sm text-blue-600 mb-2">Available Quantity: {product.stockQuantity}</p>
                                    <p className="text-lg font-bold text-teal-500 mb-4">Rs.{product.price}</p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {modalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <FontAwesomeIcon icon={faThumbsUp} style={iconStyle} />
                        <h2 style={modalMessageStyle}>{modalMessage}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    animation: 'fadeIn 0.5s ease-out',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    animation: 'scaleIn 0.3s ease-out',
};

const modalMessageStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#34D399',
};

const iconStyle = {
    fontSize: '2rem',
    color: '#34D399', 
};

const keyframes = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes scaleIn {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

// Inject keyframes into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default ProductsPage;


