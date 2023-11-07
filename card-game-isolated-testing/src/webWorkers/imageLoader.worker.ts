// imageLoader.worker.ts

/// <reference lib="webworker" />

addEventListener("message", async (event) => {
  const { imageUrls, cacheName } = event.data;

  const cache = await caches.open(cacheName);
  let loadedImages = 0;

  for (const url of imageUrls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        loadedImages++;
        // Post back the loading progress
        postMessage({
          type: "PROGRESS",
          progress: (loadedImages / imageUrls.length) * 100,
        });
      }
    } catch (error) {
      // Handle any errors here, and post a message back to the main thread if needed
      console.error(`Error caching image ${url}:`, error);
    }
  }

  // Notify the main thread that all images are loaded
  postMessage({ type: "COMPLETE" });
});
