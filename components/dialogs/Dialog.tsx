"use client";

import { ReactNode, useState, useEffect } from "react";
import { XIcon } from "lucide-react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(animationTimer);
    } else {
      setIsAnimating(false);

      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 500);

      return () => clearTimeout(unmountTimer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 w-full z-50 py-6 px-8 max-w-[calc(100%-2rem)] sm:max-w-lg  rounded-lg bg-black transform -translate-x-1/2 -translate-y-1/2 min-h-[100px] max-h-[510px] transition-all duration-500 ease-out ${
          isAnimating
            ? "opacity-100 translate-y-[-50%]"
            : "opacity-0 translate-y-[-60%]"
        }`}
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        >
          <XIcon size={25} className="text-white" />
        </button>
        {children}
      </div>
    </>
  );
};

export default Dialog;
