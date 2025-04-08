import React, { JSX } from "react";
import RecipesGrid from "@/app/components/RecipesGrid/RecipesGrid";
import Text from "@/app/components/Text";
import Image from "next/image";

export default function Home(): JSX.Element {
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
        <Text variant="description">Voici les recettes disponibles !</Text>
        <RecipesGrid />
      </div>
    </div>
  );
}
