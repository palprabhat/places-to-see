import { useWindowSize } from "src/hooks/useWindowSize";

export const minWidthSm = () => {
  const { width } = useWindowSize();

  if (width && width >= 640) {
    return true;
  }
  return false;
};

export const minWidthMd = () => {
  const { width } = useWindowSize();

  if (width && width >= 768) {
    return true;
  }
  return false;
};

export const minWidthLg = () => {
  const { width } = useWindowSize();

  if (width && width >= 1024) {
    return true;
  }
  return false;
};

export const minWidthXl = () => {
  const { width } = useWindowSize();

  if (width && width >= 1280) {
    return true;
  }
  return false;
};

export const minWidth2xl = () => {
  const { width } = useWindowSize();

  if (width && width >= 1536) {
    return true;
  }
  return false;
};
