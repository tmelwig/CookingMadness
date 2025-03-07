"use client";
import React, {JSX} from "react";
import Text from "../../components/Text";
import { notFound } from 'next/navigation';
import NavBar from "../../components/NavBar";

type Props = {
  params: { recetteID: string };
};

export default function RecipePage({ params }: Props): JSX.Element {
  const { recetteID } = params;

  if (!recetteID) return notFound();
  return (
    <div>
        <NavBar/>
        <Text variant="title-h1">Recette {recetteID}</Text>
    </div>
  );
};
