import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      server: {
        https: true,
      },
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      plugins: [react(), mkcert()],
    };
  } else if (mode === "production") {
    return {
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      plugins: [react()],
    };
  }
});
