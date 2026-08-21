import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],

  format: ["esm"], // Keep This As ESM

  target: "esnext",

  outDir: "dist",

  clean: true,

  bundle: true,

  splitting: false,

  sourcemap: true,
});
