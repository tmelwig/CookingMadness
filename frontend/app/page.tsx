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
    <div className="relative w-full bg-custom-light-orange">
      <div className="relative max-w-[1047px] w-[75%] mx-auto bg-custom-dark-orange flex items-center justify-center">
        <Image
          src="/assets/images/cuisine_bis.webp"
          alt="Cuisine Border"
          width={1047}
          height={400}
          priority
          className="opacity-55 filter hue-rotate-340"
          sizes="(max-width: 1047px) 100vw, 1047px"
        />
        <Text
          className="absolute xl:text-8xl lg:text-6xl md:text-5xl sm:text-4xl text-white"
          variant="title-h1"
        >
          Cooking Madness
        </Text>
      </div>
      <div className="p-5 bg-neutral-100">
        <Text variant="title-h1">Recettes</Text>
        {error || recipes.length === 0 ? (
          <Text variant="description">
            {error || "Pas de recettes disponibles"}
          </Text>
        ) : (
          <>
            <Text variant="description">
              Les meilleures recettes des utilisateurs
            </Text>
            <CardGrid gridItems={recipes} />
          </>
        )}
      </div>
    </div>
  );
}
