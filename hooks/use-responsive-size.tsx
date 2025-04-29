import { useEffect, useState } from "react";

export const useResponsiveSize = (
  breakPoint = 450,
  smallSize = 350,
  largeSize = 400
) => {
  const [size, setSize] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= breakPoint
      ? smallSize
      : largeSize
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakPoint}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setSize(e.matches ? smallSize : largeSize);
    };

    setSize(mediaQuery.matches ? smallSize : largeSize);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakPoint, smallSize, largeSize]);

  return size;
};
