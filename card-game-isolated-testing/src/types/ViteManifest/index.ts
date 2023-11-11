type ManifestEntry = {
  file: string;
  src?: string;
  css?: string[];
  dynamicImports?: string[];
  isEntry?: boolean;
};
export type ViteManifest = {
  [key: string]: ManifestEntry;
};
