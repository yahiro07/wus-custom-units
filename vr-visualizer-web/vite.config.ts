import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    https: false,
    port: 3000,
  },
  build: {
    target: "es2022",
  },
});
