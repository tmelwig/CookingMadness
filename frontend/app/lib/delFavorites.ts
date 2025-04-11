import { dELETEUsersUsernameFavorites } from '@/api/gourmetAPI';
import { authHeaders } from './auth';

const delFavorite = async (recipeID: string, username: string) => {
  const token = localStorage.getItem('token');
  if (!token || !username) {
    throw new Error('User is not authenticated');
  }

  await dELETEUsersUsernameFavorites(
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
  const updatedFavorites = favorites.filter((id) => id !== recipeID);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export { delFavorite };
