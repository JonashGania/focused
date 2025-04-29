"use client";

import { useThemeStore } from "@/store/theme-store";
import Image from "next/image";

const BackgroundWrapper = () => {
  const backgroundTheme = useThemeStore((state) => state.backgroundTheme);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 object-cover object-center -z-10 ">
      <div className="h-full w-full relative">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <Image
          src={`/themes/${backgroundTheme}.jpg`}
          alt={`${backgroundTheme} theme`}
          fill
          className="object-cover object-center transition-opacity duration-1000 ease-in"
        />
      </div>
    </div>
  );
};

export default BackgroundWrapper;
