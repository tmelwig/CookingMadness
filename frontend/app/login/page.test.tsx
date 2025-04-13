import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './page';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/app/stores/auth-store';
import { pOSTLogin } from '@/api/gourmetAPI';

// --- Mocks ---
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/app/stores/auth-store');
jest.mock('@/api/gourmetAPI');

let originalConsoleError: typeof console.error;

beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writable: true,
  });

  originalConsoleError = console.error;
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error = originalConsoleError;
});

// --- Tests ---
describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockConnect = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      connect: mockConnect,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Se connecter')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Nom d'utilisateur")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /connexion/i })
    ).toBeInTheDocument();
  });

  test('submits form and handles successful login', async () => {
    (pOSTLogin as jest.Mock).mockResolvedValue({
      data: { token: 'mock-token' },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(pOSTLogin).toHaveBeenCalledWith(
        { username: 'testuser', password: 'password' },
        undefined,
        { credentials: 'include' }
      );
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(mockConnect).toHaveBeenCalledWith('mock-token');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  test('does not connect or redirect if login response lacks token', async () => {
    (pOSTLogin as jest.Mock).mockResolvedValue({ data: {} });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), {
      target: { value: 'invaliduser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(mockConnect).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('handles network or API error during login', async () => {
    (pOSTLogin as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(mockConnect).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
