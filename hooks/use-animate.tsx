"use client";

import { useState, useEffect } from "react";

export const useAnimate = (isOpen: boolean, duration: number = 500) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(animationTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false);
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, duration);

      return () => clearTimeout(unmountTimer);
    }
  }, [isOpen, duration]);

  return { shouldRender, isAnimating };
};
