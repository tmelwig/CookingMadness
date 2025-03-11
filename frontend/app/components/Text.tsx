import React from "react";

type TextVariant =
  | "title-h1"
  | "title-h2"
  | "title-h3"
  | "description"
  | "body";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  italic?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  italic = false,
}) => {
  let className = "text-lg";

  if (variant === "title-h1") {
    className = "text-3xl font-bold title-h1";
  } else if (variant === "title-h2") {
    className = "text-2xl font-bold title-h2";
  } else if (variant === "title-h3") {
    className = "text-xl font-bold title-h3";
  } else if (variant === "description") {
    className = "text-xl";
    if (italic) {
      className += " italic";
    }
  } else {
    className = "text-base";
  }

  return <p className={className}>{children}</p>;
};

export default Text;
