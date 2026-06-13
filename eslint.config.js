// @ts-check
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = [
    {
        ignores: ["node_modules/**", "build/**", "dist/**"],
    },
    // TypeScript: parser + recommended rules
    ...(/** @type {import('eslint').Linter.Config[]} */ (tsPlugin.configs["flat/recommended"])),
    // JSX support for tsx files
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
    },
    // React Hooks rules
    reactHooks.configs.flat["recommended-latest"],
];
