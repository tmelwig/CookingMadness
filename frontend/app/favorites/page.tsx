'use client';
import React, { JSX, useEffect } from 'react';
import Text from '@/app/components/Text';
import useAuthStore from '@/app/stores/auth-store';
import { checkIfUserIsLoggedIn } from '@/app/lib/auth';
import { gETFavorites, Recipe } from '@/api/gourmetAPI';
import { CardGrid } from '@/app/components/CardGrid/CardGrid';

export default function FavoritesPage(): JSX.Element {
  const { authState, setAuthState } = useAuthStore();

  useEffect(() => {
    checkIfUserIsLoggedIn(setAuthState);
  }, [setAuthState]);

  return (
    <div className="container mx-auto">
      {authState.isConnected ? (
        <FavoritesList />
      ) : (
        <Text variant="body">Connectez vous pour accéder aux favoris</Text>
      )}
    </div>
  );
}

function FavoritesList(): JSX.Element {
  const [favorites, setFavorites] = React.useState<Recipe[]>([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const fetchedFavorites = await gETFavorites({
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (fetchedFavorites.status !== 200) {
          console.error('Failed to fetch favorites:', fetchedFavorites);
          return;
        }
        setFavorites(
          fetchedFavorites.data
            .map((recipe) => recipe.recipe)
            .filter((recipe) => recipe !== undefined)
        );
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
    fetchFavorites();
  }, [setFavorites, token]);

  return (
    <div>
      <Text variant="title-h1">Favoris</Text>
      <CardGrid gridItems={favorites} />
    </div>
  );
}
