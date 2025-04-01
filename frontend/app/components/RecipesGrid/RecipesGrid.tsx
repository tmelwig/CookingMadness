"use client";
import React from "react";
import { useListRecipes } from "@/app/hooks/RecipesHooks";
import { useRecipe } from "@/app/contexts/RecipeContext";
import { Recipe } from "@/api/gourmetAPI";
import RecipeCell from "./RecipeCell";

const RecipesGrid: React.FC = () => {
  const { recipes, loading, error } = useListRecipes();
  const { setSelectedRecipe } = useRecipe();

  function handleRecipeClick(recipe: Recipe) {
    setSelectedRecipe(recipe);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2 md:my-6">
      {recipes.map((recipe) => (
        <RecipeCell
          key={recipe.id}
          recipe={recipe}
          onClick={handleRecipeClick}
        />
      ))}
    </div>
  );
};

export default RecipesGrid;
