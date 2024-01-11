/// <reference lib="WebWorker" />

import { originalImageUrls } from "./src/constants/cache";

const baseURL = self.location.origin; // This gives you the root of your domain

self.addEventListener("install", (event: ExtendableEvent) => {
  const CACHE_NAME = "TEST-genera-game-cache";

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urlsToCache = originalImageUrls.map((url) => baseURL + "/" + url);
      console.log("✅ Opened cache");
      console.log("TEST - BaseURL: ", baseURL);

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const CACHE_NAME = "TEST-genera-game-cache";

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
