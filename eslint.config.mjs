import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // No stray console.logs in production code.
      "no-console": "error",
      // RTL safety net: keep physical left/right utilities out of the codebase.
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/(^|\\s)-?(ml|mr|pl|pr|left|right|text-left|text-right|rounded-l|rounded-r|border-l|border-r)-/]",
          message: "Use logical utilities (ms-/me-/ps-/pe-/start-/end-/text-start/text-end) for RTL support.",
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**", "next-env.d.ts"]),
]);
