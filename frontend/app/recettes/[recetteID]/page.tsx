import React, { JSX } from "react";
import Text from "@/app/components/Text";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LikeToggle } from "@/app/components/LikeButton/LikeButton";
import { gETRecipesId } from "@/api/gourmetAPI";

export default async function RecipePage({
  params,
}: {
  params: { recetteID: string };
}): Promise<JSX.Element> {
  const recetteID = (await params).recetteID;
  const fetchedRecipe = await gETRecipesId(recetteID);
  if (
    fetchedRecipe.status !== 200 ||
    !fetchedRecipe.data ||
    !fetchedRecipe.data.id
  ) {
    return notFound();
  }
  const {
    id,
    name,
    description,
    image_url,
    category,
    calories,
    cook_time,
    cost,
    created_at,
    prep_time,
    servings,
    instructions,
    when_to_eat,
  } = fetchedRecipe.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        {image_url ? (
          <Image
            src={image_url}
            alt={name || "Recipe"}
            className="w-full h-auto max-w-xl rounded-lg shadow-lg mb-4"
            width={400}
            height={400}
            sizes="(max-width: 400px) 100vw, 400px"
          />
        ) : (
          <Text variant="body">Pas d&apos;image disponible...</Text>
        )}
        <Text variant="title-h1">{name}</Text>
        <LikeToggle recetteID={id} defaultState={} />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-sm font-medium text-gray-700">
            <strong>Category:</strong> {category}
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Calories:</strong> {calories} kcal
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Cook Time:</strong> {cook_time} minutes
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Cost:</strong> ${cost}
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Prep Time:</strong> {prep_time} minutes
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Servings:</strong> {servings}
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>Created By:</strong> {created_at}
          </div>
          <div className="text-sm font-medium text-gray-700">
            <strong>When to Eat:</strong> {when_to_eat}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Text variant="description">{description}</Text>
      </div>

      <div className="mb-8">
        <Text variant="body">{instructions}</Text>
      </div>

      {/* <button
        onClick={() => router.push("/")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Retourner sur la page d&apos;accueil
      </button> */}
    </div>
  );
}
