"use client";
import { useState, useEffect } from "react";
import Recipe from "@/app/types/recipe";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useListRecipes(): {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
} {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async (): Promise<void> => {
      try {
        const response: Response = await fetch(`${API_URL}/recipes`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}
