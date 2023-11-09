import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Set to 0 to disable inlining of assets
    manifest: true, // Enable the manifest file generation
    // rollupOptions: {
    //   input: {
    //     main: "./src/main.tsx",
    //     sw: "./sw.ts", // The service worker entry
    //   },
    // },
  },
});
