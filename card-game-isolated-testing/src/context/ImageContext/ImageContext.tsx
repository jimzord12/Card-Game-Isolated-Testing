/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";

// Images
import {
  buildingCards,
  regCards,
  spCards,
} from "../../assets/imgs_new_convention/cards";
import { emblems } from "../../assets/imgs_new_convention/emblems";
import { frames } from "../../assets/imgs_new_convention/frames";
import {
  detailsIcons,
  resourcesIcons,
  utilityIcons,
} from "../../assets/imgs_new_convention/gameIcons";
import { golden, other, wooden } from "../../assets/imgs_new_convention/labels";
import { maps } from "../../assets/imgs_new_convention/maps";
import { menus } from "../../assets/imgs_new_convention/menus";
import {
  _default,
  buildings as buildingsBG,
  levelUp,
  quarries as quarriesBG,
  regs as regsBG,
  townExpansion as townExpansionBG,
} from "../../assets/imgs_new_convention/modal_backgrounds";
import {
  buildings,
  defaultBuildings,
  multipleTree,
  placeholders,
  regs,
  singleTree,
  withShadow,
} from "../../assets/imgs_new_convention/onMapAssets";
import { quarryIcons } from "../../assets/imgs_new_convention/quarries";
import { townExpansion } from "../../assets/imgs_new_convention/townExpansion";
import {
  other as otherWorkers,
  resourceWorkers,
} from "../../assets/imgs_new_convention/workers";
import { CACHE_NAME } from "../../constants/cache";

export const ImageContext = createContext<ImageContextTypes>({});

interface ImageProviderProps {
  children: ReactNode;
}

function ImageContextAPI() {
  return useContext(ImageContext);
}

export default ImageContextAPI;

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<ImageGroups>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [useEffectHasFinished, setUseEffectHasFinished] = useState(false);

  const allImages: string[] = useMemo(() => {
    const allAssets = [
      buildingCards,
      regCards,
      spCards,
      emblems,
      frames,
      detailsIcons,
      resourcesIcons,
      utilityIcons,
      golden,
      other,
      wooden,
      maps,
      menus,
      _default,
      buildingsBG,
      regsBG,
      levelUp,
      quarriesBG,
      townExpansionBG,
      singleTree,
      buildings,
      defaultBuildings,
      multipleTree,
      placeholders,
      regs,
      withShadow,
      quarryIcons,
      townExpansion,
      resourceWorkers,
      otherWorkers,
    ];

    return allAssets.reduce((acc: string[], asset) => {
      if (Array.isArray(asset)) {
        return acc.concat(asset);
      } else {
        return acc.concat(Object.values(asset));
      }
    }, []);
  }, []);

  const clearCache = useCallback(async () => {
    const deleted = await caches.delete(CACHE_NAME);
    if (deleted) {
      console.log(`Cache '${CACHE_NAME}' deleted.`);
    } else {
      console.log(`Cache '${CACHE_NAME}' not found.`);
    }
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponses = await Promise.all(
          allImages.map((url) => cache.match(url))
        );
        const areImagesCached = cachedResponses.every(
          (response) => response && response.ok
        );

        if (areImagesCached) {
          const validUrls = allImages.filter(
            (_, index) => cachedResponses[index] && cachedResponses[index]!.ok
          );
          const cachedImages = buildImageGroups(validUrls);
          setImages(cachedImages);
          setLoading(false);
        } else {
          // Remove duplicates from allImages
          const uniqueImages = Array.from(new Set(allImages));
          // Fetch and cache the images
          await cache.addAll(uniqueImages);
          const cachedResponses = await Promise.all(
            uniqueImages.map((url) => cache.match(url))
          );
          const validUrls = uniqueImages.filter(
            (_, index) => cachedResponses[index] && cachedResponses[index]!.ok
          );
          const cachedImages = buildImageGroups(validUrls);
          setImages(cachedImages);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading images:", error);
        // Optionally, set some state to indicate the error to the user
      } finally {
        setUseEffectHasFinished(true);
      }
    };

    loadImages();
  }, []);

  const setImageGroupValue = (
    imageGroups: ImageGroups,
    group: string,
    key: string,
    value: string
  ) => {
    const groupKey = group as keyof ImageGroups;
    const imageMap = imageGroups[groupKey] || {};
    imageMap[key] = value;
    imageGroups[groupKey] = imageMap;
  };

  const buildImageGroups = (imageUrls: string[]): ImageGroups => {
    const imageGroups: ImageGroups = {};
    imageUrls.forEach((url) => {
      const [group, name] = url.split("/").slice(-2);
      const keyWithoutExtension = name.split("-")[1].replace(/\.\w+$/, ""); // Removes the file extension
      setImageGroupValue(imageGroups, group, keyWithoutExtension, url);
    });
    return imageGroups;
  };

  // const loadImage = (url: string): Promise<HTMLImageElement> => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.src = url;
  //     img.onload = () => resolve(img);
  //     img.onerror = () =>
  //       reject(new Error(`Failed to load image: ${JSON.stringify(url)}`)); // Enhanced error handling
  //   });
  // };

  return (
    <ImageContext.Provider value={{ images, clearCache }}>
      {loading && !useEffectHasFinished ? <LoadingScreen /> : children}
    </ImageContext.Provider>
  );
};
