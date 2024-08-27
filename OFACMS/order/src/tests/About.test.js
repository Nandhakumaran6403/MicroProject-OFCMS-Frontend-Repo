import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import About from '../components/About';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('About Component', () => {
  test('renders the main heading', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Shop What You Want/i)).toBeInTheDocument();
  });

  test('renders the introductory paragraph', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/I always say shopping is cheaper than a psychiatrist. To shop or not to shop, that's not even a question. Buy less, choose well./i)).toBeInTheDocument();
  });

  test('renders the link text for "Open roles"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Open For Feedback/i)).toBeInTheDocument();
  });

  test('renders the link text for "Ecommerce program"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Ecommerce program/i)).toBeInTheDocument();
  });

  test('renders the link text for "Our values"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Our values/i)).toBeInTheDocument();
  });

  test('renders the link text for "Meet our Customer Relationships"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Meet our Customer Relationships/i)).toBeInTheDocument();
  });

  test('renders the statistic "Worldwide Countries"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Worldwide Countries/i)).toBeInTheDocument();
    expect(screen.getByText(/12/i)).toBeInTheDocument();
  });

  test('renders the statistic " Customers"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/300K+/i)).toBeInTheDocument();
  });

  test('renders the statistic "Sale per week"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Sale per week/i)).toBeInTheDocument();
    expect(screen.getByText(/4k/i)).toBeInTheDocument();
  });

  test('renders the statistic "Paid time off"', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/Payment Safety/i)).toBeInTheDocument();
    expect(screen.getByText(/Strong/i)).toBeInTheDocument();
  });
});
