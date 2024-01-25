import viteManifestJson from "../../../../dist/manifest.json";
import {
  imageGrpKeys,
  imageNamesArray,
} from "../../../constants/utils/imageGrpTypeKeys";
import { ImageGroups, ImageNameKey, ImageObject } from "../../../types";
import { ViteManifest } from "../../../types/ViteManifest";
import { convertImagePath } from "../../../utils/general/convertImagePath";

const isProduction = import.meta.env.MODE === "production";

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
  const imageGroups: ImageGroups = imageGrpKeys;

  let parts = url.split("/");

  if (parts[1] === "assets") {
    parts = parts.slice(2);
  }

  let filePart;
  let groupPart;

  if (isProduction) {
    const useful = parts[1].split("-");
    groupPart = useful[0];
    filePart = useful[1];
  } else {
    filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";
    groupPart = parts.at(isProduction ? 0 : -2);
  }

  // If in production, remove the hash from the filename
  if (isProduction) {
    // This regex is designed to remove a hash like '-9b7ca980'
    filePart = filePart.replace(/-\w{8,}\./, ".");
  }

  const keyWithExtension = isProduction ? filePart : filePart.split("-")[1];

  const group = groupPart as keyof ImageGroups;

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

  imageUrls.forEach((url: string) => {
    const [key, group] = urlKeyProvider(url);

    if (group in imageGroups) {
      const imageMap = imageGroups[group];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      if (isProduction) {
        const manifestEntry = viteManifest[convertImagePath(url)];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (imageMap as any)[key] = manifestEntry.file;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
