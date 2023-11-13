self.addEventListener("install", (event) => {
  const CACHE_NAME = "genera-game-assets-cache-v1";

  event.waitUntil(
    fetch("/manifest.json")
      .then((response) => response.json())
      .then((manifest) => {
        const urlsToCache =
          manifest["src/assets/imgs_new_convention/index.ts"].assets;
        caches.open(CACHE_NAME).then((cache) => {
          console.log("Opened cache");
          return cache.addAll(urlsToCache);
        });
      })
  );
});

self.addEventListener("fetch", (event) => {
  const CACHE_NAME = "genera-game-assets-cache-v1";

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
