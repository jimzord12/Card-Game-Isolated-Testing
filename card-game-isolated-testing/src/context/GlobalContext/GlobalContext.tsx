import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Images
import viteManifest from "../../../dist/manifest.json";
import { CACHE_NAME } from "../../constants/cache";
import { imageGrpKeys } from "../../constants/utils/imageGrpTypeKeys";
import { ImageContextTypes, ImageGroups } from "../../types";
import {
  buildImageGroupsV2,
  getImagesFromModule,
  preloadImages,
} from "./imageUtils/imageUtilsV2";

export const ImageContext = createContext<ImageContextTypes>({});

interface ImageProviderProps {
  children: ReactNode;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UseGlobalContext() {
  return useContext(ImageContext);
}

const ImageProviderV5: React.FC<ImageProviderProps> = ({
  children,
  setLoading,
}) => {
  const [images, setImages] = useState<ImageGroups>(imageGrpKeys);
  const [areImagesReady, setAreImagesReady] = useState(false);
  const hashedImages: string[] =
    viteManifest["src/assets/imgs_new_convention/index.ts"].assets;
  // const isProduction = import.meta.env.MODE === "production";

  const clearCache = useCallback(async () => {
    const deleted = await caches.delete(CACHE_NAME);
    if (deleted) {
      console.log(`Cache '${CACHE_NAME}' deleted.`);
    } else {
      console.log(`Cache '${CACHE_NAME}' not found.`);
    }
  }, []);

  useEffect(() => {
    if (areImagesReady) return;

    setLoading(true);

    const loadAssets = async () => {
      try {
        const allImages: string[] = await getImagesFromModule();
        await preloadImages(allImages);
        const imagesObject = buildImageGroupsV2(hashedImages); // Is Env-Aware (Prod or Dev)
        console.log("Global Context, Image Objext: ", allImages.length);
        setImages(imagesObject);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setAreImagesReady(true);
        setLoading(false);
      }
    };

    loadAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   useEffect(() => {
  //     // eslint-disable-next-line prefer-const
  //     let intervalId: NodeJS.Timeout | undefined;

  //     const checkCache = async () => {
  //       const cache = await caches.open(CACHE_NAME);
  //       const cachedEntries = await cache.keys();
  //       if (cachedEntries.length >= 130) {
  //         setLoading(false);
  //         clearInterval(intervalId);
  //       }
  //     };
  //     checkCache();
  //     intervalId = setInterval(checkCache, 1000);

  //     return () => {
  //       if (intervalId) {
  //         clearInterval(intervalId);
  //       }
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <ImageContext.Provider value={{ images, clearCache, areImagesReady }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProviderV5;
