"use client";
import React, { JSX } from "react";
import RecipesGrid from "@/app/components/RecipesGrid/RecipesGrid";
import NavBar from "@/app/components/NavBar";
import Text from "@/app/components/Text";

export default function Home(): JSX.Element {
  return (
    <div>
      <NavBar />
      <div className="p-5 bg-gray-100">
        <Text variant="title-h1">Recettes</Text>
        <Text variant="description">Voici une liste de super recettes à essayer rapidement !</Text>
        <RecipesGrid />
      </div>
    </div>
  );
}
