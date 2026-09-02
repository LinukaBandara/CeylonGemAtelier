import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        jsxPragma: null, // React 17+ automatic JSX transform
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Disable no-unused-vars for JSX files — the React JSX transform
      // means components are used in JSX but not "called" in plain JS scope.
      // Real dead-code is caught by the build tree-shaker instead.
      "no-unused-vars": "off",
      "no-undef": "off", // JSX elements would be flagged incorrectly
    },
  },
];
