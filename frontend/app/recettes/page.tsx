// "use client";
import React, {JSX} from "react";
import Text from "../components/Text";
import NavBar from "../components/NavBar";

export default function RecipesPage(): JSX.Element {
    return (
      <div>
        <NavBar/>
        <Text variant="title-h1">Recettes</Text>
      </div>
    );
  };
