"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BackgroundWrapper = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 object-cover object-center -z-10 ">
      <div className="h-full w-full relative">
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
        <Image
          src={`/themes/${theme}.jpg`}
          alt={`${theme} theme`}
          fill
          className="object-cover object-center transition-opacity duration-1000 ease-in"
        />
      </div>
    </div>
  );
};

export default BackgroundWrapper;
