"use client";
import React, { JSX, use } from "react";
import Text from "@/app/components/Text";
import { notFound, useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { useRecipe } from "@/app/contexts/RecipeContext";
import Recipe from "@/app/types/recipe";
import Image from "next/image";

type Props = {
  params: Promise<{ recetteID: string }>;
};

export default function RecipePage({ params }: Props): JSX.Element {
  const { recetteID } = use(params);
  const { selectedRecipe } = useRecipe();
  const router = useRouter();

  if (!selectedRecipe || selectedRecipe.id !== recetteID) return notFound();
  const {
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
  } = selectedRecipe as Recipe;

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          {image_url ? (
            <Image
              loader={() => image_url}
              src={image_url}
              alt={name}
              className="w-full h-auto max-w-xl rounded-lg shadow-lg mb-4"
              width={400}
              height={400}
              sizes="(max-width: 400px) 100vw, 400px"
            />
          ) : (
            <Text variant="body">Pas d&apos;image disponible...</Text>
          )}
          <Text variant="title-h1">{name}</Text>

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

        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Retourner sur la page d&apos;accueil
        </button>
      </div>
    </div>
  );
}
