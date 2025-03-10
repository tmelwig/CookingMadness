// "use client";
import React, {JSX} from "react";
import Text from "@/app/components/Text";
import NavBar from "@/app/components/NavBar";

export default function RecipesPage(): JSX.Element {
    return (
      <div>
        <NavBar/>
        <Text variant="title-h1">Recettes</Text>
      </div>
    );
  };
