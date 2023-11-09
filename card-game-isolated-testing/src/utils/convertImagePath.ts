export function convertImagePath(originalPath: string) {
  // Split the path by hyphens and the dot before the file extension
  const parts = originalPath.split(/[-.]/);

  if (parts.length > 3) {
    // Use slice to ignore the hash part and the file extension
    const prefix = parts[0].split("/")[1]; // Get the prefix after 'assets/'
    const nameParts = parts.slice(1, -2); // Ignore the first part ('assets/') and the last two parts (hash and 'webp')
    const name = nameParts.join("-"); // Rejoin the name parts with hyphens
    const newPath = `src/assets/imgs_new_convention/${prefix}/${prefix}-${name}.webp`;
    return newPath;
  } else {
    // If the format does not meet the expected pattern, log the error with the original path
    console.error(`Error processing: ${originalPath}`);
    return `Error processing: ${originalPath}`;
  }
}
