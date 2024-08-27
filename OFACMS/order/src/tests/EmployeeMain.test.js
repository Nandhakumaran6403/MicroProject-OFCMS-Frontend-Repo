import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { jest } from '@jest/globals';
import EmployeeMain from '../components/Employee/EmployeeMain';

jest.mock('react-chartjs-2', () => ({
    Line: () => <div>Line Chart</div>,
    Bar: () => <div>Bar Chart</div>,
    Pie: () => <div>Pie Chart</div>,
}));

jest.mock('react-icons/fa', () => ({
    FaBoxOpen: () => <div>Box Icon</div>,
    FaTruck: () => <div>Truck Icon</div>,
    FaShoppingCart: () => <div>Cart Icon</div>,
    FaReceipt: () => <div>Receipt Icon</div>,
}));

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('EmployeeMain Component', () => {
    test('renders charts correctly', () => {
        renderWithRouter(<EmployeeMain />);

        expect(screen.getByText(/Line Chart/i)).toBeInTheDocument();
        expect(screen.getByText(/Bar Chart/i)).toBeInTheDocument();
        expect(screen.getByText(/Pie Chart/i)).toBeInTheDocument();
    });

    test('renders navigation cards with icons and links', () => {
        renderWithRouter(<EmployeeMain />);

        expect(screen.getByText(/Box Icon/i)).toBeInTheDocument();
        expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
        expect(screen.getByText(/View Inventory/i)).toBeInTheDocument();

        expect(screen.getByText(/Truck Icon/i)).toBeInTheDocument();
        expect(screen.getByText(/Shipment Management/i)).toBeInTheDocument();
        expect(screen.getByText(/View Shipments/i)).toBeInTheDocument();

        expect(screen.getByText(/Cart Icon/i)).toBeInTheDocument();
        expect(screen.getByText(/Orders Management/i)).toBeInTheDocument();
        expect(screen.getByText(/View Orders/i)).toBeInTheDocument();
    });

    test('renders footer correctly', () => {
        renderWithRouter(<EmployeeMain />);

        expect(screen.getByText(/Nandha Mart. All rights reserved./i)).toBeInTheDocument();
    });
});
