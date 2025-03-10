"use client";
import React, { JSX, useMemo } from "react";
import Text from "@/app/components/Text";
import { useListRecipes } from "@/app/hooks/RecipesHooks";
import NavBar from "@/app/components/NavBar";
import { useRouter } from 'next/navigation';
import { useRecipe } from '@/app/contexts/RecipeContext';
import Recipe from "@/app/types/recipe";

export default function Home(): JSX.Element {
  const { recipes, loading, error } = useListRecipes();
  const router = useRouter();
  const { setSelectedRecipe } = useRecipe();

  const handleRecipeButtonClick = useMemo(() => {
    return (recipe: Recipe) => {
      setSelectedRecipe(recipe);
      router.push(`/recettes/${recipe.id}`);
    };
  }, [setSelectedRecipe, router]);

  const handleClick = (recipe: Recipe) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleRecipeButtonClick(recipe);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavBar />
      <Text variant="title-h1">Recettes</Text>
      <Text variant="description">Voici une liste de super recettes à essayer rapidement !</Text>
      <div className="flex flex-wrap justify-start gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex flex-col items-center max-w-xs border rounded-lg p-4">
            <Text variant="title-h3">{recipe.name}</Text>
            <Text variant="description" italic>{recipe.description}</Text>
            {recipe.image_url && recipe.image_url !== "" ? (
              <img src={recipe.image_url} alt={recipe.name} width={200} height={200}/>
            ) : (
              <Text variant="body">Pas d'image disponible...</Text>
            )}
            <button 
              onClick={handleClick(recipe)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Voir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
