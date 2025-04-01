"use client";
import React, { JSX, use, useEffect } from "react";
import Text from "@/app/components/Text";
import { notFound, useRouter } from "next/navigation";
import { useRecipe } from "@/app/contexts/RecipeContext";
import { pOSTUsersUsernameFavorites, Recipe } from "@/api/gourmetAPI";
import Image from "next/image";
import useAuthStore from "@/app/stores/auth-store";
import { checkIfUserIsLoggedIn } from "@/api/auth";

type Props = {
  params: Promise<{ recetteID: string }>;
};

export default function RecipePage({ params }: Props): JSX.Element {
  const { authState, setAuthState } = useAuthStore();
  const { recetteID } = use(params);
  const { selectedRecipe } = useRecipe();
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await checkIfUserIsLoggedIn(setAuthState);
    };
    checkIfLoggedIn();
  }, [setAuthState]);

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
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        {image_url ? (
          <Image
            loader={() => image_url}
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
        {authState.isConnected && (
          <button
            onClick={async () => {
              try {
                await pOSTUsersUsernameFavorites(
                  authState.username || "",
                  {
                    recipeID: recetteID,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log("Recipe added to favorites successfully!");
              } catch (error) {
                console.error("Failed to add recipe to favorites:", error);
              }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Ajouter aux Favoris
          </button>
        )}
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
  );
}
