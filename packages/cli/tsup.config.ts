import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  minify: true,
  bundle: true,
  sourcemap: false,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  // Keep workspace packages external so parallel watch startup doesn't race
  // against their own clean/build cycle.
  external: ["@guataiba/isac-core", "@guataiba/isac-nextjs"],
});
