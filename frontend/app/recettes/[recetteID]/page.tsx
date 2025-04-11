import React, { JSX } from 'react';
import Text from '@/app/components/Text';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { LikeToggle } from '@/app/components/LikeButton/LikeButton';
import { gETRecipesId } from '@/api/gourmetAPI';
import { formatDate } from '@/app/utils/date';

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recetteID: string }>;
}): Promise<JSX.Element> {
  const { recetteID } = await params;
  const fetchedRecipe = await gETRecipesId(recetteID);
  if (
    fetchedRecipe.status !== 200 ||
    !fetchedRecipe.data ||
    !fetchedRecipe.data.id
  ) {
    return notFound();
  }
  const {
    id,
    name,
    description,
    image_url,
    category,
    calories,
    cook_time,
    created_at,
    prep_time,
    instructions,
    when_to_eat,
  } = fetchedRecipe.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-10">
          <LikeToggle recetteID={id} />

          <Text className="my-4" variant="title-h1">
            {name}
          </Text>
        </div>

        {image_url && (
          <Image
            src={image_url}
            alt={name || 'Recipe'}
            className="w-full h-auto max-w-xl rounded-lg shadow-lg mb-4"
            width={400}
            height={400}
            sizes="(max-width: 400px) 100vw, 400px"
          />
        )}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-8 mx-auto w-[70%]">
          <div className="grid grid-cols-2 gap-4">
            {category && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>Category:</strong> {category}
                </Text>
              </div>
            )}
            {calories !== undefined && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>Calories:</strong> {calories} kcal
                </Text>
              </div>
            )}
            {cook_time !== undefined && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>Cook Time:</strong> {cook_time} minutes
                </Text>
              </div>
            )}
            {prep_time !== undefined && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>Prep Time:</strong> {prep_time} minutes
                </Text>
              </div>
            )}
            {created_at && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>Created On:</strong> {formatDate(created_at)}
                </Text>
              </div>
            )}
            {when_to_eat && (
              <div>
                <Text variant="detail" className="text-gray-700">
                  <strong>When to Eat:</strong> {when_to_eat}
                </Text>
              </div>
            )}
          </div>

          {/* Description Section */}
          {description && (
            <div>
              <Text variant="description" className="text-gray-800">
                {description}
              </Text>
            </div>
          )}

          {/* Instructions Section */}
          {instructions ? (
            <div>
              <Text variant="body" className="text-gray-700">
                {instructions}
              </Text>
            </div>
          ) : (
            // Optionally, you can hide the entire block if instructions are empty:
            <div>
              <Text variant="body" className="text-gray-700">
                Les instructions ne sont pas disponibles
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
