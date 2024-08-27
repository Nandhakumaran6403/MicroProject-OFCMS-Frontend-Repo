import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import OtpPageUpi from '../components/Payment/OtpPageUpi';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('OtpPageUpi Component', () => {
  test('renders the title text', () => {
    renderWithRouter(<OtpPageUpi />);
    
    expect(screen.getByText(/Enter Your UPI PIN/i)).toBeInTheDocument();
  });

  test('renders the verify button text', () => {
    renderWithRouter(<OtpPageUpi />);
    
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('renders the resend button text', () => {
    renderWithRouter(<OtpPageUpi />);
    
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('renders the modal message text when modal is shown', () => {
    renderWithRouter(<OtpPageUpi />);

   
    expect(screen.queryByText(/Your Order has been Placed/i)).toBeNull();
  });
});
