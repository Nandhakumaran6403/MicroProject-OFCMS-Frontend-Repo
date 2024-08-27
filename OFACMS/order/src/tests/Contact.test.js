import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Contact from '../components/Contact';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('Contact Component', () => {
  test('renders the main heading', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByText(/Contact sales/i)).toBeInTheDocument();
  });

  test('renders the introductory paragraph', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByText(/Buy less, choose well./i)).toBeInTheDocument();
  });

  test('renders the label for "First name"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
  });

  test('renders the label for "Last name"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
  });

  test('renders the label for "Company"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
  });

  test('renders the label for "Email"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  test('renders the label for "Phone number"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
  });

  test('renders the label for "Message"', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test('renders the label for privacy policy agreement', () => {
    renderWithRouter(<Contact />);

    // Check if the label text for privacy policy agreement is present
    expect(screen.getByText(/By selecting this, you agree to our privacy policy/i)).toBeInTheDocument();
  });

  test('renders the button text', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByText(/Let's talk/i)).toBeInTheDocument();
  });
});
