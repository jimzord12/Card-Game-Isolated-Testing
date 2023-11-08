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
// import { imageGrpKeys } from "../../constants/utils/imageGrpTypeKeys";
// import { ImageContextTypes, ImageGroups } from "../../types";

// export const ImageContext = createContext<ImageContextTypes>({});

// interface ImageObject {
//   [key: string]: string | ImageObject;
// }

// interface ImageProviderProps {
//   children: ReactNode;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   // hasLoadingScreenLoaded: boolean;
//   // setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
// }

// export function ImageContextAPI() {
//   return useContext(ImageContext);
// }

// const ImageProviderV3: React.FC<ImageProviderProps> = ({
//   children,
//   // setLoadingProgress,
//   // hasLoadingScreenLoaded,
//   setLoading,
// }) => {
//   console.log("💩 SKATA: Entering ImageContext Provider");

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
//         const cache = await caches.open(CACHE_NAME);

//         const modules = await Promise.all([
//           import("../../assets/imgs_new_convention"),
//         ]);

//         const unorganizedImageObjects: ImageObject[] = modules.flatMap(
//           (module) =>
//             Object.entries(module.default).flatMap(([, value]) =>
//               typeof value === "string" ? value : Object.values(value)
//             )
//         );

//         // console.log("💩 1 : ", unorganizedImageObjects);

//         // console.log("1 - allImages: ", unorganizedImageObjects);

//         const allImages: string[] = unorganizedImageObjects.flatMap((image) =>
//           typeof image === "string"
//             ? image
//             : Object.entries(image).flatMap(([, value]) =>
//                 typeof value === "string"
//                   ? value
//                   : Array.isArray(value)
//                   ? value
//                   : Object.values(value as ImageObject)
//               )
//         );

//         // console.log("💩 2 : ", allImages);

//         // console.log("2 - flattenImages: ", allImages.length);

//         // Remove any non-string values and duplicates.
//         // Remove any non-string values and duplicates.
//         const imageUrls = [
//           ...new Set(allImages.filter((url) => typeof url === "string")),
//         ];

//         // console.log("3 - imageUrls: ", imageUrls.length);
//         console.log("💩 3 : ", imageUrls);

//         const cachedResponses = await Promise.all(
//           imageUrls.map((url) => cache.match(url))
//         );
//         console.log("💎 cachedResponses: ", cachedResponses);
//         const areImagesCached = cachedResponses.every(
//           (response) => response && response.ok
//         );

//         if (areImagesCached) {
//           console.log("✅ Images Are Cached ", areImagesCached);

//           const validUrls = allImages.filter(
//             (_, index) => cachedResponses[index] && cachedResponses[index]!.ok
//           );
//           const cachedImages = buildImageGroups(validUrls);
//           setImages(cachedImages);
//         } else {
//           console.log("❌ Images Are NOT Cached ", areImagesCached);

//           // Remove duplicates from allImages
//           const uniqueImages = Array.from(new Set(allImages));
//           // Fetch and cache the images
//           await cache.addAll(uniqueImages);
//           const cachedResponses = await Promise.all(
//             uniqueImages.map((url) => cache.match(url))
//           );
//           const validUrls = uniqueImages.filter(
//             (_, index) => cachedResponses[index] && cachedResponses[index]!.ok
//           );
//           const cachedImages = buildImageGroups(validUrls);
//           setImages(cachedImages);
//         }
//       } catch (error) {
//         console.error("Error loading images:", error);
//         // ...error handling
//       } finally {
//         setAreImagesReady(true);
//         setLoading(false);
//         console.log("💩 Loading -> False");
//       }
//     };

//     loadAssets();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const buildImageGroups = (imageUrls: string[]): ImageGroups => {
//     // console.log("THe Image URLS: ", imageUrls);
//     const imageGroups: ImageGroups = imageGrpKeys;

//     imageUrls.forEach((url) => {
//       const parts = url.split("/");
//       const groupPart = parts[parts.length - 2];
//       const filePart = parts[parts.length - 1];

//       const group = groupPart as keyof ImageGroups;
//       const keyWithExtension = filePart.split("-")[1]; // Assuming the key is the second part after splitting by '-'
//       const key = keyWithExtension.replace(
//         /\.\w+$/,
//         ""
//       ) as keyof (typeof imageGroups)[typeof group];

//       // Ensure that the group is one of the keys in ImageGroups.
//       if (group in imageGroups) {
//         const imageMap = imageGroups[group];
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (imageMap as any)[key] = url;
//       }
//     });

//     return imageGroups;
//   };

//   return (
//     <ImageContext.Provider value={{ images, clearCache, areImagesReady }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };

// export default ImageProviderV3;
