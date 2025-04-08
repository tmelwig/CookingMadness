import React from "react";
import Link from "next/link";
import Text from "@/app/components/Text";
import Image from "next/image";

export interface GridItem {
  id?: string;
  name?: string;
  image_url?: string;
  description?: string;
}

export interface CardGridCellProps {
  gridItem: GridItem;
}

export const CardGridCell: React.FC<CardGridCellProps> = ({
  gridItem: cardGridElement,
}: CardGridCellProps) => {
  const { id, image_url, name, description } = cardGridElement;

  return (
    <Link
      href={`/recettes/${id}`}
      className="flex flex-col items-center max-w-xs border border-gray-300 rounded-lg dark:border-zinc-700 p-4 cursor-pointer hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-md transition"
      data-recipe-id={id}
    >
      <Text variant="title-h3">{name}</Text>
      <Text variant="description" italic>
        {description}
      </Text>
      {image_url ? (
        <Image
          src={image_url}
          alt={name || "Recipe"}
          className="w-full h-48 object-cover mb-2 md:mb-5 rounded-lg shadow-md aspect-square"
          width={200}
          height={200}
          sizes="(max-width: 200px) 100vw, 200px"
        />
      ) : (
        <Text variant="body">Pas d&apos;image disponible...</Text>
      )}
    </Link>
  );
};
