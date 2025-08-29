import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite';
import manifest from './public/manifest.json';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest,
      workbox: {
        runtimeCaching: [
          {
            // frontend assets
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "CacheFirst"
          },
          {
            // API caching
            urlPattern: /^http:\/\/localhost:5000\/api\/product/,
            handler: "NetworkFirst", // pehle network, fallback cache
            options: {
              cacheName: "products-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 din
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/Dukaan-Digital/',
});