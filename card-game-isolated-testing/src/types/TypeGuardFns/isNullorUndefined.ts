function isNotNullOrUndefinedHelper<T>(
  value: T | null | undefined
): value is T {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
}

// Helper Function
export function isNotNullOrUndefined<T>(
  value: T | null | undefined,
  valueName: string
) {
  if (isNotNullOrUndefinedHelper<T>(value)) {
    return value as T;
  } else {
    throw new Error(
      `⛔ useGameLoop.tsx: processGameLoop: Utils: isNullorUndefined: [${valueName}] is null or undefined`
    );
  }
}
