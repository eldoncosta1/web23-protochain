import swc from "unplugin-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: ".",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      // include: ["src/**/*.{test,spec}.ts"],
    },
    deps: {
      moduleDirectories: ["node_modules", "src"],
    },
  },
  plugins: [
    tsConfigPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
