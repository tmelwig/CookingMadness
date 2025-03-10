"use client";
import React, {JSX, use} from "react";
import Text from "@/app/components/Text";
import { notFound } from 'next/navigation';
import NavBar from "@/app/components/NavBar";

type Props = {
  params: Promise<{ recetteID: string }>;
};

export default function RecipePage({ params }: Props): JSX.Element {
  const { recetteID } = use(params);

  if (!recetteID) return notFound();
  return (
    <div>
        <NavBar/>
        <Text variant="title-h1">Recette {recetteID}</Text>
    </div>
  );
};
