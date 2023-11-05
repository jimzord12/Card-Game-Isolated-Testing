// const CACHE_NAME = "my-game-cache-v1";
// const urlsToCache = [
//   "path/to/image1.png",
//   "path/to/image2.jpg",
//   // ...other image URLs
// ];

// self.addEventListener("install", (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }

//       return fetch(event.request).then((response) => {
//         // Check if we received a valid response
//         if (!response || response.status !== 200 || response.type !== "basic") {
//           return response;
//         }

//         // IMPORTANT: Clone the response. A response is a stream
//         // and because we want the browser to consume the response
//         // as well as the cache consuming the response, we need
//         // to clone it so we have two streams.
//         const responseToCache = response.clone();

//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });
