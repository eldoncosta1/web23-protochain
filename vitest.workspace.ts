import { defineWorkspace } from "vitest/config";

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  "packages/*",
  {
    // add "extends" to merge two configs together
    extends: "./vitest.config.ts",
    test: {
      include: ["**/*.spec.ts"],
      // it is recommended to define a name when using inline configs
      name: "unit-tests",
      environment: "node",
    },
  },
  {
    extends: "./vitest.config.ts",
    test: {
      include: ["**/*.test.ts"],
      name: "integration-tests",
      environment: "node",
    },
  },
]);
