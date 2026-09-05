import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  sortImports: true,
  sortPackageJson: true,
  sortTailwindcss: {
    stylesheet: "./src/app/globals.css",
    functions: ["cn", "cva"],
  },
  ignorePatterns: [
    ".git/**",
    ".next/**",
    "next-env.d.ts",
    "node_modules/**",
    "storybook-static/**",
    "playwright-report/**",
    "test-results/**",
    "pnpm-lock.yaml",
  ],
});
