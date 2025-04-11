import { gETFavorites, Recipe } from '@/api/gourmetAPI';
import { authHeaders } from './auth';

const getFavorites = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await gETFavorites({
      headers: authHeaders(token),
    });
    const isValidResponse = response.status === 200;
    if (isValidResponse) {
      return response.data.map((e) => e.recipe) as Recipe[];
    }
    throw new Error('Failed to fetch favorites');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch favorites');
  }
};

export { getFavorites };
