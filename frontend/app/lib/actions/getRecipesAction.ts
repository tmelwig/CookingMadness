import { gETRecipes } from '@/api/gourmetAPI';

export async function getRecipesAction() {
  try {
    const recipes = await gETRecipes();
    if (recipes.status === 200) {
      return recipes.data;
    }
    throw new Error();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}
