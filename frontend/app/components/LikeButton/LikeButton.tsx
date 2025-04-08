"use client";
import React, { useEffect, useState } from "react";
import { Recipe } from "@/api/gourmetAPI";
import useAuthStore from "@/app/stores/auth-store";
import { getFavorites } from "@/app/lib/getFavorites";
import { delFavorite } from "@/app/lib/delFavorites";
import { addFavorite } from "@/app/lib/addFavorite";

type LikeToggleProps = {
  recetteID: string;
};

export const LikeToggle = ({ recetteID }: LikeToggleProps) => {
  const { authState } = useAuthStore();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function getLikedState() {
      const storedFavorites = localStorage.getItem("favorites");
      let favorites: Recipe[] = [];
      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
      } else {
        favorites = await getFavorites();
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      const isFavorite = favorites.some((recipe) => recipe.id === recetteID);
      setIsLiked(isFavorite);
      setIsDisabled(false);
    }
    getLikedState();
  }, [recetteID]);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
    const token = localStorage.getItem("token");
    if (!token || !authState?.username) {
      console.error("User is not authenticated");
      return;
    }
    if (isLiked) {
      delFavorite(recetteID, authState.username);
    } else {
      addFavorite(recetteID, authState.username);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <input
        type="checkbox"
        className="hidden"
        checked={isLiked}
        disabled={isDisabled}
        readOnly
      ></input>
      <span>{isLiked ? "❤️" : "🤍"}</span>
    </div>
  );
};
