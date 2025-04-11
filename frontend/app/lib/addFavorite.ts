import { pOSTUsersUsernameFavorites } from '@/api/gourmetAPI';
import { authHeaders } from './auth';

const addFavorite = async (recipeID: string, username: string) => {
  const token = localStorage.getItem('token');
  if (!token || !username) {
    throw new Error('User is not authenticated');
  }

  await pOSTUsersUsernameFavorites(
    username,
    { recipeID: recipeID },
    {
      headers: authHeaders(token),
    }
  );
  const storedFavorites = localStorage.getItem('favorites');
  let favorites: string[] = [];
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
  if (!favorites.includes(recipeID)) {
    favorites.push(recipeID);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export { addFavorite };
