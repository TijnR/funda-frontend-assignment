import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "deny",
    suspicious: "deny",
  },
  plugins: ["oxc", "typescript", "react", "nextjs", "jsx-a11y", "import", "vitest"],
  jsPlugins: ["eslint-plugin-better-tailwindcss", "oxlint-tailwindcss"],
  options: {
    typeAware: true,
    typeCheck: false,
    maxWarnings: 0,
  },
  rules: {
    "import/no-unassigned-import": "off",
    "react/react-in-jsx-scope": "off",
    "better-tailwindcss/enforce-canonical-classes": "deny",
    "better-tailwindcss/no-concatenated-classes": "deny",
    "better-tailwindcss/no-conflicting-classes": "deny",
    "better-tailwindcss/no-deprecated-classes": "deny",
    "better-tailwindcss/no-duplicate-classes": "deny",
    "better-tailwindcss/no-unknown-classes": "deny",
    "tailwindcss/prefer-scale-token": "deny",
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "./src/app/globals.css",
    },
    tailwindcss: {
      entryPoint: "./src/app/globals.css",
    },
  },
  // todo maybe remove testresults
  ignorePatterns: [".next/**", "storybook-static/**", "test-results/**"],
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      env: {
        browser: true,
        node: true,
      },
    },
  ],
});
