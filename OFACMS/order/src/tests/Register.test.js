import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/Register';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('Register Component', () => {
  test('renders the form title', () => {
    renderWithRouter(<Register />);

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  test('renders the Full Name label', () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  test('renders the Email label', () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  test('renders the Phone label', () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  test('renders the Password label', () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('renders the accept terms checkbox label', () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/I accept the Terms and Conditions/i)).toBeInTheDocument();
  });

  test('renders the submit button text', () => {
    renderWithRouter(<Register />);

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  test('renders the login link text', () => {
    renderWithRouter(<Register />);

    expect(screen.getByText(/Login here/i)).toBeInTheDocument();
  });
});
