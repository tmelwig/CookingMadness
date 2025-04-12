'use client';
import React from 'react';
import { JSX, useEffect } from 'react';
import Link from 'next/link';
import { checkIfUserIsLoggedIn } from '@/app/lib/auth';
import useAuthStore from '@/app/stores/auth-store';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function NavBar(): JSX.Element {
  const { authState, disconnect, setAuthState } = useAuthStore();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await checkIfUserIsLoggedIn(setAuthState);
    };
    checkIfLoggedIn();
  }, [setAuthState]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Vous avez bien été déconnecté');
    disconnect();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-[var(--bg-tertiary)] text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg">
          Recettes
        </Link>
        {authState.isConnected && (
          <Link href="/favorites" className="text-lg">
            Favoris
          </Link>
        )}
        {authState.isConnected ? (
          <Link href="/" onClick={handleLogout} className="text-lg">
            Déconnexion
          </Link>
        ) : (
          <Link href="/login" className="text-lg">
            Connexion
          </Link>
        )}
        <button
          onClick={toggleTheme}
          className="text-2xl transition hover:scale-110 focus:outline-none"
          aria-label="Toggle theme"
          title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {resolvedTheme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
