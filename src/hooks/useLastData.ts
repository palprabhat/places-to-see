import { useRef } from "react";

export const useLastData = <T>(data: T) => {
  const ref = useRef(data);
  if (data !== null && data !== undefined) {
    ref.current = data;
  }
  return ref.current;
};
