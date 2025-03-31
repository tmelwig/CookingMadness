"use client";
import { JSX, useEffect } from "react";
import Link from "next/link";
import { checkIfUserIsLoggedIn } from "@/api/auth";
import useAuthStore from "../stores/auth-store";

export default function NavBar(): JSX.Element {
  const { isConnected, setIsConnected } = useAuthStore();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const loggedIn = await checkIfUserIsLoggedIn();
      setIsConnected(loggedIn);
    };
    checkIfLoggedIn();
  }, [setIsConnected]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">
          Page d&apos;accueil
        </Link>
        <Link href="/recettes" className="text-lg">
          Recettes
        </Link>
        {isConnected && <Link href="/favorites" className="text-lg">
          Favoris
        </Link>}
        {isConnected ? (
          <Link  href="/" onClick={handleLogout} className="text-lg">
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
