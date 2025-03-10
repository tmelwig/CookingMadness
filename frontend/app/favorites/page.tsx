// "use client";
import React, {JSX} from "react";
import Text from "@/app/components/Text";
import NavBar from "@/app/components/NavBar";

export default function FavoritesPage(): JSX.Element {
    return (
      <div>
        <NavBar/>
        <Text variant="title-h1">Favoris</Text>
      </div>
    );
  };
