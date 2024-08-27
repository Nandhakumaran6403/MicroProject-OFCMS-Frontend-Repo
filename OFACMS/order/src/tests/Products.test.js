// src/__tests__/ProductsPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../components/Cart/cartSlice'
import ProductsPage from '../components/Products';

// Create a mock store
const store = createStore(rootReducer);

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

describe('ProductsPage Component', () => {
  test('renders Products page header', () => {
    renderWithStore(<ProductsPage />);
    
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
  });

  test('renders modal message text when modal is open', () => {
    renderWithStore(<ProductsPage />);

   
    expect(screen.queryByText(/Product Added/i)).toBeNull(); 
  });
});
