// /* eslint-disable react-hooks/exhaustive-deps */
// import React, {
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// // Images
// import {
//   buildingCards,
//   regCards,
//   spCards,
// } from "../../assets/imgs_new_convention/cards";
// import { emblems } from "../../assets/imgs_new_convention/emblems";
// import { frames } from "../../assets/imgs_new_convention/frames";
// import {
//   detailsIcons,
//   resourcesIcons,
//   utilityIcons,
// } from "../../assets/imgs_new_convention/gameIcons";
// import { golden, other, wooden } from "../../assets/imgs_new_convention/labels";
// import { maps } from "../../assets/imgs_new_convention/maps";
// import { menus } from "../../assets/imgs_new_convention/menus";
// import {
//   _default,
//   buildings as buildingsBG,
//   levelUp,
//   quarries as quarriesBG,
//   regs as regsBG,
//   townExpansion as townExpansionBG,
// } from "../../assets/imgs_new_convention/modal_backgrounds";
// import {
//   buildings,
//   defaultBuildings,
//   multipleTree,
//   placeholders,
//   regs,
//   singleTree,
//   withShadow,
// } from "../../assets/imgs_new_convention/onMapAssets";
// import { quarryIcons } from "../../assets/imgs_new_convention/quarries";
// import { townExpansion } from "../../assets/imgs_new_convention/townExpansion";
// import {
//   other as otherWorkers,
//   resourceWorkers,
// } from "../../assets/imgs_new_convention/workers";
// import { CACHE_NAME } from "../../constants/cache";
// import { imageGrpKeys } from "../../constants/utils/imageGrpTypeKeys";
// import { ImageContextTypes, ImageGroups } from "../../types";

// export const ImageContext = createContext<ImageContextTypes>({});

// interface ImageProviderProps {
//   children: ReactNode;
//   setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function ImageContextAPI() {
//   return useContext(ImageContext);
// }

// export default ImageContextAPI;

// export const ImageProvider: React.FC<ImageProviderProps> = ({
//   children,
//   setLoadingProgress,
//   setLoading,
// }) => {
//   const [images, setImages] = useState<ImageGroups>(imageGrpKeys);
//   // const [loading, setLoading] = useState<boolean>(true);
//   const [areImagesReady, setAreImagesReady] = useState(false);
//   // const [loadingProgress, setLoadingProgress] = useState(0); // New state for loading progress

//   const allImages: string[] = useMemo(() => {
//     const allAssets = [
//       buildingCards,
//       regCards,
//       spCards,
//       emblems,
//       frames,
//       detailsIcons,
//       resourcesIcons,
//       utilityIcons,
//       golden,
//       other,
//       wooden,
//       maps,
//       menus,
//       _default,
//       buildingsBG,
//       regsBG,
//       levelUp,
//       quarriesBG,
//       townExpansionBG,
//       singleTree,
//       buildings,
//       defaultBuildings,
//       multipleTree,
//       placeholders,
//       regs,
//       withShadow,
//       quarryIcons,
//       townExpansion,
//       resourceWorkers,
//       otherWorkers,
//     ];

//     return allAssets.reduce((acc: string[], asset) => {
//       if (Array.isArray(asset)) {
//         return acc.concat(asset);
//       } else {
//         return acc.concat(Object.values(asset));
//       }
//     }, []);
//   }, []);

//   const clearCache = useCallback(async () => {
//     const deleted = await caches.delete(CACHE_NAME);
//     if (deleted) {
//       console.log(`Cache '${CACHE_NAME}' deleted.`);
//     } else {
//       console.log(`Cache '${CACHE_NAME}' not found.`);
//     }
//   }, []);

//   useEffect(() => {
//     if (areImagesReady === true) return; // For Perfromance

//     const loadImages = async () => {
//       try {
//         const cache = await caches.open(CACHE_NAME);
//         const cachedResponses = await Promise.all(
//           allImages.map((url) => cache.match(url))
//         );
//         console.log("💎 cachedResponses: ", cachedResponses);
//         const areImagesCached = cachedResponses.every(
//           (response) => response && response.ok
//         );

//         if (areImagesCached) {
//           console.log("✅ Images Are Cached ", areImagesCached);

//           const validUrls = allImages.filter((_, index, arr) => {
//             setLoadingProgress(() => ((index + 1) / arr.length) * 100);
//             return cachedResponses[index] && cachedResponses[index]!.ok;
//           });
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
//           const validUrls = uniqueImages.filter((_, index, arr) => {
//             setLoadingProgress(() => ((index + 1) / arr.length) * 100);
//             return cachedResponses[index] && cachedResponses[index]!.ok;
//           });
//           const cachedImages = buildImageGroups(validUrls);
//           setImages(cachedImages);
//         }
//       } catch (error) {
//         console.error("Error loading images:", error);
//         // Optionally, set some state to indicate the error to the user
//       } finally {
//         setAreImagesReady(true);
//         setLoading(false);
//       }
//     };

//     loadImages();
//   }, []);

//   const buildImageGroups = (imageUrls: string[]): ImageGroups => {
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
