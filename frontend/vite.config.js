import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 3000 must match the CORS origin configured in the backend
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, strictPort: true },
});
