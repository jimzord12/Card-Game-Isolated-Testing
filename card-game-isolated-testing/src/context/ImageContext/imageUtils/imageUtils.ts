import {
  imageGrpKeys,
  imageNamesArray,
} from "../../../constants/utils/imageGrpTypeKeys";
import { ImageGroups, ImageNameKey, ImageObject } from "../../../types";

export const getImagesFromModule = async (): Promise<string[]> => {
  const imagesPath = "../../../assets/imgs_new_convention";
  const modules = await Promise.all([import(imagesPath)]);

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

const urlKeyProvider = (url: string) => {
  const imageGroups: ImageGroups = imageGrpKeys;

  const parts = url.split("/");
  const groupPart = parts.at(-2);
  const filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";

  const keyWithExtension = filePart.split("-")[1];

  const group = groupPart as keyof ImageGroups;
  const key = keyWithExtension.replace(
    /\.\w+$/,
    ""
  ) as keyof (typeof imageGroups)[typeof group];

  return [key, group];
};

export const buildImageGroups = async (
  cacheName: string,
  imageUrls: string[]
): Promise<ImageGroups> => {
  const cache = await caches.open(cacheName);
  const imageGroups: ImageGroups = imageGrpKeys;

  imageUrls.forEach(async (url) => {
    const [key, group] = urlKeyProvider(url);
    // const parts = url.split("/");
    // const groupPart = parts.at(-2);
    // const filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";

    // const keyWithExtension = filePart.split("-")[1];

    // const group = groupPart as keyof ImageGroups;
    // const key = keyWithExtension.replace(
    //   /\.\w+$/,
    //   ""
    // ) as keyof (typeof imageGroups)[typeof group];

    // console.log("The Key is: ", key);
    const cacheResponse = await cache.match(key);
    const localUrl = await cacheResponse
      ?.blob()
      .then((blob) => URL.createObjectURL(blob));

    if (group in imageGroups) {
      const imageMap = imageGroups[group];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (imageMap as any)[key] = localUrl;
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
        const cachedImageKey = getImageName(imageUrl);
        const cacheKey = cachedImageKey; // Use the constructed key name
        await cache.put(cacheKey, response.clone());
      } catch (error) {
        console.error(`Failed to cache ${imageUrl}:`, error);
      }
    })
  );
}

export const getImageName = (url: string): string => {
  const imageGroups: ImageGroups = imageGrpKeys;
  const parts = url.split("/");
  const groupPart = parts.at(-2);
  const filePart = parts.at(-1) ?? "xxxxxxxxxxxxxxxx";
  const keyWithExtension = filePart.split("-")[1];

  const group = groupPart as keyof ImageGroups;
  const key = keyWithExtension.replace(
    /\.\w+$/,
    ""
  ) as keyof (typeof imageGroups)[typeof group];

  return key;
};

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
