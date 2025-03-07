"use client";
import React, { JSX } from "react";
import Text from "./components/Text";
import { useListRecipes, Recipe } from "./hooks/RecipesHooks";

export default function Home(): JSX.Element {
  const { recipes, loading, error } = useListRecipes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Text variant="title-h1">Recipes</Text>
      <Text variant="description">Here are some recipes for you to try!</Text>
      <div className="flex flex-wrap justify-start gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex flex-col items-center max-w-xs border rounded-lg p-4">
            <Text variant="title-h3">{recipe.name}</Text>
            <Text variant="description" italic>{recipe.description}</Text>
            {recipe.image_url && recipe.image_url !== "" ? (
              <img src={recipe.image_url} alt={recipe.name} width={200} />
            ) : (
              <Text variant="body">No image available...</Text>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
