"use client";
import React, { JSX, useEffect } from "react";
import Text from "@/app/components/Text";
import useAuthStore from "../stores/auth-store";
import { checkIfUserIsLoggedIn } from "@/api/auth";

export default function FavoritesPage(): JSX.Element {
  const { isConnected, setIsConnected } = useAuthStore();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const loggedIn = await checkIfUserIsLoggedIn();
      setIsConnected(loggedIn);
    };
    checkIfLoggedIn();
  }, [setIsConnected]);

  return (
    <div className="container mx-auto">
      <Text variant="title-h1">Favoris</Text>
      {isConnected ? (
        <Text variant="body">Vous êtes connecté</Text>
      ) : (
        <Text variant="body">Connectez vous pour accéder aux favoris</Text>
      )}
    </div>
  );
}
