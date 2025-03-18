"use client";
import { JSX } from "react";
import Link from "next/link";

export default function NavBar(): JSX.Element {
  return (
    <nav className="bg-orange-600 text-white p-4">
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
      </div>
    </nav>
  );
}
