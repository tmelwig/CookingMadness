"use client";
import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { gETMe } from "@/api/gourmetAPI";

export default function NavBar(): JSX.Element {
  const [isConnected, setIsConnected] = useState(false); // Replace with actual authentication logic

  useEffect(() => {
    const checkIsConnected = async () => {
      try {
        if (!localStorage.getItem("token")) {
          setIsConnected(false);
          return;
        }
        const res = await gETMe({ headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
      } });
        if (res.status === 200 && "username" in res.data) {
          setIsConnected(true);
        }
      } catch (error) {
        setIsConnected(false);
        console.error(error);
      }
    }
    checkIsConnected();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">
          Page d&apos;accueil
        </Link>
        <Link href="/recettes" className="text-lg">
          Recettes
        </Link>
        <Link href="/favorites" className="text-lg">
          Favoris
        </Link>
        {isConnected ? (
          <button onClick={handleLogout} className="text-lg">
            Déconnexion
          </button>
        ) : (
          <Link href="/login" className="text-lg">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
