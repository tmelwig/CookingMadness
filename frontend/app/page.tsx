import React from "react";
import Text from "@/app/components/Text";
import Image from "next/image";
import { getRecipesAction } from "./lib/actions/getRecipesAction";
import { Recipe } from "@/api/gourmetAPI";
import { CardGrid } from "./components/CardGrid/CardGrid";

export default async function HomePage() {
  let error = null;
  let recipes: Recipe[] = [];

  try {
    recipes = await getRecipesAction();
  } catch {
    error = "Erreur lors de la récupération des recettes";
  }

  return (
    <div className="relative w-full bg-orange-100">
      <div className="w-[75%] mx-auto bg-orange-300">
        <Image
          src="/assets/images/cuisine_bis.webp"
          alt="Cuisine Border"
          width={1047}
          height={400}
          priority
          className="opacity-75 filter hue-rotate-340"
          sizes="(max-width: 1047px) 100vw, 1047px"
        />
      </div>
      <div className="p-5 bg-gray-100">
        <Text variant="title-h1">Home</Text>
        {error || recipes.length === 0 ? (
          <Text variant="description">
            {error || "Pas de recettes disponibles"}
          </Text>
        ) : (
          <>
            <Text variant="description">Voici les recettes disponibles !</Text>
            <CardGrid gridItems={recipes} />
          </>
        )}
      </div>
    </div>
  );
}
