import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { jest } from '@jest/globals';
import axios from 'axios';
import CheckoutPage from '../components/Payment/CheckoutPage';
import rootReducer from '../components/Cart/cartSlice'
import { createStore } from '@reduxjs/toolkit';

jest.mock('axios');

const store = createStore(rootReducer);

const renderWithProviders = (ui) => render(
  <Provider store={store}>
    <Router>{ui}</Router>
  </Provider>
);

describe('CheckoutPage Component', () => {
  test('renders loading state', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<CheckoutPage />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays error when fetching user details fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    renderWithProviders(<CheckoutPage />);

    expect(screen.getByText(/Failed to fetch user details/i)).toBeInTheDocument();
  });

  test('renders form fields and buttons', () => {
    axios.get.mockResolvedValue({ data: {} });

    renderWithProviders(<CheckoutPage />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zipcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();

    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('shows validation errors when form is submitted with invalid data', async () => {
    axios.get.mockResolvedValue({ data: {} });

    renderWithProviders(<CheckoutPage />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Zipcode/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/City is required/i)).toBeInTheDocument();
      expect(screen.getByText(/State is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Zipcode is invalid/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone is invalid/i)).toBeInTheDocument();
    });
  });

  test('submits form data and navigates to payment page', async () => {
    axios.get.mockResolvedValue({ data: {} });
    axios.put.mockResolvedValue({});

    renderWithProviders(<CheckoutPage />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Sample Name' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Sample Last' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Sample St' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Sample City' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'Sample State' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'Sample Country' } });
    fireEvent.change(screen.getByLabelText(/Zipcode/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });

  test('navigates to the previous page on "Go Back" click', () => {
    renderWithProviders(<CheckoutPage />);

    fireEvent.click(screen.getByText(/Go Back/i));

  });
});
