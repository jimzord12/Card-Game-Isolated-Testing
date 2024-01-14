import { useState, useEffect } from "react";

const getLocalValue = (key: string, initValue?: string) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  const localValueRaw = localStorage.getItem(key);

  // if a value is already store
  if (localValueRaw) {
    console.log("🔷 - Custom: useLocalStorage Hook: No UserName entry Found");
    const localValue = JSON.parse(localValueRaw);
    if (localValue) return localValue;
  }

  // return result of a function
  // if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key: string, initValue?: string) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
