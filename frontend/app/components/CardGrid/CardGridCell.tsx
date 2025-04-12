import React from 'react';
import Link from 'next/link';
import Text from '@/app/components/Text';
import Image from 'next/image';

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
  const { id, image_url, name } = cardGridElement;

  return (
    <div className="relative w-70 h-60 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/recettes/${id}`}>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <Image
            alt={`${name} image`}
            src={
              image_url ||
              'https://fermesaintandre.com/wp-content/uploads/images_wavesoft/GPL_photo_1.jpg_mfit_c80_w621_h621.webp.webp'
            }
            quality={100}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/5 bg-[var(--fg-primary)] opacity-70">
            <Text
              variant="title-h3"
              className="absolute bottom-2 left-2 text-[var(--text-primary)] px-2 py-1 rounded"
            >
              {name}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
};
