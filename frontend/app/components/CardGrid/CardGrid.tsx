import React from 'react';
import { CardGridCell, GridItem } from './CardGridCell';

export interface GridProps {
  gridItems: GridItem[];
}

export const CardGrid: React.FC<GridProps> = ({
  gridItems: cardGridCells,
}: GridProps) => {
  return (
    <div className="m-auto grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-2 md:my-6">
      {cardGridCells.map((gridItem) => (
        <CardGridCell key={gridItem.id} gridItem={gridItem} />
      ))}
    </div>
  );
};
