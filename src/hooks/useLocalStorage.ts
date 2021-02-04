import { useEffect, useState } from "react";

export const useLocalStorage = <T = undefined>(
  key: string,
  initialValue: T
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue]);

  return [storedValue, setStoredValue] as [
    typeof storedValue,
    typeof setStoredValue
  ];
};
