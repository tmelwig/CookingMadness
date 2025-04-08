"use client";
import React, { useState } from "react";
import {
  pOSTUsersUsernameFavorites,
  dELETEUsersUsernameFavorites,
} from "@/api/gourmetAPI";
import useAuthStore from "@/app/stores/auth-store";

type LikeToggleProps = {
  recetteID: string;
};

export const LikeToggle = ({ recetteID }: LikeToggleProps) => {
  const { authState } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = () => {
    setIsLiked((prev) => !prev);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (isLiked) {
      dELETEUsersUsernameFavorites(
        authState.username || "",
        { recipeID: recetteID },
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Removed from favorites:", res);
        })
        .catch((err) => {
          console.error("Error removing from favorites:", err);
        });
    } else {
      pOSTUsersUsernameFavorites(
        authState.username || "",
        { recipeID: recetteID },
        {
          headers,
        }
      )
        .then((res) => {
          console.log("Added to favorites:", res);
        })
        .catch((err) => {
          console.error("Error adding to favorites:", err);
        });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <input
        type="checkbox"
        className="hidden"
        checked={isLiked}
        readOnly
      ></input>
      <span>{isLiked ? "❤️" : "🤍"}</span>
    </div>
  );
};
