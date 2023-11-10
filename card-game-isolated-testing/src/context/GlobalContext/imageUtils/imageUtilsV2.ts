import viteManifestJson from "../../../../dist/manifest.json";
import {
  imageGrpKeys,
  imageNamesArray,
} from "../../../constants/utils/imageGrpTypeKeys";
import { ImageGroups, ImageNameKey, ImageObject } from "../../../types";
import { convertImagePath } from "../../../utils/convertImagePath";

const isProduction = import.meta.env.MODE === "production";

type ManifestEntry = {
  file: string;
  src?: string;
  css?: string[];
  dynamicImports?: string[];
  isEntry?: boolean;
};
type ViteManifest = {
  [key: string]: ManifestEntry;
};

// Now assert the imported JSON to the correct type
const viteManifest = viteManifestJson as ViteManifest;

export const getImagesFromModule = async (): Promise<string[]> => {
  const modules = await Promise.all([
    import("../../../assets/imgs_new_convention"),
  ]);

  const unorganizedImageObjects: (string | ImageObject)[] = modules.flatMap(
    (module: ImageObject) =>
      Object.entries(module.default).flatMap(([, value]) =>
        typeof value === "string" ? value : Object.values(value)
      )
  );
  // console.log(
  //   "ImageUtilsV2 - unorganizedImageObjects",
  //   unorganizedImageObjects
  // );
  const allImages: string[] = unorganizedImageObjects.flatMap((image) =>
    typeof image === "string"
      ? image
      : Object.entries(image).flatMap(([, value]) =>
          typeof value === "string"
            ? value
            : Array.isArray(value)
            ? value
            : Object.values(value as ImageObject)
        )
  );
  // console.log("ImageUtilsV2 - allImages: ", allImages.length);
  return Array.from(new Set([...allImages]));
};

export function preloadImages(imageUrls: string[]): Promise<void[]> {
  const loadPromises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
      img.src = url;
    });
  });

  return Promise.all(loadPromises);
}

const urlKeyProvider = (url: string) => {
  // Check if we're in production mode
  // const isProduction = import.meta.env.MODE === "production";
  const imageGroups: ImageGroups = imageGrpKeys;
  // console.log("[-1] - url: ", url);

  let parts = url.split("/");
  // console.log("                                                        ");
  // console.log("--------------------------------------------------------");
  // console.log("💩 - [0] Parts: ", parts);
  // console.log("💩 - [1] Url: ", url);

  if (parts[1] === "assets") {
    parts = parts.slice(2);
    // console.log("[0] - parts: ", parts);
  }

  let filePart;
  let groupPart;

  if (isProduction) {
    const useful = parts[1].split("-");
    groupPart = useful[0];
    filePart = useful[1];

    // console.log("[1] - useful: ", useful);
    // console.log("[2] - groupPart: ", groupPart);
    // console.log("[3] - filePart: ", filePart);
  } else {
    filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";
    groupPart = parts.at(isProduction ? 0 : -2);
  }
  // if(isProduction) {

  // }

  // If in production, remove the hash from the filename
  if (isProduction) {
    // This regex is designed to remove a hash like '-9b7ca980'
    filePart = filePart.replace(/-\w{8,}\./, ".");
  }

  const keyWithExtension = isProduction ? filePart : filePart.split("-")[1];

  const group = groupPart as keyof ImageGroups;

  // console.log("💩 - [2] groupPart: ", groupPart);
  // console.log("💩 - [3] filePart: ", filePart);
  // console.log("💩 - [4] isProduction: ", isProduction);
  // console.log("💩 - [5] keyWithExtension: ", keyWithExtension);
  // console.log("--------------------------------------------------------");

  // console.log("                                                        ");
  // console.log("💩 - [7] Parts: ", parts);

  const key = keyWithExtension.replace(
    /\.\w+$/,
    ""
  ) as keyof (typeof imageGroups)[typeof group];

  return [key, group];
};

export const buildImageGroupsV2 = (hashedImageUrls: string[]): ImageGroups => {
  const imageGroups: ImageGroups = imageGrpKeys;
  let imageUrls;

  if (isProduction) {
    imageUrls = hashedImageUrls;
  } else {
    imageUrls = hashedImageUrls.map(convertImagePath);
  }
  // console.log("imageUrls: ", imageUrls);

  imageUrls.forEach((url: string) => {
    const [key, group] = urlKeyProvider(url);

    if (group in imageGroups) {
      const imageMap = imageGroups[group];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      if (isProduction) {
        // const orignalUrl = convertImagePath(url);
        // console.log("orignalUrl: ", orignalUrl);
        const manifestEntry = viteManifest[convertImagePath(url)];
        // console.log("AAAAAA: ", manifestEntry);
        // if (manifestEntry) {
        (imageMap as any)[key] = manifestEntry.file;
        // (imageMap as any)[key] = viteManifest[url].file;
        // }
      } else {
        (imageMap as any)[key] = url;
      }
    }
  });

  return imageGroups;
};

export const convertToUrl = async (
  res: Response | undefined,
  formatedImages: ImageGroups
) =>
  // : Promise<string>
  {
    if (res === undefined) throw new Error("convertToUrl");
    const [key, group] = urlKeyProvider(res.url);
    const localUrl = await res
      ?.blob()
      .then((blob) => URL.createObjectURL(blob));
    if (group in formatedImages) {
      const imageMap = formatedImages[group];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (imageMap as any)[key] = localUrl;
    }

    // return await res?.blob().then((blob) => URL.createObjectURL(blob));
  };

export async function checkForImages(cacheName: string): Promise<boolean> {
  const cache = await caches.open(cacheName);
  const cacheResponses = await cache.matchAll();
  let success = true;
  if (cacheResponses.length >= 130) {
    cacheResponses.forEach((cache) => {
      if (cache === undefined) {
        success = false;
      }
    });
  } else {
    return false;
  }
  return success;
}

export async function storeImagesInCacheWithKeys(
  cacheName: string,
  images: string[]
): Promise<void> {
  const cache = await caches.open(cacheName);

  await Promise.all(
    images.map(async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error(`Failed to fetch ${imageUrl}: ${response.status}`);
          return; // Skip this image and continue with the next
        }
        const [cachedImageKey] = urlKeyProvider(imageUrl);
        const cacheKey = cachedImageKey; // Use the constructed key name
        await cache.put(cacheKey, response.clone());
      } catch (error) {
        console.error(`Failed to cache ${imageUrl}:`, error);
      }
    })
  );
}

// export const getImageName = (url: string): string => {
//   const imageGroups: ImageGroups = imageGrpKeys;
//   const parts = url.split("/");
//   const groupPart = parts.at(-2);
//   const filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";
//   const keyWithExtension = filePart.split("-")[1];

//   const group = groupPart as keyof ImageGroups;
//   const key = keyWithExtension.replace(
//     /\.\w+$/,
//     ""
//   ) as keyof (typeof imageGroups)[typeof group];

//   return key;
// };

export function extractLastUrlSegment(url: string): string | ImageNameKey {
  const parts = url.split("/");

  const keyWithExtension = parts.pop();
  if (keyWithExtension === undefined) throw new Error("asdnuiashd");

  const key = keyWithExtension.replace(/\.\w+$/, "");

  if (key === undefined) return "XXXXXXX";
  if (imageNamesArray.includes(key as ImageNameKey)) {
    return key as ImageNameKey;
  } else {
    return "XXXXXXX";
  }
}
