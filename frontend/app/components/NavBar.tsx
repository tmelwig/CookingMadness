'use client';
import React from 'react';
import { JSX, useEffect } from 'react';
import Link from 'next/link';
import { checkIfUserIsLoggedIn } from '@/app/lib/auth';
import useAuthStore from '@/app/stores/auth-store';

export default function NavBar(): JSX.Element {
  const { authState, setAuthState } = useAuthStore();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await checkIfUserIsLoggedIn(setAuthState);
    };
    checkIfLoggedIn();
  }, [setAuthState]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({ isConnected: false, username: null });
  };

  return (
    <nav className="bg-custom-dark-orange text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">
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
      </div>
    </nav>
  );
}
