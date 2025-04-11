import React from 'react';
import clsx from 'clsx';

type TextVariant =
  | 'title-h1'
  | 'title-h2'
  | 'title-h3'
  | 'description'
  | 'body'
  | 'detail';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  italic?: boolean;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  italic = false,
  className,
}) => {
  const combinedClassName = clsx(
    {
      'text-3xl font-bold title-h1': variant === 'title-h1',
      'text-2xl font-bold title-h2': variant === 'title-h2',
      'text-xl font-bold title-h3': variant === 'title-h3',
      'text-xl italic': variant === 'description' && italic,
      'text-xl': variant === 'description' && !italic,
      'text-base': variant === 'body',
      'text-sm font-medium': variant === 'detail',
    },
    className
  );

  return <p className={combinedClassName}>{children}</p>;
};

export default Text;
