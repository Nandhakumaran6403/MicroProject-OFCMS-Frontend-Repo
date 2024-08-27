import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/Login';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginForm correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Register here/i)).toBeInTheDocument();
  });

  test('shows email validation error when email is invalid', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/Invalid email format./i)).toBeInTheDocument();
  });

  test('shows password validation error when password is too short', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/Password must be at least 6 characters./i)).toBeInTheDocument();
  });

  test('handles form submission with valid inputs', async () => {
    axios.post.mockResolvedValueOnce({ data: { role: 'user' } });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const submitButton = screen.getByText(/Sign in/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  test('shows error message on failed login', async () => {
    axios.post.mockRejectedValueOnce(new Error('Login failed'));

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const submitButton = screen.getByText(/Sign in/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login failed: Invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('shows error message for invalid credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: null });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const submitButton = screen.getByText(/Sign in/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Incorrect email ID or password/i)).toBeInTheDocument();
    });
  });

  test('disables submit button while loading', () => {
    render(<LoginForm />);

    const submitButton = screen.getByText(/Sign in/i);
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/Logging in.../i);
  });
});
