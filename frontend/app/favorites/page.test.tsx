import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FavoritesPage from './page';
import useAuthStore from '@/app/stores/auth-store';
import { gETFavorites } from '@/api/gourmetAPI';

// --- Mocks ---
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

jest.mock('@/app/lib/auth', () => ({
  checkIfUserIsLoggedIn: jest.fn().mockImplementation((setAuthState) => {
    setAuthState({ isConnected: true });
  }),
}));

// --- Tests ---
describe('FavoritesPage', () => {
  test('renders login prompt when the user is not logged in', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authState: { isConnected: false },
      setAuthState: jest.fn(),
    });

    render(<FavoritesPage />);

    expect(
      screen.getByText('Connectez vous pour accéder aux favoris')
    ).toBeInTheDocument();
  });

  test('renders favorites when the user is logged in and fetch is successful', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authState: { isConnected: true },
      setAuthState: jest.fn(),
    });

    const dummyFavorites = [
      {
        recipe: {
          id: '1',
          name: 'Chocolate Cake',
          description: 'Delicious dessert',
        },
      },
    ];
    (gETFavorites as jest.Mock).mockResolvedValue({
      status: 200,
      data: dummyFavorites,
    });

    (localStorage.getItem as jest.Mock).mockReturnValue('mock-token');

    render(<FavoritesPage />);

    await waitFor(() => {
      expect(screen.getByText('Favoris')).toBeInTheDocument();
      expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    });
  });

  test('renders no favorites message when the favorites list is empty', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authState: { isConnected: true },
      setAuthState: jest.fn(),
    });

    (gETFavorites as jest.Mock).mockResolvedValue({
      status: 200,
      data: [],
    });

    (localStorage.getItem as jest.Mock).mockReturnValue('mock-token');

    render(<FavoritesPage />);

    await waitFor(() => {
      expect(screen.getByText('Favoris')).toBeInTheDocument();
      expect(screen.getByText('Pas de favori disponible')).toBeInTheDocument();
    });
  });

  test('renders only title when the favorites fetch fails', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authState: { isConnected: true },
      setAuthState: jest.fn(),
    });

    (gETFavorites as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch favorites')
    );

    (localStorage.getItem as jest.Mock).mockReturnValue('mock-token');

    render(<FavoritesPage />);

    await waitFor(() => {
      expect(screen.getByText('Favoris')).toBeInTheDocument();
    });
  });
});
