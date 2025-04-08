import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import reactPlugin from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import babelParser from "@babel/eslint-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a FlatCompat instance to convert shareable configs.
const compat = new FlatCompat({ baseDirectory: __dirname });

// Convert the shareable configs into flat config objects.
const convertedConfigs = compat.extends(
  "next/core-web-vitals",
  "next/typescript",
  "plugin:react/recommended"
);

export default [
  // First element: global ignore patterns
  {
    // "ignores" can be specified in an object in the exported array.
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/*.json",
      "**/*.mjs",
    ],
  },
  // Next: base config for non-TypeScript files
  {
    languageOptions: {
      parser: babelParser, // Use @babel/eslint-parser
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/display-name": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Config for TypeScript files
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  // Spread in the converted shareable Next.js and React configs.
  ...convertedConfigs,
];
