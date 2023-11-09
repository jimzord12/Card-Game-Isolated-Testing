// import React, {
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// // Images
// import { CACHE_NAME } from "../../constants/cache";
// import {
//   imageGrpKeys,
//   imageNamesArray,
// } from "../../constants/utils/imageGrpTypeKeys";
// import { ImageContextTypes, ImageGroups } from "../../types";
// import {
//   buildImageGroups,
//   checkForImages,
//   convertToUrl,
//   getImagesFromModule,
//   storeImagesInCacheWithKeys,
// } from "./imageUtils/imageUtils";

// export const ImageContext = createContext<ImageContextTypes>({});

// interface ImageProviderProps {
//   children: ReactNode;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export function ImageContextAPI() {
//   return useContext(ImageContext);
// }

// const ImageProviderV4: React.FC<ImageProviderProps> = ({
//   children,
//   setLoading,
// }) => {
//   const [images, setImages] = useState<ImageGroups>(imageGrpKeys);
//   const [areImagesReady, setAreImagesReady] = useState(false);

//   const clearCache = useCallback(async () => {
//     const deleted = await caches.delete(CACHE_NAME);
//     if (deleted) {
//       console.log(`Cache '${CACHE_NAME}' deleted.`);
//     } else {
//       console.log(`Cache '${CACHE_NAME}' not found.`);
//     }
//   }, []);

//   useEffect(() => {
//     if (areImagesReady) return;

//     setLoading(true);

//     const loadAssets = async () => {
//       try {
//         const areImagesCached = await checkForImages(CACHE_NAME);
//         const cache = await caches.open(CACHE_NAME);

//         if (areImagesCached) {
//           const cachedResponses = await Promise.all(
//             imageNamesArray.map((imageName) => cache.match(imageName))
//           );
//           console.log(cachedResponses);
//           const formatedImages = imageGrpKeys;
//           cachedResponses.forEach(
//             async (response) => await convertToUrl(response, formatedImages)
//           );
//           console.log("✨💎 ASKASRa✨💎: ", formatedImages);
//           setImages(formatedImages);
//         } else {
//           const allImages = await getImagesFromModule();
//           console.log("🎁🔷 (1) All Images: ", allImages.length);

//           await storeImagesInCacheWithKeys(CACHE_NAME, allImages);

//           const formatedImages = await buildImageGroups(CACHE_NAME, allImages);
//           console.log("🎁🔷 (2) Formated Images: ", formatedImages);
//           setImages(formatedImages);
//         }
//       } catch (error) {
//         console.error("Error loading images:", error);
//       } finally {
//         setAreImagesReady(true);
//         // setLoading(false);
//       }
//     };

//     loadAssets();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     // eslint-disable-next-line prefer-const
//     let intervalId: NodeJS.Timeout | undefined; // Declare variable for interval ID outside the async block

//     const checkCache = async () => {
//       const cache = await caches.open(CACHE_NAME);
//       const cachedEntries = await cache.keys();
//       if (cachedEntries.length >= 130) {
//         setLoading(false);
//         clearInterval(intervalId); // Clear the interval to stop checking
//       }
//     };
//     checkCache();
//     intervalId = setInterval(checkCache, 1000);

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId); // Cleanup function to clear the interval
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array means this effect runs once on mount

//   return (
//     <ImageContext.Provider value={{ images, clearCache, areImagesReady }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };

// export default ImageProviderV4;
