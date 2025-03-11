import React, { useCallback } from "react";
import Link from "next/link";
import Text from "@/app/components/Text";
import Recipe from "@/app/types/recipe";
import Image from "next/image";

interface RecipeCellProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCell: React.FC<RecipeCellProps> = ({ recipe, onClick }) => {
  function handleClick() {
    onClick(recipe); // Calls the parent handler before navigation
  }

  const imageLoader = useCallback(() => recipe.image_url, [recipe.image_url]);

  return (
    <Link
      href={`/recettes/${recipe.id}`}
      className="flex flex-col items-center max-w-xs border border-gray-300 rounded-lg dark:border-zinc-700 p-4 cursor-pointer hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-md transition"
      data-recipe-id={recipe.id}
      onClick={handleClick}
    >
      <Text variant="title-h3">{recipe.name}</Text>
      <Text variant="description" italic>
        {recipe.description}
      </Text>
      {recipe.image_url ? (
        <Image
          loader={imageLoader}
          src={recipe.image_url}
          alt={recipe.name}
          className="w-full h-48 object-cover mb-2 md:mb-5 rounded-lg shadow-md aspect-square"
          width={200}
          height={200}
        />
      ) : (
        <Text variant="body">Pas d&apos;image disponible...</Text>
      )}
    </Link>
  );
};

export default RecipeCell;
